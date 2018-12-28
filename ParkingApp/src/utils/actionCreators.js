const REQUEST = 'REQUEST'
const SUCCESS = 'SUCCESS'
const FAILURE = 'FAILURE'

export function createRequestTypes(base) {
  return [REQUEST, SUCCESS, FAILURE].reduce((acc, type) => {
    acc[type] = `${base}_${type}`
    return acc
  }, {})
}

export function createAction(type, payload = {}) {
  return { type, payload }
}

export function createRequestAction(types) {
  return {
    request: (payload) => createAction(types[REQUEST], payload),
    success: (payload) => createAction(types[SUCCESS], payload),
    failure: (payload) => createAction(types[FAILURE], payload),
  }
}
