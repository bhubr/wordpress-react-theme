import { createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import rootReducer from './reducers'
// import api from './middlewares/api'

const loggerMiddleware = createLogger()
//
// export default function configureStore(preloadedState) {
//   return createStore(
//     rootReducer,
//     preloadedState,
//     applyMiddleware(
//       thunkMiddleware,
//       loggerMiddleware
//     )
//   )
// }

const composeEnhancers = typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


export default function initStore(initialState) {
  return createStore(rootReducer, initialState, composeEnhancers(
    applyMiddleware(
      thunkMiddleware
      //, api
      , loggerMiddleware
    )
  ));
}
