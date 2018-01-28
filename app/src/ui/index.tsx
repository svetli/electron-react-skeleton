import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import { App } from './App'

declare const module: { hot: any }

/**
 * Compile and inject styles
 */
if (!process.env.TEST_ENV) {
  require('../../stylesheets/main.scss')
}

/**
 * Root element in HTML tree
 */
const rootElement = document.getElementById('app-container')

/**
 * Render our App into it, inside the HMR App ontainer
 * which handles the hot reloading.
 */
ReactDOM.render(
  <AppContainer>
    <App />
  </AppContainer>,
  rootElement!
)

/**
 * Handle hot reloading requests from webpack.
 */
if (module.hot) {
  module.hot.accept('./App', () => {
    const NextApp = require('./App').App
    ReactDOM.render(
      <AppContainer>
        <NextApp />
      </AppContainer>,
      rootElement!
    )
  })
}
