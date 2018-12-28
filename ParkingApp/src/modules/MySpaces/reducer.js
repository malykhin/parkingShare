import { createAction, createRequestTypes, createRequestAction } from '../../utils/actionCreators'
import { getErrorMessage } from '../../utils/error'

export const NAME = 'MySpaces'

const initialState = {
  cards: [],
  selectedCard: {},
  loading: false,
  errorMessage: '',
}

export const types = {
  SET_SELECTED_CARD: `${NAME}/SET_SELECTED_CARD`,
  RETURN_PLACE: createRequestTypes(`${NAME}/RETURN_PLACE`),
  LEND_PLACE: createRequestTypes(`${NAME}/LEND_PLACE`),
  GET_MY_CARDS: createRequestTypes(`${NAME}/GET_MY_CARDS`),
}

export const actions = {
  setSelectedCard: (card) => createAction(types.SET_SELECTED_CARD, card),
  returnPlace: createRequestAction(types.RETURN_PLACE),
  lendPlace: createRequestAction(types.LEND_PLACE),
  getMyCards: createRequestAction(types.GET_MY_CARDS),
}

export function reducer(state = initialState, action) {
  switch (action.type) {
    case types.SET_SELECTED_CARD:
      return {
        ...state,
        errorMessage: '',
        selectedCard: action.payload,
      }

    case types.GET_MY_CARDS.REQUEST:
    case types.LEND_PLACE.REQUEST:
    case types.RETURN_PLACE.REQUEST:
      return {
        ...state,
        loading: true,
      }

    case types.GET_MY_CARDS.SUCCESS:
      return {
        ...state,
        cards: action.payload,
        errorMessage: '',
        loading: false,
      }

    case types.LEND_PLACE.SUCCESS:
    case types.RETURN_PLACE.SUCCESS:
      return {
        ...state,
        errorMessage: '',
        loading: false,
      }

    case types.GET_MY_CARDS.FAILURE:
    case types.LEND_PLACE.FAILURE:
    case types.RETURN_PLACE.FAILURE:
      return {
        ...state,
        errorMessage: getErrorMessage(action.payload.appErrorCode),
        loading: false,
      }

    default:
      return state
  }
}
