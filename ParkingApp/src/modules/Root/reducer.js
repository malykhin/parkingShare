import { createRequestTypes, createRequestAction } from '../../utils/actionCreators'

export const NAME = 'Root'

const initialState = {
  deviceIdUpdated: false,
}

export const types = {
  UPDATE_FIREBASE_ID_TOKEN: createRequestTypes(`${NAME}/UPDATE_FIREBASE_ID_TOKEN`),
}

export const actions = {
  updateFirebaseIdToken: createRequestAction(types.UPDATE_FIREBASE_ID_TOKEN),
}

export function reducer(state = initialState, action) {
  switch (action.type) {
    case types.UPDATE_FIREBASE_ID_TOKEN.REQUEST:
      return {
        ...state,
        deviceIdUpdated: false,
      }
    case types.UPDATE_FIREBASE_ID_TOKEN.SUCCESS:
      return {
        ...state,
        deviceIdUpdated: true,
      }
    case types.UPDATE_FIREBASE_ID_TOKEN.FAILURE:
      return {
        ...state,
        deviceIdUpdated: false,
      }
    default:
      return state
  }
}
