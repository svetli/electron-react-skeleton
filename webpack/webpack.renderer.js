/**
 * Webpack electron-renderer config.
 */
'use strict'

const path = require('path')
const webpack = require('webpack')
const webpackMerge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpackBase = require('./webpack.base')

module.exports = webpackMerge({}, webpackBase, {
  /**
   * Instructs webpack to target a specific environment.
   *
   * @see https://webpack.js.org/configuration/target/#target
   */
  target: 'electron-renderer',

  /**
   * The entry object is where webpack looks to start building the bundle.
   *
   * @see https://webpack.js.org/configuration/entry-context/#entry
   */
  entry: {
    renderer: path.resolve(__dirname, '../app/src/ui/index'),
  },

  /**
   * These options determine how the different types of modules within a project will be treated.
   *
   * @see https://webpack.js.org/configuration/module/
   */
  module: {
    /**
     * An array of Rules which are matched to requests when modules are created.
     *
     * @see https://webpack.js.org/configuration/module/#module-rules
     */
    rules: [
      /**
       * Images loader
       */
      {
        test: /\.(jpe?g|png|gif|ico)$/,
        use: ['file?name=[path][name].[ext]'],
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
     * The HtmlWebpackPlugin simplifies creation of HTML files to serve your webpack bundles.
     *
     * @see https://webpack.js.org/plugins/html-webpack-plugin
     */
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '..', 'app', 'static', 'index.html'),
      chunks: ['renderer'],
    }),
  ],
})
