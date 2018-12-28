const errorResponseHandler = (res, err) => {
  const errorResponse = errorFactory(err)
  return res.status(errorResponse.statusCode).end(JSON.stringify(errorResponse))
}

const responseHandler = (res, data) => {
  res.setHeader('Content-Type', 'application/json')
  const response = {
    status: 'OK',
    data: data,
  }
  res.end(JSON.stringify(response))
}

const httpResponseStatuses = {
  AuthError: 401,
  BadRequest: 400,
  UnknownPath: 404,
  Forbidden: 403,
  OK: 200,
  InternalError: 500,
  UnknownError: 500,
  EmailConfirmationError: 409,
  UserAlreadyExist: 409,
  UnableToLendFreeCard: 409,
  UnableToReturnCard: 409,
  UnableToBorrowCard: 409,
  EmailNotConfirmed: 403,
  EmailNotValid: 400,
}

const getAppErrorCode = (error) => error.message || 'UnknownError'

const errorFactory = (error) => {
  const appErrorCode = getAppErrorCode(error)
  const statusCode = httpResponseStatuses[appErrorCode] || 500
  const errorObject = {
    status: 'ERROR',
    statusCode: statusCode,
    appErrorCode: appErrorCode,
  }
  return errorObject
}

module.exports = {
  errorResponseHandler,
  responseHandler,
}
