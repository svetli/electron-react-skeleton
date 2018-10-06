/// <reference path="./globals.d.ts" />

import * as path from 'path'
import * as child_process from 'child_process'
import * as fs from 'fs-extra'
import * as packager from 'electron-packager'
import chalk from 'chalk'

import {
  getProjectRoot,
  getAppEnvironment,
  getDistRoot,
  isDevelopment,
  getBuildRoot,
  getAppPlatform,
} from './dist-info'
import {
  getProductName,
  getCompanyName,
  getBundleId,
} from '../app/package-info'

import { webpackExternals } from '../webpack/webpack.base'

// package information
const appPackage = require(path.join(getProjectRoot(), 'package.json'))

// start building process
console.log(
  chalk`{yellow [BUILD]} Building for {magenta '${getAppEnvironment()}'}`
)

// cleanup
console.log(chalk`{yellow [BUILD]} Removing old distribution files...`)
fs.removeSync(getDistRoot())

// copy dependencies
console.log(chalk`{yellow [BUILD]} Copying dependencies...`)
copyDependencies()

// copy static resources
console.log(chalk`{yellow [BUILD]} Copying static resources...`)
copyStaticResources()

// packaging application
console.log(chalk`{yellow [BUILD]} Packaging application...`)
packageApplication()

function copyDependencies() {
  const appDeps = appPackage.dependencies
  const newDeps: PackageLookup = {}
  const appDevDeps = appPackage.devDependencies
  const newDevDeps: PackageLookup = {}

  const externals = webpackExternals

  if (isDevelopment()) {
    externals.push('devtron')
  }

  for (const name of Object.keys(appDeps)) {
    const pkg = appDeps[name]
    if (externals.indexOf(name) !== -1) {
      newDeps[name] = pkg
    }
  }

  for (const name of Object.keys(appDevDeps)) {
    const pkg = appDevDeps[name]
    if (externals.indexOf(name) !== -1) {
      newDevDeps[name] = pkg
    }
  }

  const newPackage = Object.assign({}, appPackage, {
    productName: appPackage.productName,
    dependencies: newDeps,
    devDependencies: newDevDeps,
  })

  if (!isDevelopment()) {
    delete newPackage.devDependencies
  }

  fs.writeFileSync(
    path.join(getBuildRoot(), 'package.json'),
    JSON.stringify(newPackage)
  )

  fs.removeSync(path.resolve(getBuildRoot(), 'node_modules'))

  if (Object.keys(newDeps).length || Object.keys(newDevDeps).length) {
    console.log(chalk`{yellow [YARN]} Installing dependencies via yarn...`)
    child_process.execSync('yarn install', {
      cwd: getBuildRoot(),
      env: process.env,
    })
  }

  if (isDevelopment()) {
    console.log(chalk`{yellow [BUILD]} Installing 7zip...`)
    const s7zipSrc = path.resolve(getProjectRoot(), 'node_modules/7zip')
    const s7zipDest = path.resolve(getBuildRoot(), 'node_modules/7zip')

    fs.mkdirpSync(s7zipDest)
    fs.copySync(s7zipSrc, s7zipDest)
  }
}

function copyStaticResources() {
  const platformDir = path.join(
    getProjectRoot(),
    'app',
    'static',
    getAppPlatform()
  )
  const destDir = path.join(getBuildRoot(), 'static')

  fs.removeSync(destDir)

  if (fs.existsSync(platformDir)) {
    fs.copySync(platformDir, destDir)
  }
}

function packageApplication() {
  const pkgOptions: packager.Options = {
    name: getProductName(),
    platform: getAppPlatform() as packager.platform,
    arch: 'x64',
    asar: false,
    out: getDistRoot(),
    dir: getBuildRoot(),
    tmpdir: false,
    derefSymlinks: false,
    prune: false,
    icon: path.join(getProjectRoot(), 'app', 'static', 'icons', 'logo'),
    ignore: [
      new RegExp('/node_modules/\\.bin($|/)'),
      new RegExp('/node_modules/electron($|/)'),
      new RegExp('/node_modules/electron-packager($|/)'),
      new RegExp('/\\.git($|/)'),
    ],

    // MacOS specific
    appCopyright: `Copyright ${getCompanyName()}`,
    appBundleId: getBundleId(),
    appCategoryType: 'public.app-category.business',
    osxSign: false,

    // Windows specific
    win32metadata: {
      CompanyName: getCompanyName(),
      FileDescription: '',
      OriginalFilename: '',
      ProductName: getProductName(),
      InternalName: getProductName(),
    },
  }

  packager(pkgOptions)
    .then(paths => {
      console.log(
        chalk`{green [BUILD] Successfully built to ${paths.toString()}}`
      )
    })
    .catch(error => {
      console.error(chalk`{red [BUILD] Failed with error ${error}}`)
      process.exit(1)
    })
}
