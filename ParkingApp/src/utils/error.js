const errorMessages = {
  AuthError: 'Authentication error',
  BadRequest: 'Bad request params',
  UnknownPath: 'Unknown API path',
  Forbidden: 'Authentication error',
  InternalError: 'Unknown error',
  UnknownError: 'Unknown error',
  EmailConfirmationError: 'Please, confirm your email.',
  UserAlreadyExist: 'This email is already registered',
  UnableToLendFreeCard: 'Unable to lend free place',
  UnableToReturnCard: 'Unable to return this place',
  UnableToBorrowCard: 'Unable to borrow this place',
  EmailNotConfirmed: 'Please, confirm your email.',
  EmailNotValid: 'Please use valid "lohika.com" email.',
  Required: 'All fields required!',
}

export const getErrorMessage = (appErrorCode) => errorMessages[appErrorCode] || errorMessages.UnknownError
