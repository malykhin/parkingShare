import { apiPath } from '../../config'

const getFullUrl = (path = '/', query = {}) => {
  let searchString = '?'
  for (let param in query) {
    if (query.hasOwnProperty(param)) {
      searchString += `${param}=${query[param]}&`
    }
  }
  searchString = searchString.replace(/&$/, '')
  const url = apiPath + path + (searchString && searchString.length > 1 ? searchString : '')
  return url
}

const request = (url, options) =>
  fetch(url, options)
    .then((response) => response.json().then((json) => ({ response, json })))
    .then(({ response, json }) => {
      if (!response.ok) {
        return Promise.reject(json)
      }
      return json
    })
    .then((response) => ({ response }), (error) => ({ error }))

export const get = async ({ path, query = {} }) => {
  const options = {
    method: 'GET',
    // eslint-disable-next-line
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
  }
  return request(getFullUrl(path, query), options)
}

export const post = async ({ path, body, query = {} }) => {
  const options = {
    method: 'POST',
    body: JSON.stringify(body),
    // eslint-disable-next-line
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
  }
  return request(getFullUrl(path, query), options)
}
