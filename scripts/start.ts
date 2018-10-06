import * as express from 'express'
import * as webpack from 'webpack'
import * as webpackDevMiddleware from 'webpack-dev-middleware'
import * as webpackHotMiddleware from 'webpack-hot-middleware'
import * as mri from 'mri'
import chalk from 'chalk'
import { runElectron } from './run'
import webpackDevConfigs = require('../webpack/webpack.development')

const webpackRendererConfig = webpackDevConfigs[1]

/**
 * Setup environment
 */
const args = mri(process.argv.slice(2))
const port = args.port || process.env.PORT || 3000
const host = args.host || 'localhost'
const mode = args.mode || process.env.NODE_ENV || 'production'

function getPublicPath(config: webpack.Configuration): string {
  return config != null &&
    config.output != null &&
    config.output.publicPath != null
    ? config.output.publicPath
    : ''
}

if (mode === 'development') {
  /**
   * Application
   */
  const server = express()
  const compiler = webpack(webpackRendererConfig)

  /**
   * Webpack development middleware
   *
   * @see https://github.com/webpack/webpack-dev-middleware
   */
  server.use(
    webpackDevMiddleware(compiler, {
      /**
       * Public path to bind the middleware
       */
      publicPath: getPublicPath(webpackRendererConfig),

      /**
       * Display no info to console (only errors)
       */
      logLevel: 'error',
    })
  )

  /**
   * Webpack hot reloading middleware
   *
   * @see https://github.com/glenjamin/webpack-hot-middleware
   */
  server.use(webpackHotMiddleware(compiler))

  /**
   * Start listening...
   */
  server.listen(port, host, (error: Error | null) => {
    if (error) {
      return console.error(error)
    }

    console.log(`
        ${chalk.bold('Access URLs:')}
            Localhost: ${chalk.magenta(`http://${host}:${port}`)}
            ${chalk.blue(`Press ${chalk.italic('CTRL-C')} to stop`)}
    `)

    runElectron()
  })
} else {
  runElectron()
}
