'use strict'

const path = require('path')
const fs = require('fs')
const chalk = require('chalk')
const childProcess = require('child_process')
const electron = require('electron')

const projectRoot = path.resolve(__dirname, '..')
const appPackage = require(path.join(projectRoot, 'package.json'))
const distInfo = require('./dist-info')
const packageInfo = require('../app/package-info')

let binPath = ''

switch (process.platform) {
  case 'darwin':
    binPath = path.join(
      distInfo.getDistPath(),
      `${packageInfo.getProductName()}.app`,
      'Contents',
      'MacOS',
      `${packageInfo.getProductName()}`
    )
    break
  case 'win32':
    binPath = path.join(
      distInfo.getDistPath(),
      `${packageInfo.getProductName()}.exe`
    )
    break
  case 'linux':
    binPath = path.join(
      distInfo.getDistPath(),
      `${packageInfo.getProductName()}`
    )
    break
  default:
    console.error(
      chalk`{red Unable to run executable on ${process.platform} ${
        process.arch
      }}`
    )
    process.exit(1)
    break
}

function isFile(path) {
  try {
    return fs.statSync(path).isFile()
  } catch (e) {
    return false
  }
}

module.exports = function(options) {
  let runner

  if (isFile(binPath)) {
    runner = childProcess.spawn(binPath, [], {
      stdio: 'inherit',
      NODE_ENV: 'development',
    })
  } else {
    console.log(chalk`{yellow [WARN] Launch built-in electron.}`)
    runner = childProcess.spawn(electron, ['build'], {
      stdio: 'inherit',
      NODE_ENV: 'development',
    })
  }

  runner.on('close', () => {
    process.exit(0)
  })
}
