import * as path from 'path'
import * as fs from 'fs'
import chalk from 'chalk'
import { spawn } from 'child_process'
import { getDistPath } from './dist-info'
import { getProductName } from '../app/package-info'

let binPath = ''
switch (process.platform) {
  case 'darwin':
    binPath = path.join(
      getDistPath(),
      `${getProductName()}.app`,
      'Contents',
      'MacOS',
      `${getProductName()}`
    )
    break
  case 'win32':
    binPath = path.join(getDistPath(), `${getProductName()}.exe`)
    break
  case 'linux':
    binPath = path.join(getDistPath(), `${getProductName()}`)
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

function isFile(path: string): boolean {
  try {
    return fs.statSync(path).isFile()
  } catch (e) {
    return false
  }
}

export function runElectron() {
  if (isFile(binPath)) {
    const runner = spawn(binPath, [], {
      stdio: 'inherit',
    })

    runner.on('close', () => {
      process.exit(0)
    })
  }
}
