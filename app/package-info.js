'use strict'

const path = require('path')

const projectRoot = path.resolve(__dirname, '..')
const appPackage = require(path.join(projectRoot, 'package.json'))

function getProductName() {
  return appPackage.build.productName
}

function getCompanyName() {
  return appPackage.build.companyName
}

function getVersion() {
  return appPackage.version
}

function getBundleId() {
  return appPackage.build.appBundleId
}

module.exports = {
  getProductName,
  getCompanyName,
  getVersion,
  getBundleId,
}
