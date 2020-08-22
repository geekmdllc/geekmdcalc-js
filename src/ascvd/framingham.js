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

const regressionData = {
  female: {
    so10: 0.95012,
    coefficient: {
      logAge: 2.32888,
      logCholTotal: 1.20904,
      logCholHDL: -0.70833,
      logSBPUntreated: 2.76157,
      logSBPTreated: 2.82263,
      smoking: 0.52873,
      diabetes: 0.69154,
    },
    hazardRatio: {
      logAge: 10.27,
      logCholTotal: 3.35,
      logCholHDL: 0.49,
      logSBPUntreated: 15.82,
      logSBPTreated: 16.82,
      smoking: 1.7,
      diabetes: 2.0,
    },
    male: {
      so10: 0.88936,
      coefficient: {
        logAge: 3.06117,
        logCholTotal: 1.1237,
        logCholHDL: -0.93263,
        logSBPUntreated: 1.93303,
        logSBPTreated: 1.99881,
        smoking: 0.65451,
        diabetes: 0.57367,
      },
      hazardRatio: {
        logAge: 21.35,
        logCholTotal: 3.08,
        logCholHDL: 0.39,
        logSBPUntreated: 6.91,
        logSBPTreated: 7.38,
        smoking: 1.92,
        diabetes: 1.78,
      },
    },
  },
}
