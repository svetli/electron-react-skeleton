/**
 * Webpack base configuration
 */
import * as path from 'path'
import * as webpack from 'webpack'

export const webpackExternals = ['7zip']

export const webpackBaseConfig: webpack.Configuration = {
  /**
   * @see https://webpack.js.org/configuration/output
   */
  output: {
    /**
     * This option determines the name of each output bundle.
     *
     * @see https://webpack.js.org/configuration/output/#output-filename
     */
    filename: '[name].js',

    /**
     * The output directory as an absolute path.
     *
     * @see https://webpack.js.org/configuration/output/#output-path
     */
    path: path.resolve(__dirname, '..', 'build'),

    /**
     * Configure how the library will be exposed.
     *
     * @see https://webpack.js.org/configuration/output/#output-librarytarget
     */
    libraryTarget: 'commonjs2',
  },

  /**
   * Configure how modules are resolved.
   *
   * @see https://webpack.js.org/configuration/resolve/#resolve
   */
  resolve: {
    /**
     * Automatically resolve certain extensions.
     *
     * @see https://webpack.js.org/configuration/resolve/#resolve-extensions
     */
    extensions: ['.ts', '.tsx', '.js'],
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
       * Typescript loader
       *
       * @see https://github.com/s-panferov/awesome-typescript-loader
       */
      {
        test: /\.tsx?$/,
        include: path.resolve(__dirname, '..', 'app', 'src'),
        use: [
          {
            loader: 'awesome-typescript-loader',
            options: {
              useBabel: true,
              useCache: true,
              babelCore: '@babel/core',
            },
          },
        ],
        exclude: /node_modules/,
      },
    ],
  },

  /**
   * The externals configuration option provides a way of excluding
   * dependencies from the output bundles.
   *
   * @see https://webpack.js.org/configuration/externals/#externals
   */
  externals: webpackExternals,

  /**
   * This is an object where each property is the name of a Node global or module.
   *
   * @see https://webpack.js.org/configuration/node/#node
   */
  node: {
    __dirname: false,
    __filename: false,
  },
}
