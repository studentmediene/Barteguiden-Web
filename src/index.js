require('./app.scss')

import React from 'react'
import {render} from 'react-dom'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { Router, Route, browserHistory } from 'react-router'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'

import reducers from './reducers'
import App from './App'
import { EventPage } from './containers'

const store = createStore(
  combineReducers({
    ...reducers,
    routing: routerReducer
  })
)

const history = syncHistoryWithStore(browserHistory, store)

render(
    <Provider store={store}>
      <Router history={history}>
        <Route path="/" component={App} >
          <Route path="/hue" component={EventPage} />
        </Route>
        <Route path="/events/:id" component={EventPage} />
      </Router>
    </Provider>,
    document.querySelector('#app'))
