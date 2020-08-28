import { framingham } from '../../src/ascvd'

import type { ASCVDData } from '../../src/types/ASCVDData'

const testCases = [
  // Framingham ASCVD by Points
  // [type, age, isDiabetic, isGeneticMale, isBlack, isOnBloodPressureMeds, isSmoker, cholesterolTotal, cholesterolHDL, systolicBloodPressure, tenYearRisk, averageTenYearRisk]
  //----type----age---dm----male--black--meds--smoke--cho-hdl--bp--10y--avg
  // Female
  ['framingham', 39, false, false, false, false, false, 140, 30, 150, 4.5, 0],
  ['framingham', 49, false, false, false, false, false, 140, 30, 150, 7.3, 0],
  ['framingham', 59, false, false, false, false, false, 140, 30, 150, 11.7, 0],
  // Female: meds
  ['framingham', 39, false, false, false, true, false, 140, 30, 150, 6.3, 0],
  ['framingham', 49, false, false, false, true, false, 140, 30, 150, 10, 0],
  ['framingham', 59, false, false, false, true, false, 140, 30, 150, 15.9, 0],
  // Female: smoker
  ['framingham', 39, false, false, false, false, true, 140, 30, 150, 7.3, 0],
  ['framingham', 49, false, false, false, false, true, 140, 30, 150, 11.7, 0],
  ['framingham', 59, false, false, false, false, true, 140, 30, 150, 18.5, 0],
  // Female: meds, smoker
  ['framingham', 39, false, false, true, true, true, 140, 30, 150, 10, 0],
  ['framingham', 49, false, false, true, true, true, 140, 30, 150, 15.9, 0],
  ['framingham', 59, false, false, true, true, true, 140, 30, 150, 24.8, 0],
  // Female: diabetic, meds, smoker
  ['framingham', 39, true, false, true, true, true, 140, 30, 150, 18.5, 0],
  ['framingham', 49, true, false, true, true, true, 140, 30, 150, 28.5, 0],
  ['framingham', 59, true, false, true, true, true, 140, 30, 150, 30, 0],
  // Male
  ['framingham', 39, false, true, false, false, false, 140, 30, 150, 4.7, 0],
  ['framingham', 49, false, true, false, false, false, 140, 30, 150, 9.4, 0],
  ['framingham', 59, false, true, false, false, false, 140, 30, 150, 18.4, 0],
  // Male: meds
  ['framingham', 39, false, true, false, true, false, 140, 30, 150, 6.7, 0],
  ['framingham', 49, false, true, false, true, false, 140, 30, 150, 13.2, 0],
  ['framingham', 59, false, true, false, true, false, 140, 30, 150, 25.3, 0],
  // Male: smoker
  ['framingham', 39, false, true, false, false, true, 140, 30, 150, 9.4, 0],
  ['framingham', 49, false, true, false, false, true, 140, 30, 150, 18.4, 0],
  ['framingham', 59, false, true, false, false, true, 140, 30, 150, 30, 0],
  // Male: diabetic, meds
  ['framingham', 39, true, true, false, true, false, 140, 30, 150, 11.2, 0],
  ['framingham', 49, true, true, false, true, false, 140, 30, 150, 21.6, 0],
  ['framingham', 59, true, true, false, true, false, 140, 30, 150, 30, 0],
  // Male: diabetic, smoker
  ['framingham', 39, true, true, false, false, true, 140, 30, 150, 15.6, 0],
  ['framingham', 49, true, true, false, false, true, 140, 30, 150, 29.4, 0],
  ['framingham', 59, true, true, false, false, true, 140, 30, 150, 30, 0],
  // Male: diabetic, meds, smoker
  ['framingham', 39, true, true, true, true, true, 140, 30, 150, 21.6, 0],
  ['framingham', 49, true, true, true, true, true, 140, 30, 150, 30, 0],
  ['framingham', 59, true, true, true, true, true, 140, 30, 150, 30, 0],
]

const resultVariance = 0.1

const mapToDataPlusFraminghamResult = (td) => {
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
  return {
    type: td[0],
    ascvdData,
    tenYearRisk: td[10],
    averageTenYearRisk: td[11],
  }
}

describe('framingham', () => {
  it("calculates 10 yr risk by points for 'case 1' from the Framingham Study", () => {
    const ascvdData: ASCVDData = {
      age: 61,
      isDiabetic: false,
      isGeneticMale: false,
      isBlack: false,
      isSmoker: true,
      isOnBloodPressureMeds: false,
      cholesterolTotal: 180,
      cholesterolHDL: 47,
      systolicBloodPressure: 124,
    }
    const actual = framingham(ascvdData).tenYearRisk
    const expected = 10.0

    expect(actual).toBeLessThan(expected + resultVariance)
    expect(actual).toBeGreaterThan(expected - resultVariance)
  })

  it("calculates 10 yr risk by points for 'case 2' from the Framingham Study", () => {
    const ascvdData: ASCVDData = {
      age: 53,
      isDiabetic: true,
      isGeneticMale: true,
      isBlack: false,
      isSmoker: false,
      isOnBloodPressureMeds: true,
      cholesterolTotal: 161,
      cholesterolHDL: 55,
      systolicBloodPressure: 125,
    }
    const actual = framingham(ascvdData).tenYearRisk
    const expected = 15.6

    expect(actual).toBeLessThan(expected + resultVariance)
    expect(actual).toBeGreaterThan(expected - resultVariance)
  })

  it('calculates 10 year risk for the Framingham percent risk by points for case list', () => {
    testCases
      .map((c) => mapToDataPlusFraminghamResult(c))
      .filter(({ type } = c) => type === 'framingham')
      .forEach(({ ascvdData, tenYearRisk: expected } = c) => {
        const actual = framingham(ascvdData).tenYearRisk
        expect(actual).toBeLessThan(expected + resultVariance)
        expect(actual).toBeGreaterThan(expected - resultVariance)
      })
  })

  it("calcualates 10 year risk by regression analysis for 'case 1' from the Framingham Study", () => {
    const ascvdData: ASCVDData = {
      age: 61,
      isDiabetic: false,
      isGeneticMale: false,
      isBlack: false,
      isSmoker: true,
      isOnBloodPressureMeds: false,
      cholesterolTotal: 180,
      cholesterolHDL: 47,
      systolicBloodPressure: 124,
    }
    const actual = framingham(ascvdData, {
      calculationMethod: 'regression',
      avgRiskMethod: 'constant',
    }).tenYearRisk
    const expected = 10.48

    expect(actual).toBeLessThan(expected + resultVariance)
    expect(actual).toBeGreaterThan(expected - resultVariance)
  })

  it("calculates 10 year risk by cox regression for 'case 2' from the Framingham Study", () => {
    const ascvdData: ASCVDData = {
      age: 53,
      isDiabetic: true,
      isGeneticMale: true,
      isBlack: false,
      isSmoker: false,
      isOnBloodPressureMeds: true,
      cholesterolTotal: 161,
      cholesterolHDL: 55,
      systolicBloodPressure: 125,
    }
    const actual = framingham(ascvdData, {
      calculationMethod: 'regression',
      avgRiskMethod: 'constant',
    }).tenYearRisk
    const expected = 15.62

    expect(actual).toBeLessThan(expected + resultVariance)
    expect(actual).toBeGreaterThan(expected - resultVariance)
  })
})
