import * as path from 'path'
import { getProductName } from '../app/package-info'

export function getProjectRoot(): string {
  return path.join(__dirname, '..')
}

export function getDistRoot(): string {
  return path.join(getProjectRoot(), 'dist')
}

export function getDistPath(): string {
  return path.join(
    getDistRoot(),
    `${getAppExecutableName()}-${getAppPlatform()}-x64`
  )
}

export function getBuildRoot(): string {
  return path.join(getProjectRoot(), 'build')
}

export function getAppExecutableName(): string {
  return `${getProductName()}`
}

export function getAppEnvironment(): string {
  return process.env.NODE_ENV || 'production'
}

export function getAppPlatform(): string {
  return process.platform
}

export function isDevelopment(): boolean {
  return getAppEnvironment() === 'development'
}

export function isWindows(): boolean {
  return getAppPlatform() === 'win32'
}

export function isLinux(): boolean {
  return getAppPlatform() === 'linux'
}

export function isDarwin(): boolean {
  return getAppPlatform() === 'darwin'
}
