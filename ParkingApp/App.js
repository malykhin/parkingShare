import React, { Component } from 'react'
import { Provider } from 'react-redux'

import Root from './src/modules/Root/Root'
import configureStore from './src/store/configureStore'

const store = configureStore()

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Root />
      </Provider>
    )
  }
}
