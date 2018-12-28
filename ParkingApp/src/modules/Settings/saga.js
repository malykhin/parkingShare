import { put, call, all, takeLatest } from 'redux-saga/effects'

import { actions, types } from './reducer'
import { get, post } from '../../utils/xhr'
import { setToken, getToken } from '../../utils/auth'

function* updateCredentials({ payload }) {
  const token = yield call(getToken)
  const options = {
    path: '/settings/update',
    body: payload,
  }

  if (token) {
    options.body.token = token
  }

  const { error, response } = yield call(post, options)

  if (response) {
    yield call(setToken, response.data.token)
    yield put(actions.updateCredentials.success({}))
  } else {
    yield put(actions.updateCredentials.failure(error))
  }
}

function* getSettings() {
  const token = yield call(getToken)

  const options = {
    path: '/settings/get',
    query: {
      token,
    },
  }

  const { error, response } = yield call(get, options)

  if (response) {
    yield put(actions.getSettings.success(response.data))
  } else {
    if (error.appErrorCode === 'AuthError') {
      yield call(setToken, '')
    }
    yield put(actions.getSettings.failure(error))
  }
}

function* getAccessToken() {
  const token = yield call(getToken)

  if (token) {
    yield put(actions.getToken.success())
  } else {
    yield put(actions.getToken.failure())
  }
}

function* watchUpdateCredentials() {
  yield takeLatest(types.UPDATE_CREDENTIALS.REQUEST, updateCredentials)
}

function* watchGetSettings() {
  yield takeLatest(types.GET_SETTINGS.REQUEST, getSettings)
}

function* watchGetToken() {
  yield takeLatest(types.GET_TOKEN.REQUEST, getAccessToken)
}

export default function*() {
  yield all([watchUpdateCredentials(), watchGetSettings(), watchGetToken()])
}
