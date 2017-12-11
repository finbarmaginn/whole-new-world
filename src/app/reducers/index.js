import {compose, applyMiddleware, createStore, combineReducers} from 'redux'
import {createLogger} from "redux-logger"
import {persistStore, autoRehydrate} from 'redux-persist'
import thunk from "redux-thunk"
import promise from "redux-promise-middleware"
import {routerReducer} from 'react-router-redux'

import general from './generalReducers'

const middlewares = []

if (process.env.NODE_ENV === "development") {
  middlewares.push(createLogger())
}

const store = createStore(
  combineReducers({
    general: general,
    routing: routerReducer
  }),
  compose(
    applyMiddleware(...middlewares, promise(), thunk)
  )
)

persistStore(store)

export default store
