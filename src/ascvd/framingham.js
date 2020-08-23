// @flow

import type { ASCVDData, FraminghamResult } from '../types/ASCVDData'
import { framinghamByCoxRegression } from './_framinghamByCoxRegression'
import ErrorMessages from '../errorMessages'

// https://www.ahajournals.org/doi/10.1161/circulationaha.107.699579
// NOTE: it would appear that 'log' is 'ln'.
const framingham = (
  data: ASCVDData,
  method: string = 'points'
): FraminghamResult => {
  switch (method.toLowerCase()) {
    case 'points':
      throw new Error('Not implemented')
    case 'regression':
      return framinghamByCoxRegression(data)
    default:
      throw new Error(ErrorMessages.ascvd.generic.methodNotImplemented(method))
  }
}

export { framingham }
