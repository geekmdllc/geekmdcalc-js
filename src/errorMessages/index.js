// @flow

const ErrorMessages = {
  generic: {
    unexpected: 'An unexpected error has occured.',
  },
  ascvd: {
    generic: {
      methodNotImplemented: (method: string) =>
        `The method '${method}' is not recognized. Try 'points' (default) or 'regression'.`,
    },
  },
}

export default ErrorMessages
