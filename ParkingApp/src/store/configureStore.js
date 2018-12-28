import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware, { END } from 'redux-saga'

import rootReducer from './rootReducer'
import rootSaga from './rootSaga'

export default function configureStore(initialState) {
  const sagaMiddleware = createSagaMiddleware()
  const store = createStore(rootReducer, initialState, applyMiddleware(sagaMiddleware))

  rootSaga.map((saga) => sagaMiddleware.run(saga))
  store.close = () => store.dispatch(END)

  return store
}
