// @flow

import type { ASCVDData, FraminghamResult } from '../types/ASCVDData'
import { framinghamByCoxRegression } from './_framinghamByCoxRegression'
import ErrorMessages from '../errorMessages'
import { framinghamByPoints } from './_framinghamByPoints'

const framingham = (
  data: ASCVDData,
  method: string = 'points'
): FraminghamResult => {
  switch (method.toLowerCase()) {
    case 'points':
      return framinghamByPoints(data)
    case 'regression':
      return framinghamByCoxRegression(data)
    default:
      throw new Error(ErrorMessages.ascvd.generic.methodNotImplemented(method))
  }
}

export { framingham }
