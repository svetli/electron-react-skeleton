/**
 * Webpack production config
 */
import * as webpack from 'webpack'
import * as webpackMerge from 'webpack-merge'
import * as MiniCssExtractPlugin from 'mini-css-extract-plugin'
import { webpackMainBaseConfig } from './webpack.main'
import { webpackRendererBaseConfig } from './webpack.renderer'

/**
 * Base production configuration
 */
const webpackBaseProductionConfig: webpack.Configuration = {
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
const webpackProductionMainConfig: webpack.Configuration = webpackMerge(
  {},
  webpackMainBaseConfig,
  webpackBaseProductionConfig
)

/**
 * Renderer production config
 */
const webpackProductionRendererConfig: webpack.Configuration = webpackMerge(
  {},
  webpackRendererBaseConfig,
  webpackBaseProductionConfig,
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
export = [webpackProductionMainConfig, webpackProductionRendererConfig]
