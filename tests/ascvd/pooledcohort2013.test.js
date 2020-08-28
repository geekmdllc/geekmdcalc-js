import { pooledCohort2013 } from '../../src/ascvd/'

import type { ASCVDData } from './../../src/types/ASCVDData'
import ErrorMessages from '../../src/errorMessages'

const testCases = [
  // Pooled Cohort 2013 ASCVD
  // [type, age, isDiabetic, isGeneticMale, isBlack, isOnBloodPressureMeds, isSmoker, cholesterolTotal, cholesterolHDL, systolicBloodPressure, tenYearRisk, lifetimeRisk]
  //----type----age---dm----male--black--meds--smoke--cho-hdl--bp--10y--discontinued
  // Female
  ['pooled13', 40, false, false, false, false, false, 140, 30, 150, 1.2, 0],
  ['pooled13', 41, false, false, false, false, false, 140, 30, 150, 1.3, 0],
  // Female: diabetic
  ['pooled13', 40, true, false, false, false, false, 140, 30, 150, 2.4, 0],
  ['pooled13', 41, true, false, false, false, false, 140, 30, 150, 2.5, 0],
  // Female: black
  ['pooled13', 40, false, false, true, false, false, 140, 30, 150, 4.0, 0],
  ['pooled13', 41, false, false, true, false, false, 140, 30, 150, 4.2, 0],
  // Female: meds
  ['pooled13', 40, false, false, false, true, false, 140, 30, 150, 1.7, 0],
  ['pooled13', 41, false, false, false, true, false, 140, 30, 150, 1.8, 0],
  // Female: smoker
  ['pooled13', 40, false, false, false, false, true, 140, 30, 150, 5.1, 0],
  ['pooled13', 41, false, false, false, false, true, 140, 30, 150, 5.1, 0],
  // Female: diabetic, black
  ['pooled13', 40, true, false, true, false, false, 140, 30, 150, 9.4, 0],
  ['pooled13', 41, true, false, true, false, false, 140, 30, 150, 9.8, 0],
  // Female: diabetic, meds
  ['pooled13', 40, true, false, false, true, false, 140, 30, 150, 3.2, 0],
  ['pooled13', 41, true, false, false, true, false, 140, 30, 150, 3.4, 0],
  // Female: diabetic, smoker
  ['pooled13', 40, true, false, false, false, true, 140, 30, 150, 9.6, 0],
  ['pooled13', 41, true, false, false, false, true, 140, 30, 150, 9.6, 0],
  // Female: diabetic, black, meds
  ['pooled13', 40, true, false, true, true, false, 140, 30, 150, 23.4, 0],
  ['pooled13', 41, true, false, true, true, false, 140, 30, 150, 23.4, 0],
  // Female: diabetic, black, smoker
  ['pooled13', 40, true, false, true, false, true, 140, 30, 150, 17.9, 0],
  ['pooled13', 41, true, false, true, false, true, 140, 30, 150, 18.6, 0],
  // Female: diabetic, black, meds, smoker
  ['pooled13', 40, true, false, true, true, true, 140, 30, 150, 41.2, 0],
  ['pooled13', 41, true, false, true, true, true, 140, 30, 150, 41.3, 0],

  // Male
  ['pooled13', 40, false, true, false, false, false, 140, 30, 150, 1.5, 0],
  ['pooled13', 41, false, true, false, false, false, 140, 30, 150, 1.7, 0],
  // Male: diabetic
  ['pooled13', 40, true, true, false, false, false, 140, 30, 150, 2.9, 0],
  ['pooled13', 41, true, true, false, false, false, 140, 30, 150, 3.3, 0],
  // Male: meds
  ['pooled13', 40, false, true, false, true, false, 140, 30, 150, 1.8, 0],
  ['pooled13', 41, false, true, false, true, false, 140, 30, 150, 2.0, 0],
  // Male: smoker
  ['pooled13', 40, false, true, false, false, true, 140, 30, 150, 5, 0],
  ['pooled13', 41, false, true, false, false, true, 140, 30, 150, 5.4, 0],
  // Male: diabetic, black
  ['pooled13', 40, true, true, true, false, false, 140, 30, 150, 8.0, 0],
  ['pooled13', 41, true, true, true, false, false, 140, 30, 150, 8.5, 0],
  // Male: diabetic, meds
  ['pooled13', 40, true, true, false, true, false, 140, 30, 150, 3.4, 0],
  ['pooled13', 41, true, true, false, true, false, 140, 30, 150, 3.8, 0],
  // Male: diabetic, smoker
  ['pooled13', 40, true, true, false, false, true, 140, 30, 150, 9.4, 0],
  ['pooled13', 41, true, true, false, false, true, 140, 30, 150, 10.2, 0],
  // Male: diabetic, black, meds
  ['pooled13', 40, true, true, true, true, false, 140, 30, 150, 13.3, 0],
  ['pooled13', 41, true, true, true, true, false, 140, 30, 150, 14.1, 0],
  // Male: diabetic, black, smoker
  ['pooled13', 40, true, true, true, false, true, 140, 30, 150, 13.5, 0],
  ['pooled13', 41, true, true, true, false, true, 140, 30, 150, 14.3, 0],
  // Male: diabetic, black, meds, smoker
  ['pooled13', 40, true, true, true, true, true, 140, 30, 150, 22, 0],
  ['pooled13', 41, true, true, true, true, true, 140, 30, 150, 23.2, 0],
]

const resultVariance = 0.1

const mapToDataPlusPooledCohort2013Result = (td) => {
  const ascvdData: ASCVDData = {
    age: td[1],
    isDiabetic: td[2],
    isGeneticMale: td[3],
    isBlack: td[4],
    isOnBloodPressureMeds: td[5],
    isSmoker: td[6],
    cholesterolTotal: td[7],
    cholesterolHDL: td[8],
    systolicBloodPressure: td[9],
  }
  return { type: td[0], ascvdData, tenYearRisk: td[10], lifetimeRisk: td[11] }
}

describe('pooledCohort2013', () => {
  it('throws an error for age less than 40 years old.', () => {
    const data: ASCVDData = {
      age: 39,
      isGeneticMale: false,
      isBlack: false,
      cholesterolTotal: 213,
      cholesterolHDL: 50,
      systolicBloodPressure: 120,
      isOnBloodPressureMeds: false,
      isSmoker: false,
      isDiabetic: false,
    }

    expect(() => pooledCohort2013(data)).toThrow(
      ErrorMessages.ascvd.pooledCohort2013.ageLessThan40
    )
  })

  it('calculates 10 yr risk for of an ASCVD event correctly for case list.', () => {
    testCases
      .map((c) => mapToDataPlusPooledCohort2013Result(c))
      .filter(({ type } = c) => type === 'pooled13')
      .forEach(({ ascvdData, tenYearRisk: expected } = c) => {
        const actual = pooledCohort2013(ascvdData).tenYearRisk
        expect(actual).toBeLessThan(expected + resultVariance)
        expect(actual).toBeGreaterThan(expected - resultVariance)
      })
  })

  it('calculates 10 yr risk for the white woman case in the ACC/AHA paper', () => {
    const data: ASCVDData = {
      age: 55,
      isGeneticMale: false,
      isBlack: false,
      cholesterolTotal: 213,
      cholesterolHDL: 50,
      systolicBloodPressure: 120,
      isOnBloodPressureMeds: false,
      isSmoker: false,
      isDiabetic: false,
    }

    const result = pooledCohort2013(data).tenYearRisk
    const expected = 2.1

    expect(result).toBeLessThan(expected + resultVariance)
    expect(result).toBeGreaterThan(expected - resultVariance)
  })

  it('calculates 10 yr risk for the black woman case in the ACC/AHA paper', () => {
    const data: ASCVDData = {
      age: 55,
      isGeneticMale: false,
      isBlack: true,
      cholesterolTotal: 213,
      cholesterolHDL: 50,
      systolicBloodPressure: 120,
      isOnBloodPressureMeds: false,
      isSmoker: false,
      isDiabetic: false,
    }
    const result = pooledCohort2013(data).tenYearRisk
    const expected = 3.0

    expect(result).toBeLessThan(expected + resultVariance)
    expect(result).toBeGreaterThan(expected - resultVariance)
  })

  it('calculates 10 yr risk for white man case in the ACC/AHA paper', () => {
    const data: ASCVDData = {
      age: 55,
      isGeneticMale: true,
      isBlack: false,
      cholesterolTotal: 213,
      cholesterolHDL: 50,
      systolicBloodPressure: 120,
      isOnBloodPressureMeds: false,
      isSmoker: false,
      isDiabetic: false,
    }

    const result = pooledCohort2013(data).tenYearRisk
    const expected = 5.3

    expect(result).toBeLessThan(expected + resultVariance)
    expect(result).toBeGreaterThan(expected - resultVariance)
  })

  it('calculates  10 yr risk for the black man case in the ACC/AHA paper', () => {
    const data: ASCVDData = {
      age: 55,
      isGeneticMale: true,
      isBlack: true,
      cholesterolTotal: 213,
      cholesterolHDL: 50,
      systolicBloodPressure: 120,
      isOnBloodPressureMeds: false,
      isSmoker: false,
      isDiabetic: false,
    }
    const result = pooledCohort2013(data).tenYearRisk
    const expected = 6.1

    expect(result).toBeLessThan(expected + resultVariance)
    expect(result).toBeGreaterThan(expected - resultVariance)
  })
})
