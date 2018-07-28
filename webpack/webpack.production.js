/**
 * Webpack production config
 */
'use strict'

const webpack = require('webpack')
const webpackMerge = require('webpack-merge')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const webpackBaseMain = require('./webpack.main')
const webpackBaseRenderer = require('./webpack.renderer')

/**
 * Base production configuration
 */
const webpackBaseProduction = {
  /**
   * Providing the mode configuration option tells webpack to use
   * its built-in optimizations accordingly.
   *
   * @see https://webpack.js.org/concepts/mode
   */
  mode: 'production',

  /**
   * This option controls if and how source maps are generated.
   *
   * @see https://webpack.js.org/configuration/devtool
   */
  devtool: false,

  /**
   * A list of webpack plugins.
   *
   * @see https://webpack.js.org/configuration/plugins/#plugins
   */
  plugins: [],
}

/**
 * Main production config
 */
const webpackProductionMain = webpackMerge(
  {},
  webpackBaseMain,
  webpackBaseProduction
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
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                minimize: {
                  safe: true,
                },
              },
            },
            {
              loader: 'sass-loader',
              options: {},
            },
          ],
        },
      ],
    },

    /**
     * A list of webpack plugins.
     *
     * @see https://webpack.js.org/configuration/plugins/#plugins
     */
    plugins: [
      new MiniCssExtractPlugin({
        filename: 'ui.css',
      }),
    ],
  }
)

/**
 * Webpack multi-compiler mode
 */
module.exports = [webpackProductionMain, webpackProductionRenderer]
