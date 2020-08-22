import { framingham, pooledCohort2013 } from '../src/ascvd/all'

import type { ASCVDData } from './../src/types/ASCVDData'

const testCases = [
  // Framingham ASCVD
  // [type, age, isDiabetic, isGeneticMale, isBlack, isOnBloodPressureMeds, isSmoker, cholesterolTotal, cholesterolHDL, systolicBloodPressure, tenYearRisk, averageTenYearRisk]
  //----type----age---dm----male--black--meds--smoke--cho-hdl--bp--10y--avg
  // Female
  ['framingham', 39, false, false, false, false, false, 140, 30, 150, 0.2, 0.9],
  ['framingham', 40, false, false, false, false, false, 140, 30, 150, 0.3, 0.9],
  ['framingham', 41, false, false, false, false, false, 140, 30, 150, 0.3, 0.9],
  // Female: meds
  ['framingham', 39, false, false, false, true, false, 140, 30, 150, 0.2, 0.9],
  ['framingham', 40, false, false, false, true, false, 140, 30, 150, 0.3, 1],
  ['framingham', 41, false, false, false, true, false, 140, 30, 150, 0.3, 1],
  // Female: smoker
  ['framingham', 39, false, false, false, false, true, 140, 30, 150, 1.3, 0.9],
  ['framingham', 40, false, false, false, false, true, 140, 30, 150, 1.4, 1],
  ['framingham', 41, false, false, false, false, true, 140, 30, 150, 1.5, 1],
  // Female: smoker, meds
  ['framingham', 39, true, false, true, true, true, 140, 30, 150, 4.9, 4],
  ['framingham', 40, true, false, true, true, true, 140, 30, 150, 5.5, 4],
  ['framingham', 41, true, false, true, true, true, 140, 30, 150, 6.1, 4],
  // Male
  ['framingham', 39, false, true, false, false, false, 140, 30, 150, 0.7, 4],
  ['framingham', 40, false, true, false, false, false, 140, 30, 150, 0.9, 4],
  ['framingham', 41, false, true, false, false, false, 140, 30, 150, 1.1, 4],
  // Male: meds
  ['framingham', 39, true, true, false, true, false, 140, 30, 150, 0.9, 4],
  ['framingham', 40, true, true, false, true, false, 140, 30, 150, 1.1, 4],
  ['framingham', 41, true, true, false, true, false, 140, 30, 150, 1.4, 4],
  // Male: smoker
  ['framingham', 39, true, true, false, false, true, 140, 30, 150, 3.8, 4],
  ['framingham', 40, true, true, false, false, true, 140, 30, 150, 4.3, 4],
  ['framingham', 41, true, true, false, false, true, 140, 30, 150, 4.8, 4],
  // Male: smoker, meds
  ['framingham', 39, true, true, true, true, true, 140, 30, 150, 4.9, 4],
  ['framingham', 40, true, true, true, true, true, 140, 30, 150, 5.5, 4],
  ['framingham', 41, true, true, true, true, true, 140, 30, 150, 6.1, 4],
  // Pooled Cohort 2013 ASCVD
  // [type, age, isDiabetic, isGeneticMale, isBlack, isOnBloodPressureMeds, isSmoker, cholesterolTotal, cholesterolHDL, systolicBloodPressure, tenYearRisk, lifetimeRisk]
  //----type----age---dm----male--black--meds--smoke--cho-hdl--bp--10y--avg
  // Female
  ['pooled13', 39, false, false, false, false, false, 140, 30, 150, 0, 0],
  ['pooled13', 40, false, false, false, false, false, 140, 30, 150, 0, 0],
  ['pooled13', 41, false, false, false, false, false, 140, 30, 150, 0, 0],
  // Female: diabetic
  ['pooled13', 39, true, false, false, false, false, 140, 30, 150, 0, 0],
  ['pooled13', 40, true, false, false, false, false, 140, 30, 150, 0, 0],
  ['pooled13', 41, true, false, false, false, false, 140, 30, 150, 0, 0],
  // Female: black
  ['pooled13', 39, false, false, true, false, false, 140, 30, 150, 0, 0],
  ['pooled13', 40, false, false, true, false, false, 140, 30, 150, 0, 0],
  ['pooled13', 41, false, false, true, false, false, 140, 30, 150, 0, 0],
  // Female: meds
  ['pooled13', 39, false, false, false, true, false, 140, 30, 150, 0, 0],
  ['pooled13', 40, false, false, false, true, false, 140, 30, 150, 0, 0],
  ['pooled13', 41, false, false, false, true, false, 140, 30, 150, 0, 0],
  // Female: smoker
  ['pooled13', 39, false, false, false, false, true, 140, 30, 150, 0, 0],
  ['pooled13', 40, false, false, false, false, true, 140, 30, 150, 0, 0],
  ['pooled13', 41, false, false, false, false, true, 140, 30, 150, 0, 0],
  // Female: diabetic, black
  ['pooled13', 39, true, false, true, false, false, 140, 30, 150, 0, 0],
  ['pooled13', 40, true, false, true, false, false, 140, 30, 150, 0, 0],
  ['pooled13', 41, true, false, true, false, false, 140, 30, 150, 0, 0],
  // Female: diabetic, meds
  ['pooled13', 39, true, false, false, true, false, 140, 30, 150, 0, 0],
  ['pooled13', 40, true, false, false, true, false, 140, 30, 150, 0, 0],
  ['pooled13', 41, true, false, false, true, false, 140, 30, 150, 0, 0],
  // Female: diabetic, smoker
  ['pooled13', 39, true, false, false, false, true, 140, 30, 150, 0, 0],
  ['pooled13', 40, true, false, false, false, true, 140, 30, 150, 0, 0],
  ['pooled13', 41, true, false, false, false, true, 140, 30, 150, 0, 0],
  // Female: diabetic, black, meds
  ['pooled13', 39, true, false, true, true, false, 140, 30, 150, 0, 0],
  ['pooled13', 40, true, false, true, true, false, 140, 30, 150, 0, 0],
  ['pooled13', 41, true, false, true, true, false, 140, 30, 150, 0, 0],
  // Female: diabetic, black, smoker
  ['pooled13', 39, true, false, true, false, true, 140, 30, 150, 0, 0],
  ['pooled13', 40, true, false, true, false, true, 140, 30, 150, 0, 0],
  ['pooled13', 41, true, false, true, false, true, 140, 30, 150, 0, 0],
  // Female: diabetic, black, meds, smoker
  ['pooled13', 39, true, false, true, true, true, 140, 30, 150, 0, 0],
  ['pooled13', 40, true, false, true, true, true, 140, 30, 150, 0, 0],
  ['pooled13', 41, true, false, true, true, true, 140, 30, 150, 0, 0],
  // Male
  ['pooled13', 39, false, true, false, false, false, 140, 30, 150, 0, 0],
  ['pooled13', 40, false, true, false, false, false, 140, 30, 150, 0, 0],
  ['pooled13', 41, false, true, false, false, false, 140, 30, 150, 0, 0],
  // Male: diabetic
  ['pooled13', 39, true, true, false, false, false, 140, 30, 150, 0, 0],
  ['pooled13', 40, true, true, false, false, false, 140, 30, 150, 0, 0],
  ['pooled13', 41, true, true, false, false, false, 140, 30, 150, 0, 0],
  // Male: meds
  ['pooled13', 39, false, true, false, true, false, 140, 30, 150, 0, 0],
  ['pooled13', 40, false, true, false, true, false, 140, 30, 150, 0, 0],
  ['pooled13', 41, false, true, false, true, false, 140, 30, 150, 0, 0],
  // Male: smoker
  ['pooled13', 39, false, true, false, false, true, 140, 30, 150, 0, 0],
  ['pooled13', 40, false, true, false, false, true, 140, 30, 150, 0, 0],
  ['pooled13', 41, false, true, false, false, true, 140, 30, 150, 0, 0],
  // Male: diabetic, black
  ['pooled13', 39, true, true, true, false, false, 140, 30, 150, 0, 0],
  ['pooled13', 40, true, true, true, false, false, 140, 30, 150, 0, 0],
  ['pooled13', 41, true, true, true, false, false, 140, 30, 150, 0, 0],
  // Male: diabetic, meds
  ['pooled13', 39, true, true, false, true, false, 140, 30, 150, 0, 0],
  ['pooled13', 40, true, true, false, true, false, 140, 30, 150, 0, 0],
  ['pooled13', 41, true, true, false, true, false, 140, 30, 150, 0, 0],
  // Male: diabetic, smoker
  ['pooled13', 39, true, true, false, false, true, 140, 30, 150, 0, 0],
  ['pooled13', 40, true, true, false, false, true, 140, 30, 150, 0, 0],
  ['pooled13', 41, true, true, false, false, true, 140, 30, 150, 0, 0],
  // Male: diabetic, black, meds
  ['pooled13', 39, true, true, true, true, false, 140, 30, 150, 0, 0],
  ['pooled13', 40, true, true, true, true, false, 140, 30, 150, 0, 0],
  ['pooled13', 41, true, true, true, true, false, 140, 30, 150, 0, 0],
  // Male: diabetic, black, smoker
  ['pooled13', 39, true, true, true, false, true, 140, 30, 150, 0, 0],
  ['pooled13', 40, true, true, true, false, true, 140, 30, 150, 0, 0],
  ['pooled13', 41, true, true, true, false, true, 140, 30, 150, 0, 0],
  // Male: diabetic, black, meds, smoker
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
