import { pooledCohort2013 } from '../../src/ascvd/'

import type { ASCVDData } from './../../src/types/ASCVDData'

const testCases = [
  // Pooled Cohort 2013 ASCVD
  // [type, age, isDiabetic, isGeneticMale, isBlack, isOnBloodPressureMeds, isSmoker, cholesterolTotal, cholesterolHDL, systolicBloodPressure, tenYearRisk, lifetimeRisk]
  //----type----age---dm----male--black--meds--smoke--cho-hdl--bp--10y--avg
  // Female
  ['pooled13', 39, false, false, false, false, false, 140, 30, 150, 0, 0], // should error out in some way
  ['pooled13', 40, false, false, false, false, false, 140, 30, 150, 0.4, 1.2],
  ['pooled13', 41, false, false, false, false, false, 140, 30, 150, 0.4, 1.3],
  // Female: diabetic
  ['pooled13', 39, true, false, false, false, false, 140, 30, 150, 0, 0], // should error out in some way
  ['pooled13', 40, true, false, false, false, false, 140, 30, 150, 0.4, 2.4],
  ['pooled13', 41, true, false, false, false, false, 140, 30, 150, 0.4, 2.5],
  // Female: black
  ['pooled13', 39, false, false, true, false, false, 140, 30, 150, 0, 0], // should error out in some way
  ['pooled13', 40, false, false, true, false, false, 140, 30, 150, 0.3, 4.0],
  ['pooled13', 41, false, false, true, false, false, 140, 30, 150, 0.3, 4.2],
  // Female: meds
  ['pooled13', 39, false, false, false, true, false, 140, 30, 150, 0, 0], // should error out in some way
  ['pooled13', 40, false, false, false, true, false, 140, 30, 150, 0.4, 1.7],
  ['pooled13', 41, false, false, false, true, false, 140, 30, 150, 0.4, 1.8],
  // Female: smoker
  ['pooled13', 39, false, false, false, false, true, 140, 30, 150, 0, 0], // should error out in some way
  ['pooled13', 40, false, false, false, false, true, 140, 30, 150, 0.4, 5.1],
  ['pooled13', 41, false, false, false, false, true, 140, 30, 150, 0.4, 5.1],
  // Female: diabetic, black
  ['pooled13', 39, true, false, true, false, false, 140, 30, 150, 0, 0], // should error out in some way
  ['pooled13', 40, true, false, true, false, false, 140, 30, 150, 0.3, 9.4],
  ['pooled13', 41, true, false, true, false, false, 140, 30, 150, 0.4, 9.8],
  // Female: diabetic, meds
  ['pooled13', 39, true, false, false, true, false, 140, 30, 150, 0, 0], // should error out in some way
  ['pooled13', 40, true, false, false, true, false, 140, 30, 150, 0.4, 3.2],
  ['pooled13', 41, true, false, false, true, false, 140, 30, 150, 0.4, 3.4],
  // Female: diabetic, smoker
  ['pooled13', 39, true, false, false, false, true, 140, 30, 150, 0, 0], // should error out in some way
  ['pooled13', 40, true, false, false, false, true, 140, 30, 150, 0.4, 9.6],
  ['pooled13', 41, true, false, false, false, true, 140, 30, 150, 0.4, 9.6],
  // Female: diabetic, black, meds
  ['pooled13', 39, true, false, true, true, false, 140, 30, 150, 0, 0], // should error out in some way
  ['pooled13', 40, true, false, true, true, false, 140, 30, 150, 0.3, 23.4],
  ['pooled13', 41, true, false, true, true, false, 140, 30, 150, 0.3, 23.4],
  // Female: diabetic, black, smoker
  ['pooled13', 39, true, false, true, false, true, 140, 30, 150, 0, 0], // should error out in some way
  ['pooled13', 40, true, false, true, false, true, 140, 30, 150, 0.3, 17.9],
  ['pooled13', 41, true, false, true, false, true, 140, 30, 150, 0.3, 18.6],
  // Female: diabetic, black, meds, smoker
  ['pooled13', 39, true, false, true, true, true, 140, 30, 150, 0, 0], // should error out in some way
  ['pooled13', 40, true, false, true, true, true, 140, 30, 150, 0.3, 41.2],
  ['pooled13', 41, true, false, true, true, true, 140, 30, 150, 0.3, 41.3],

  // Male
  ['pooled13', 39, false, true, false, false, false, 140, 30, 150, 0, 0], // should error out in some way
  ['pooled13', 40, false, true, false, false, false, 140, 30, 150, 0.6, 1.5],
  ['pooled13', 41, false, true, false, false, false, 140, 30, 150, 0.7, 1.7],
  // Male: diabetic
  ['pooled13', 39, true, true, false, false, false, 140, 30, 150, 0, 0], // should error out in some way
  ['pooled13', 40, true, true, false, false, false, 140, 30, 150, 0.6, 2.9],
  ['pooled13', 41, true, true, false, false, false, 140, 30, 150, 0.7, 3.3],
  // Male: meds
  ['pooled13', 39, false, true, false, true, false, 140, 30, 150, 0, 0], // should error out in some way
  ['pooled13', 40, false, true, false, true, false, 140, 30, 150, 0.6, 1.8],
  ['pooled13', 41, false, true, false, true, false, 140, 30, 150, 0.7, 2.0],
  // Male: smoker
  ['pooled13', 39, false, true, false, false, true, 140, 30, 150, 0, 0], // should error out in some way
  ['pooled13', 40, false, true, false, false, true, 140, 30, 150, 0.6, 5],
  ['pooled13', 41, false, true, false, false, true, 140, 30, 150, 0.7, 5.4],
  // Male: diabetic, black
  ['pooled13', 39, true, true, true, false, false, 140, 30, 150, 0, 0], // should error out in some way
  ['pooled13', 40, true, true, true, false, false, 140, 30, 150, 2.2, 8.0],
  ['pooled13', 41, true, true, true, false, false, 140, 30, 150, 2.4, 8.5],
  // Male: diabetic, meds
  ['pooled13', 39, true, true, false, true, false, 140, 30, 150, 0, 0], // should error out in some way
  ['pooled13', 40, true, true, false, true, false, 140, 30, 150, 0.6, 3.4],
  ['pooled13', 41, true, true, false, true, false, 140, 30, 150, 0.7, 3.8],
  // Male: diabetic, smoker
  ['pooled13', 39, true, true, false, false, true, 140, 30, 150, 0, 0], // should error out in some way
  ['pooled13', 40, true, true, false, false, true, 140, 30, 150, 0.6, 9.4],
  ['pooled13', 41, true, true, false, false, true, 140, 30, 150, 0.7, 10.2],
  // Male: diabetic, black, meds
  ['pooled13', 39, true, true, true, true, false, 140, 30, 150, 0, 0], // should error out in some way
  ['pooled13', 40, true, true, true, true, false, 140, 30, 150, 2.2, 13.3],
  ['pooled13', 41, true, true, true, true, false, 140, 30, 150, 2.4, 14.1],
  // Male: diabetic, black, smoker
  ['pooled13', 39, true, true, true, false, true, 140, 30, 150, 0, 0], // should error out in some way
  ['pooled13', 40, true, true, true, false, true, 140, 30, 150, 2.2, 13.5],
  ['pooled13', 41, true, true, true, false, true, 140, 30, 150, 2.4, 14.3],
  // Male: diabetic, black, meds, smoker
  ['pooled13', 39, true, true, true, true, true, 140, 30, 150, 0, 0], // should error out in some way
  ['pooled13', 40, true, true, true, true, true, 140, 30, 150, 2.2, 22],
  ['pooled13', 41, true, true, true, true, true, 140, 30, 150, 2.4, 23.2],
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

  it('calculates lifetime risk of an ASCVD event correctly for case list.', () => {
    testCases
      .map((c) => mapToDataPlusPooledCohort2013Result(c))
      .filter(({ type } = c) => type === 'pooled13')
      .forEach(({ ascvdData, lifetimeRisk: expected } = c) => {
        const actual = pooledCohort2013(ascvdData).lifetimeRisk
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

    const result = pooledCohort2013(data).lifetimeRisk
    const expected = 2.1

    expect(result).toEqual(expected)
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
    const result = pooledCohort2013(data).lifetimeRisk
    const expected = 3.0

    expect(result).toEqual(expected)
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

    const result = pooledCohort2013(data).lifetimeRisk
    const expected = 5.3

    expect(result).toEqual(expected)
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
    const result = pooledCohort2013(data).lifetimeRisk
    const expected = 6.1

    expect(result).toEqual(expected)
  })
})
