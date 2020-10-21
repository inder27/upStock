import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import rootReducer from './Reducer'
import App from './Components/App'
import fetchJson from './Services'

(async () => {
  const apiUrl = 'http://kaboom.rksv.net/api/historical?interval=1'
  let initialState = await fetchJson(apiUrl)
  const store = createStore(rootReducer(initialState))

  render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('root')
  )
})();
