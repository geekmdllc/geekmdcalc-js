import { framingham, pooledCohort2013 } from './../src/ascvd/'

import type { ASCVDData } from './../src/types/ASCVDData'

const testCases = [
  // Framingham ASCVD
  // [type, age, isDiabetic, isGeneticMale, isBlack, isOnBloodPressureMeds, isSmoker, cholesterolTotal, cholesterolHDL, systolicBloodPressure, tenYearRisk, averageTenYearRisk]
  ['framingham', 39, false, false, false, false, false, 140, 30, 150, 0, 0],
  ['framingham', 40, false, false, false, false, false, 140, 30, 150, 0, 0],
  ['framingham', 41, false, false, false, false, false, 140, 30, 150, 0, 0],
  ['framingham', 39, true, false, false, false, false, 140, 30, 150, 0, 0],
  ['framingham', 40, true, false, false, false, false, 140, 30, 150, 0, 0],
  ['framingham', 41, true, false, false, false, false, 140, 30, 150, 0, 0],
  ['framingham', 39, false, true, false, false, false, 140, 30, 150, 0, 0],
  ['framingham', 40, false, true, false, false, false, 140, 30, 150, 0, 0],
  ['framingham', 41, false, true, false, false, false, 140, 30, 150, 0, 0],
  ['framingham', 39, false, false, true, false, false, 140, 30, 150, 0, 0],
  ['framingham', 40, false, false, true, false, false, 140, 30, 150, 0, 0],
  ['framingham', 41, false, false, true, false, false, 140, 30, 150, 0, 0],
  ['framingham', 39, false, false, false, true, false, 140, 30, 150, 0, 0],
  ['framingham', 40, false, false, false, true, false, 140, 30, 150, 0, 0],
  ['framingham', 41, false, false, false, true, false, 140, 30, 150, 0, 0],
  ['framingham', 39, false, false, false, false, true, 140, 30, 150, 0, 0],
  ['framingham', 40, false, false, false, false, true, 140, 30, 150, 0, 0],
  ['framingham', 41, false, false, false, false, true, 140, 30, 150, 0, 0],
  ['framingham', 39, true, true, false, false, false, 140, 30, 150, 0, 0],
  ['framingham', 40, true, true, false, false, false, 140, 30, 150, 0, 0],
  ['framingham', 41, true, true, false, false, false, 140, 30, 150, 0, 0],
  ['framingham', 39, true, false, true, false, false, 140, 30, 150, 0, 0],
  ['framingham', 40, true, false, true, false, false, 140, 30, 150, 0, 0],
  ['framingham', 41, true, false, true, false, false, 140, 30, 150, 0, 0],
  ['framingham', 39, true, false, false, true, false, 140, 30, 150, 0, 0],
  ['framingham', 40, true, false, false, true, false, 140, 30, 150, 0, 0],
  ['framingham', 41, true, false, false, true, false, 140, 30, 150, 0, 0],
  ['framingham', 39, true, false, false, false, true, 140, 30, 150, 0, 0],
  ['framingham', 40, true, false, false, false, true, 140, 30, 150, 0, 0],
  ['framingham', 41, true, false, false, false, true, 140, 30, 150, 0, 0],
  ['framingham', 39, true, true, true, false, false, 140, 30, 150, 0, 0],
  ['framingham', 40, true, true, true, false, false, 140, 30, 150, 0, 0],
  ['framingham', 41, true, true, true, false, false, 140, 30, 150, 0, 0],
  ['framingham', 39, true, true, false, true, false, 140, 30, 150, 0, 0],
  ['framingham', 40, true, true, false, true, false, 140, 30, 150, 0, 0],
  ['framingham', 41, true, true, false, true, false, 140, 30, 150, 0, 0],
  ['framingham', 39, true, true, false, false, true, 140, 30, 150, 0, 0],
  ['framingham', 40, true, true, false, false, true, 140, 30, 150, 0, 0],
  ['framingham', 41, true, true, false, false, true, 140, 30, 150, 0, 0],
  ['framingham', 39, true, true, true, false, false, 140, 30, 150, 0, 0],
  ['framingham', 40, true, true, true, false, false, 140, 30, 150, 0, 0],
  ['framingham', 41, true, true, true, false, false, 140, 30, 150, 0, 0],
  ['framingham', 39, true, true, true, true, false, 140, 30, 150, 0, 0],
  ['framingham', 40, true, true, true, true, false, 140, 30, 150, 0, 0],
  ['framingham', 41, true, true, true, true, false, 140, 30, 150, 0, 0],
  ['framingham', 39, true, true, true, false, true, 140, 30, 150, 0, 0],
  ['framingham', 40, true, true, true, false, true, 140, 30, 150, 0, 0],
  ['framingham', 41, true, true, true, false, true, 140, 30, 150, 0, 0],
  ['framingham', 39, true, true, true, true, true, 140, 30, 150, 0, 0],
  ['framingham', 40, true, true, true, true, true, 140, 30, 150, 0, 0],
  ['framingham', 41, true, true, true, true, true, 140, 30, 150, 0, 0],
  // Pooled Cohort 2013 ASCVD
  // [type, age, isDiabetic, isGeneticMale, isBlack, isOnBloodPressureMeds, isSmoker, cholesterolTotal, cholesterolHDL, systolicBloodPressure, tenYearRisk, lifetimeRisk]
  ['pooled13', 39, false, false, false, false, false, 140, 30, 150, 0, 0],
  ['pooled13', 40, false, false, false, false, false, 140, 30, 150, 0, 0],
  ['pooled13', 41, false, false, false, false, false, 140, 30, 150, 0, 0],
  ['pooled13', 39, true, false, false, false, false, 140, 30, 150, 0, 0],
  ['pooled13', 40, true, false, false, false, false, 140, 30, 150, 0, 0],
  ['pooled13', 41, true, false, false, false, false, 140, 30, 150, 0, 0],
  ['pooled13', 39, false, true, false, false, false, 140, 30, 150, 0, 0],
  ['pooled13', 40, false, true, false, false, false, 140, 30, 150, 0, 0],
  ['pooled13', 41, false, true, false, false, false, 140, 30, 150, 0, 0],
  ['pooled13', 39, false, false, true, false, false, 140, 30, 150, 0, 0],
  ['pooled13', 40, false, false, true, false, false, 140, 30, 150, 0, 0],
  ['pooled13', 41, false, false, true, false, false, 140, 30, 150, 0, 0],
  ['pooled13', 39, false, false, false, true, false, 140, 30, 150, 0, 0],
  ['pooled13', 40, false, false, false, true, false, 140, 30, 150, 0, 0],
  ['pooled13', 41, false, false, false, true, false, 140, 30, 150, 0, 0],
  ['pooled13', 39, false, false, false, false, true, 140, 30, 150, 0, 0],
  ['pooled13', 40, false, false, false, false, true, 140, 30, 150, 0, 0],
  ['pooled13', 41, false, false, false, false, true, 140, 30, 150, 0, 0],
  ['pooled13', 39, true, true, false, false, false, 140, 30, 150, 0, 0],
  ['pooled13', 40, true, true, false, false, false, 140, 30, 150, 0, 0],
  ['pooled13', 41, true, true, false, false, false, 140, 30, 150, 0, 0],
  ['pooled13', 39, true, false, true, false, false, 140, 30, 150, 0, 0],
  ['pooled13', 40, true, false, true, false, false, 140, 30, 150, 0, 0],
  ['pooled13', 41, true, false, true, false, false, 140, 30, 150, 0, 0],
  ['pooled13', 39, true, false, false, true, false, 140, 30, 150, 0, 0],
  ['pooled13', 40, true, false, false, true, false, 140, 30, 150, 0, 0],
  ['pooled13', 41, true, false, false, true, false, 140, 30, 150, 0, 0],
  ['pooled13', 39, true, false, false, false, true, 140, 30, 150, 0, 0],
  ['pooled13', 40, true, false, false, false, true, 140, 30, 150, 0, 0],
  ['pooled13', 41, true, false, false, false, true, 140, 30, 150, 0, 0],
  ['pooled13', 39, true, true, true, false, false, 140, 30, 150, 0, 0],
  ['pooled13', 40, true, true, true, false, false, 140, 30, 150, 0, 0],
  ['pooled13', 41, true, true, true, false, false, 140, 30, 150, 0, 0],
  ['pooled13', 39, true, true, false, true, false, 140, 30, 150, 0, 0],
  ['pooled13', 40, true, true, false, true, false, 140, 30, 150, 0, 0],
  ['pooled13', 41, true, true, false, true, false, 140, 30, 150, 0, 0],
  ['pooled13', 39, true, true, false, false, true, 140, 30, 150, 0, 0],
  ['pooled13', 40, true, true, false, false, true, 140, 30, 150, 0, 0],
  ['pooled13', 41, true, true, false, false, true, 140, 30, 150, 0, 0],
  ['pooled13', 39, true, true, true, false, false, 140, 30, 150, 0, 0],
  ['pooled13', 40, true, true, true, false, false, 140, 30, 150, 0, 0],
  ['pooled13', 41, true, true, true, false, false, 140, 30, 150, 0, 0],
  ['pooled13', 39, true, true, true, true, false, 140, 30, 150, 0, 0],
  ['pooled13', 40, true, true, true, true, false, 140, 30, 150, 0, 0],
  ['pooled13', 41, true, true, true, true, false, 140, 30, 150, 0, 0],
  ['pooled13', 39, true, true, true, false, true, 140, 30, 150, 0, 0],
  ['pooled13', 40, true, true, true, false, true, 140, 30, 150, 0, 0],
  ['pooled13', 41, true, true, true, false, true, 140, 30, 150, 0, 0],
  ['pooled13', 39, true, true, true, true, true, 140, 30, 150, 0, 0],
  ['pooled13', 40, true, true, true, true, true, 140, 30, 150, 0, 0],
  ['pooled13', 41, true, true, true, true, true, 140, 30, 150, 0, 0],
]

const mapToDataPlusFraminghamResult = (td) => {
  const ascvdData: ASCVDData = {
    type: td[0],
    bioData: {
      age: td[1],
      isDiabetic: td[2],
      isGeneticMale: td[3],
      isBlack: td[4],
      isSmoker: td[5],
      isOnBloodPressureMeds: td[6],
      cholesterolTotal: td[7],
      cholesterolHDL: td[8],
      systolicBloodPressure: td[9],
    },
  }
  return { ascvdData, tenYearRisk: td[10], averageTenYearRisk: td[11] }
}

const mapToDataPlusPooledCohort2013Result = (td) => {
  const ascvdData: ASCVDData = {
    type: td[0],
    bioData: {
      age: td[1],
      isDiabetic: td[2],
      isGeneticMale: td[3],
      isBlack: td[4],
      isSmoker: td[5],
      isOnBloodPressureMeds: td[6],
      cholesterolTotal: td[7],
      cholesterolHDL: td[8],
      systolicBloodPressure: td[9],
    },
  }
  return { ascvdData, tenYearRisk: td[10], lifetimeRisk: td[11] }
}

describe('ascvd test', () => {
  it('calculates the 10 year risk for the Framingham percent risk of an ASCVD event correctly', () => {
    testCases
      .map((c) => mapToDataPlusFraminghamResult(c))
      .filter(({ ascvdData: { type } } = c) => type === 'framingham')
      .forEach(({ ascvdData, tenYearRisk: expected } = c) => {
        const actual = framingham(ascvdData).tenYearRisk
        expect(actual).toEqual(expected)
      })
  })

  it('calculates the average 10 year risk for the Framingham percent risk of an ASCVD event correctly', () => {
    testCases
      .map((c) => mapToDataPlusFraminghamResult(c))
      .filter(({ ascvdData: { type } } = c) => type === 'framingham')
      .forEach(({ ascvdData, averageTenYearRisk: expected } = c) => {
        const actual = framingham(ascvdData).averageTenYearRisk
        expect(actual).toEqual(expected)
      })
  })

  it('calculates the 10 year risk for the Pooled Cohort Equation (2013) percent risk of an ASCVD event correctly', () => {
    testCases
      .map((c) => mapToDataPlusPooledCohort2013Result(c))
      .filter(({ ascvdData: { type } } = c) => type === 'pooled13')
      .forEach(({ ascvdData, tenYearRisk: expected } = c) => {
        const actual = pooledCohort2013(ascvdData).tenYearRisk
        expect(actual).toEqual(expected)
      })
  })

  it('calculates the lifetime risk for the Pooled Cohort Equation (2013) percent risk of an ASCVD event correctly', () => {
    testCases
      .map((c) => mapToDataPlusPooledCohort2013Result(c))
      .filter(({ ascvdData: { type } } = c) => type === 'pooled13')
      .forEach(({ ascvdData, lifetimeRisk: expected } = c) => {
        const actual = pooledCohort2013(ascvdData).lifetimeRisk
        expect(actual).toEqual(expected)
      })
  })
})
