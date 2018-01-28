/**
 * Webpack production config
 */
'use strict'

const webpack = require('webpack')
const webpackMerge = require('webpack-merge')
const BabelPlugin = require('babel-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const webpackBaseMain = require('./webpack.main')
const webpackBaseRenderer = require('./webpack.renderer')

/**
 * Base production configuration
 */
const webpackBaseProduction = {
  /**
   * This option controls if and how source maps are generated.
   *
   * @see https://webpack.js.org/configuration/devtool
   */
  devtool: 'source-map',

  /**
   * A list of webpack plugins.
   *
   * @see https://webpack.js.org/configuration/plugins/#plugins
   */
  plugins: [
    /**
     * A Babel.js plugin for webpack
     *
     * @see https://github.com/simlrh/babel-webpack-plugin
     */
    new BabelPlugin({
      test: /\.js$/,
      presets: [
        [
          /**
           * An ES6+ aware minifier based on the Babel toolchain.
           *
           * @see https://github.com/babel/minify
           */
          'minify',
          {
            evaluate: false,
          },
        ],
      ],
      compact: true,
      minified: true,
      sourceMaps: true,
      comments: false,
    }),

    /**
     * This plugin will enable the same concatenation behavior in webpack.
     *
     * @see https://webpack.js.org/plugins/module-concatenation-plugin
     */
    new webpack.optimize.ModuleConcatenationPlugin(),
  ],
}

/**
 * Main production config
 */
const webpackProductionMain = webpackMerge(
  {},
  webpackBaseMain,
  webpackBaseProduction,
  {
    /**
     * A list of webpack plugins.
     *
     * @see https://webpack.js.org/configuration/plugins/#plugins
     */
    plugins: [
      /**
       * Allows you to create global constants which can be configured at compile time.
       *
       * @see https://webpack.js.org/plugins/define-plugin
       */
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify('production'),
        },
      }),
    ],
  }
)

/**
 * Renderer production config
 */
const webpackProductionRenderer = webpackMerge(
  {},
  webpackBaseRenderer,
  webpackBaseProduction,
  {
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
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: ['css-loader', 'sass-loader'],
          }),
        },
      ],
    },
    /**
     * A list of webpack plugins.
     *
     * @see https://webpack.js.org/configuration/plugins/#plugins
     */
    plugins: [new ExtractTextPlugin('ui.css')],
  }
)

/**
 * Webpack multi-compiler mode
 */
module.exports = [webpackProductionMain, webpackProductionRenderer]
