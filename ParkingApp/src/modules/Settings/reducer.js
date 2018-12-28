import { createAction, createRequestTypes, createRequestAction } from '../../utils/actionCreators'
import { getErrorMessage } from '../../utils/error'

export const NAME = 'Settings'

const initialState = {
  firstName: '',
  lastName: '',
  email: '',
  errorMessage: '',
  loading: false,
  hasToken: false,
}

export const types = {
  SET_FORM_VALUE: `${NAME}/SET_FORM_VALUE`,
  SET_ERROR_MESSAGE: `${NAME}/SET_ERROR_MESSAGE`,
  GET_SETTINGS: createRequestTypes(`${NAME}/GET_SETTINGS`),
  UPDATE_CREDENTIALS: createRequestTypes(`${NAME}/UPDATE_CREDENTIALS`),
  GET_TOKEN: createRequestTypes(`${NAME}/GET_TOKEN`),
}

export const actions = {
  setFormValue: (valueName, value) => createAction(types.SET_FORM_VALUE, { valueName, value }),
  setErrorMessage: (errorMessage) => createAction(types.SET_ERROR_MESSAGE, errorMessage),
  updateCredentials: createRequestAction(types.UPDATE_CREDENTIALS),
  getSettings: createRequestAction(types.GET_SETTINGS),
  getToken: createRequestAction(types.GET_TOKEN),
}

export function reducer(state = initialState, action) {
  switch (action.type) {
    case types.SET_FORM_VALUE:
      return {
        ...state,
        errorMessage: '',
        [action.payload.valueName]: action.payload.value,
      }

    case types.SET_ERROR_MESSAGE:
      return {
        ...state,
        errorMessage: action.payload,
      }

    case types.GET_TOKEN.REQUEST:
      return {
        ...state,
        hasToken: false,
      }

    case types.UPDATE_CREDENTIALS.REQUEST:
    case types.GET_SETTINGS.REQUEST:
      return {
        ...state,
        errorMessage: '',
        loading: true,
      }

    case types.UPDATE_CREDENTIALS.SUCCESS:
      return {
        ...state,
        errorMessage: '',
        loading: false,
        hasToken: true,
      }

    case types.GET_SETTINGS.SUCCESS:
      return {
        ...state,
        errorMessage: '',
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        email: action.payload.email,
        loading: false,
      }

    case types.GET_TOKEN.SUCCESS:
      return {
        ...state,
        hasToken: true,
      }

    case types.GET_TOKEN.FAILURE:
      return {
        ...state,
        hasToken: false,
      }

    case types.UPDATE_CREDENTIALS.FAILURE:
    case types.GET_SETTINGS.FAILURE:
      return {
        ...state,
        loading: false,
        errorMessage: getErrorMessage(action.payload.appErrorCode),
      }
    default:
      return state
  }
}
