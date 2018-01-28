import 'mocha'
import { expect } from 'chai'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import * as TestUtils from 'react-dom/test-utils'
import { App } from '../src/ui/App'

describe('App', () => {
  it('renders', async () => {
    const app = TestUtils.renderIntoDocument(<App />) as React.Component
    await wait(0)

    const node = ReactDOM.findDOMNode(app)
    expect(node).not.to.equal(null)
  })
})

function wait(timeout: number): Promise<void> {
  return new Promise<void>(resolve => {
    setTimeout(resolve, timeout)
  })
}
