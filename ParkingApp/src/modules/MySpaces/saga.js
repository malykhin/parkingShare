import { put, call, all, takeLatest } from 'redux-saga/effects'

import { actions, types } from './reducer'
import { get } from '../../utils/xhr'
import { setToken, getToken } from '../../utils/auth'

function* getMyCards() {
  const token = yield call(getToken)

  const options = {
    path: '/my-cards/get',
    query: {
      token,
    },
  }
  const { error, response } = yield call(get, options)

  if (response) {
    yield put(actions.getMyCards.success(response.data))
  } else {
    if (error.appErrorCode === 'AuthError') {
      yield call(setToken, '')
    }
    yield put(actions.getMyCards.failure(error))
  }
}

function* lendPlace({ payload }) {
  const token = yield call(getToken)

  const options = {
    path: '/my-cards/lend',
    query: {
      dateTo: payload.dateTo,
      token,
    },
  }
  const { error, response } = yield call(get, options)

  if (response) {
    yield put(actions.lendPlace.success())
    yield put(actions.getMyCards.request())
  } else {
    if (error.appErrorCode === 'AuthError') {
      yield call(setToken, '')
    }
    yield put(actions.lendPlace.failure(error))
  }
}

function* returnPlace() {
  const token = yield call(getToken)

  const options = {
    path: '/my-cards/return',
    query: {
      token,
    },
  }
  const { error, response } = yield call(get, options)

  if (response) {
    yield put(actions.returnPlace.success())
    yield put(actions.getMyCards.request())
  } else {
    if (error.appErrorCode === 'AuthError') {
      yield call(setToken, '')
    }
    yield put(actions.returnPlace.failure(error))
  }
}

function* watchGetMyCards() {
  yield takeLatest(types.GET_MY_CARDS.REQUEST, getMyCards)
}

function* watchLendPlace() {
  yield takeLatest(types.LEND_PLACE.REQUEST, lendPlace)
}

function* watchReturnPlace() {
  yield takeLatest(types.RETURN_PLACE.REQUEST, returnPlace)
}

export default function*() {
  yield all([watchGetMyCards(), watchLendPlace(), watchReturnPlace()])
}
