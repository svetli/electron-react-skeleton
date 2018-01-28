const path = require('path')
const webpack = require('webpack')
const webpackMerge = require('webpack-merge')
const webpackMainBase = require('./webpack.main')
const webpackRendererBase = require('./webpack.renderer')

/**
 * Main development config
 */
const webpackMainConfig = webpackMerge({}, webpackMainBase, {
  /**
   * This option controls if and how source maps are generated.
   *
   * @see https://webpack.js.org/configuration/devtool/#devtool
   */
  devtool: 'souce-map',
})

/**
 * Renderer development config
 */
const webpackRendererConfig = webpackMerge({}, webpackRendererBase, {
  /**
   * This option controls if and how source maps are generated.
   *
   * @see https://webpack.js.org/configuration/devtool/#devtool
   */
  devtool: 'souce-map',

  /**
   * The top-level output key contains set of options instructing webpack on how and where
   * it should output your bundles, assets and anything else you bundle or load with webpack.
   *
   * @see https://webpack.js.org/configuration/output
   */
  output: {
    /**
     * This is an important option when using on-demand-loading or loading
     * external resources like images, files, etc.
     *
     * @see https://webpack.js.org/configuration/output/#output-publicpath
     */
    publicPath: 'http://localhost:3000/build/',
  },

  /**
   * The entry object is where webpack looks to start building the bundle.
   *
   * @see https://webpack.js.org/configuration/entry-context/#entry
   */
  entry: {
    renderer: [
      'react-hot-loader/patch',
      'webpack-hot-middleware/client?path=http://localhost:3000/__webpack_hmr',
      'webpack/hot/only-dev-server', // prevents reload on syntax errors
      webpackRendererBase.entry.renderer,
    ],
  },

  /**
   * These options determine how the different types of modules within a project will be treated.
   *
   * @see https://webpack.js.org/configuration/module
   */
  module: {
    /**
     * An array of Rules which are matched to requests when modules are created.
     *
     * @see https://webpack.js.org/configuration/module/#module-rules
     */
    rules: [
      /**
       * CSS/SCSS loader
       */
      {
        test: /\.(scss|css)$/,
        use: ['style-loader', 'css-loader?sourceMap', 'sass-loader?sourceMap'],
      },
    ],
  },

  /**
   * A list of webpack plugins.
   *
   * @see https://webpack.js.org/configuration/plugins/#plugins
   */
  plugins: [
    /**
     * Enables Hot Module Replacement, otherwise known as HMR.
     *
     * @see https://webpack.js.org/plugins/hot-module-replacement-plugin
     */
    new webpack.HotModuleReplacementPlugin(),
  ],
})

module.exports = [webpackMainConfig, webpackRendererConfig]
