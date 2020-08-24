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
    framingham: {
      byPoints: {
        ageLessThan30:
          'This version of the Framingham ASCVD risk calculation does not handle cases where age is less than 30 years old.',
      },
    },
  },
}

export default ErrorMessages
