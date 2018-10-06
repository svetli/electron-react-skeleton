import * as path from 'path'

const projectRoot = path.resolve(__dirname, '..')
const appPackage: Record<string, string> = require(path.join(
  projectRoot,
  'package.json'
))

export function getProductName(): string {
  return appPackage.productName
}

export function getCompanyName(): string {
  return appPackage.companyName
}

export function getVersion(): string {
  return appPackage.version
}

export function getBundleId(): string {
  return appPackage.appBundleId
}
