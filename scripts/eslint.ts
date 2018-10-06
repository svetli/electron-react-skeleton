import * as path from 'path'
import { CLIEngine } from 'eslint'
const chalk = require('chalk')

const shouldFix = process.argv.indexOf('--fix') > -1

const cli = new CLIEngine({
  cwd: path.dirname(__dirname),
  cache: true,
  fix: shouldFix,
})

const report = cli.executeOnFiles([
  './webpack/*.ts',
  './scripts/**/*.{j,t}s?(x)',
  './app/*.ts',
  './app/{src,test}/**/*.{j,t}s?(x)',
])

if (shouldFix) {
  CLIEngine.outputFixes(report)
}

console.log(cli.getFormatter('stylish')(report.results))

if (report.errorCount > 0) {
  console.error(
    chalk`{green → To fix some of these errors, run {underline yarn eslint:fix}}`
  )
}
