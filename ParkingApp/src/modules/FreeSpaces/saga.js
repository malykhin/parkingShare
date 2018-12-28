import { put, call, all, takeLatest } from 'redux-saga/effects'

import { actions, types } from './reducer'
import { get } from '../../utils/xhr'
import { setToken, getToken } from '../../utils/auth'

function* getFreeCards() {
  const token = yield call(getToken)
  const options = {
    path: '/free-cards/get',
    query: {
      token,
    },
  }
  const { error, response } = yield call(get, options)
  if (response) {
    yield put(actions.getFreeCards.success(response))
  } else {
    if (error.appErrorCode === 'AuthError') {
      yield call(setToken, '')
    }
    yield put(actions.getFreeCards.failure(error))
  }
}

function* borrowFreeCard({ payload }) {
  const token = yield call(getToken)
  const options = {
    path: '/free-cards/borrow',
    query: {
      token,
      email: payload.email,
    },
  }
  const { error, response } = yield call(get, options)
  if (response) {
    yield put(actions.borrowFreeCard.success())
    yield put(actions.getFreeCards.request())
  } else {
    if (error.appErrorCode === 'AuthError') {
      yield call(setToken, '')
    }
    yield put(actions.borrowFreeCard.failure(error))
  }
}

function* watchGetFreeCards() {
  yield takeLatest(types.GET_FREE_CARDS.REQUEST, getFreeCards)
}

function* watchBorrowFreeCard() {
  yield takeLatest(types.BORROW_FREE_CARD.REQUEST, borrowFreeCard)
}

export default function*() {
  yield all([watchGetFreeCards(), watchBorrowFreeCard()])
}
