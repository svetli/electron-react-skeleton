/**
 * Webpack electron-main config
 */
import * as path from 'path'
import * as webpack from 'webpack'
import * as webpackMerge from 'webpack-merge'
import { webpackBaseConfig } from './webpack.base'

export const webpackMainBaseConfig: webpack.Configuration = webpackMerge(
  {},
  webpackBaseConfig,
  {
    /**
     * Instructs webpack to target a specific environment.
     *
     * @see https://webpack.js.org/configuration/target/#target
     */
    target: 'electron-main',

    /**
     * The entry object is where webpack looks to start building the bundle.
     *
     * @see https://webpack.js.org/configuration/entry-context/#entry
     */
    entry: {
      main: path.resolve(__dirname, '../app/src/main/main'),
    },
  }
)
