// @flow

import type { ASCVDData, FraminghamResult } from '../types/ASCVDData'

const framingham = (data: ASCVDData): FraminghamResult => {
  const badResult: FraminghamResult = {
    tenYearRisk: -1,
    averageTenYearRisk: -1,
  }
  return badResult
}

export { framingham }
