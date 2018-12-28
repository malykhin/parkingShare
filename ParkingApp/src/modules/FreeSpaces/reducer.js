import { createAction, createRequestTypes, createRequestAction } from '../../utils/actionCreators'
import { getErrorMessage } from '../../utils/error'

export const NAME = 'FreeSpaces'

const initialState = {
  cards: [],
  selectedCard: {},
  loading: false,
  errorMessage: '',
}

export const types = {
  SET_SELECTED_CARD: `${NAME}/SET_SELECTED_CARD`,
  GET_FREE_CARDS: createRequestTypes(`${NAME}/GET_FREE_CARDS`),
  BORROW_FREE_CARD: createRequestTypes(`${NAME}/BORROW_FREE_CARD`),
}

export const actions = {
  setSelectedCard: (card) => createAction(types.SET_SELECTED_CARD, card),
  getFreeCards: createRequestAction(types.GET_FREE_CARDS),
  borrowFreeCard: createRequestAction(types.BORROW_FREE_CARD),
}

export function reducer(state = initialState, action) {
  switch (action.type) {
    case types.SET_SELECTED_CARD:
      return {
        ...state,
        errorMessage: '',
        selectedCard: action.payload,
      }

    case types.BORROW_FREE_CARD.REQUEST:
    case types.GET_FREE_CARDS.REQUEST:
      return {
        ...state,
        errorMessage: '',
        loading: true,
      }

    case types.GET_FREE_CARDS.SUCCESS:
      return {
        ...state,
        errorMessage: '',
        cards: action.payload.data,
        loading: false,
      }

    case types.BORROW_FREE_CARD.FAILURE:
    case types.GET_FREE_CARDS.FAILURE:
      return {
        ...state,
        errorMessage: getErrorMessage(action.payload.appErrorCode),
        loading: false,
      }

    default:
      return state
  }
}
