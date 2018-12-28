import { put, call, all, takeLatest } from 'redux-saga/effects'

import { actions, types } from './reducer'
import { post } from '../../utils/xhr'
import { getToken } from '../../utils/auth'

function* updateFirebaseIdToken({ payload }) {
  const token = yield call(getToken)
  const options = {
    path: '/settings/update-id-token',
    body: {
      idToken: payload,
    },
    query: {
      token,
    },
  }

  const { error, response } = yield call(post, options)
  if (response) {
    yield put(actions.updateFirebaseIdToken.success({}))
  } else {
    yield put(actions.updateFirebaseIdToken.failure(error))
  }
}

function* watchUpdateFirebaseIdToken() {
  yield takeLatest(types.UPDATE_FIREBASE_ID_TOKEN.REQUEST, updateFirebaseIdToken)
}

export default function*() {
  yield all([watchUpdateFirebaseIdToken()])
}
