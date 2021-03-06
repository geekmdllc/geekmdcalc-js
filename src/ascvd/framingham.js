// @flow

import type { FraminghamResult } from "../types/FraminghamResult"
import type { ASCVDOptions } from "../types/ASCVDOptions"
import type { ASCVDData } from "../types/ASCVDData"
import { framinghamByCoxRegression } from './_framinghamByCoxRegression'
import ErrorMessages from '../errorMessages'
import { framinghamByPoints } from './_framinghamByPoints'

const framingham = (
  data: ASCVDData,
  options: ASCVDOptions = {
    calculationMethod: 'points',
    avgRiskMethod: 'constant',
  }
): FraminghamResult => {
  if (data.age < 30)
    throw new RangeError(ErrorMessages.ascvd.framingham.ageLessThan30)
  switch (options.calculationMethod.toLowerCase()) {
    case 'points':
      return framinghamByPoints(data)
    case 'regression':
      return framinghamByCoxRegression(data)
    default:
      throw new Error(
        ErrorMessages.ascvd.generic.methodNotImplemented(
          options.calculationMethod
        )
      )
  }
}

export { framingham }
