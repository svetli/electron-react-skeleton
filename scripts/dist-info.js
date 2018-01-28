'use strict'

const path = require('path')
const packageInfo = require('../app/package-info')

function getProjectRoot() {
  return path.join(__dirname, '..')
}

function getDistRoot() {
  return path.join(getProjectRoot(), 'dist')
}

function getDistPath() {
  return path.join(
    getDistRoot(),
    `${getAppExecutableName()}-${getAppPlatform()}-x64`
  )
}

function getAppPlatform() {
  return process.platform
}

function getBuildRoot() {
  return path.join(getProjectRoot(), 'build')
}

function getAppExecutableName() {
  return `${packageInfo.getProductName()}`
}

function getAppEnvironment() {
  return process.env.NODE_ENV || 'production'
}

function getAppPlatform() {
  return process.platform
}

function isDevelopment() {
  return getAppEnvironment() === 'development'
}

function isWindows() {
  return getAppPlatform() === 'win32'
}

function isLinux() {
  return getAppPlatform() === 'linux'
}

function isDarwin() {
  return getAppPlatform() === 'darwin'
}

module.exports = {
  getProjectRoot,
  getDistRoot,
  getDistPath,
  getBuildRoot,
  getAppExecutableName,
  getAppPlatform,
  getAppEnvironment,
  isDevelopment,
  isWindows,
  isLinux,
  isDarwin,
}
