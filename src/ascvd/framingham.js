// @flow

import type { ASCVDData, FraminghamResult } from '../types/ASCVDData'

// https://www.ahajournals.org/doi/10.1161/circulationaha.107.699579
const framingham = (data: ASCVDData): FraminghamResult => {
  const badResult: FraminghamResult = {
    tenYearRisk: -1,
    averageTenYearRisk: -1,
  }
  return badResult
}

export { framingham }

const agePoints = (data: ASCVDData): number => {
  return data.isGeneticMale ? agePointsMale(data) : agePointsFemale(data)
}

const agePointsFemale = (data: ASCVDData): number => {
  throw new Error('Not implemented')
}

const agePointsMale = (data: ASCVDData): number => {
  throw new Error('Not implemented')
}
