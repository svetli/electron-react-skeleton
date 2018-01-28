/**
 * Webpack electron-main config
 */
'use-strict'

const path = require('path')
const webpack = require('webpack')
const webpackMerge = require('webpack-merge')
const webpackBase = require('./webpack.base')

module.exports = webpackMerge({}, webpackBase, {
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
})
