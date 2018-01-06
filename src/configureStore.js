import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
// import rootReducer from './reducers'
const rootReducer = (state = initialState, action) => {
  return state;
};
const loggerMiddleware = createLogger()
console.log(rootReducer);
export default function configureStore(preloadedState) {
  return createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(
      thunkMiddleware,
      loggerMiddleware
    )
  )
}
