import { framingham, pooledCohort2013 } from './../src/ascvd/'

import type { ASCVDData } from './../src/types/ASCVDData'

const testCases = [
  // Framingham ASCVD
  // [type, age, isDiabetic, isGeneticMale, isBlack, isOnBloodPressureMeds, isSmoker, cholesterolTotal, cholesterolHDL, systolicBloodPressure, expectedResult]
  ['framingham', 39, false, false, false, false, false, 140, 30, 150, 0],
  ['framingham', 40, false, false, false, false, false, 140, 30, 150, 0],
  ['framingham', 41, false, false, false, false, false, 140, 30, 150, 0],
  ['framingham', 39, true, false, false, false, false, 140, 30, 150, 0],
  ['framingham', 40, true, false, false, false, false, 140, 30, 150, 0],
  ['framingham', 41, true, false, false, false, false, 140, 30, 150, 0],
  ['framingham', 39, false, true, false, false, false, 140, 30, 150, 0],
  ['framingham', 40, false, true, false, false, false, 140, 30, 150, 0],
  ['framingham', 41, false, true, false, false, false, 140, 30, 150, 0],
  ['framingham', 39, false, false, true, false, false, 140, 30, 150, 0],
  ['framingham', 40, false, false, true, false, false, 140, 30, 150, 0],
  ['framingham', 41, false, false, true, false, false, 140, 30, 150, 0],
  ['framingham', 39, false, false, false, true, false, 140, 30, 150, 0],
  ['framingham', 40, false, false, false, true, false, 140, 30, 150, 0],
  ['framingham', 41, false, false, false, true, false, 140, 30, 150, 0],
  ['framingham', 39, false, false, false, false, true, 140, 30, 150, 0],
  ['framingham', 40, false, false, false, false, true, 140, 30, 150, 0],
  ['framingham', 41, false, false, false, false, true, 140, 30, 150, 0],
  ['framingham', 39, true, true, false, false, false, 140, 30, 150, 0],
  ['framingham', 40, true, true, false, false, false, 140, 30, 150, 0],
  ['framingham', 41, true, true, false, false, false, 140, 30, 150, 0],
  ['framingham', 39, true, false, true, false, false, 140, 30, 150, 0],
  ['framingham', 40, true, false, true, false, false, 140, 30, 150, 0],
  ['framingham', 41, true, false, true, false, false, 140, 30, 150, 0],
  ['framingham', 39, true, false, false, true, false, 140, 30, 150, 0],
  ['framingham', 40, true, false, false, true, false, 140, 30, 150, 0],
  ['framingham', 41, true, false, false, true, false, 140, 30, 150, 0],
  ['framingham', 39, true, false, false, false, true, 140, 30, 150, 0],
  ['framingham', 40, true, false, false, false, true, 140, 30, 150, 0],
  ['framingham', 41, true, false, false, false, true, 140, 30, 150, 0],
  ['framingham', 39, true, true, true, false, false, 140, 30, 150, 0],
  ['framingham', 40, true, true, true, false, false, 140, 30, 150, 0],
  ['framingham', 41, true, true, true, false, false, 140, 30, 150, 0],
  ['framingham', 39, true, true, false, true, false, 140, 30, 150, 0],
  ['framingham', 40, true, true, false, true, false, 140, 30, 150, 0],
  ['framingham', 41, true, true, false, true, false, 140, 30, 150, 0],
  ['framingham', 39, true, true, false, false, true, 140, 30, 150, 0],
  ['framingham', 40, true, true, false, false, true, 140, 30, 150, 0],
  ['framingham', 41, true, true, false, false, true, 140, 30, 150, 0],
  ['framingham', 39, true, true, true, false, false, 140, 30, 150, 0],
  ['framingham', 40, true, true, true, false, false, 140, 30, 150, 0],
  ['framingham', 41, true, true, true, false, false, 140, 30, 150, 0],
  ['framingham', 39, true, true, true, true, false, 140, 30, 150, 0],
  ['framingham', 40, true, true, true, true, false, 140, 30, 150, 0],
  ['framingham', 41, true, true, true, true, false, 140, 30, 150, 0],
  ['framingham', 39, true, true, true, false, true, 140, 30, 150, 0],
  ['framingham', 40, true, true, true, false, true, 140, 30, 150, 0],
  ['framingham', 41, true, true, true, false, true, 140, 30, 150, 0],
  ['framingham', 39, true, true, true, true, true, 140, 30, 150, 0],
  ['framingham', 40, true, true, true, true, true, 140, 30, 150, 0],
  ['framingham', 41, true, true, true, true, true, 140, 30, 150, 0],
  // Pooled Cohort 2013 ASCVD
  // [type, age, isDiabetic, isGeneticMale, isBlack, isOnBloodPressureMeds, isSmoker, cholesterolTotal, cholesterolHDL, systolicBloodPressure, expectedResult]
  ['pooled13', 39, false, false, false, false, false, 140, 30, 150, 0],
  ['pooled13', 40, false, false, false, false, false, 140, 30, 150, 0],
  ['pooled13', 41, false, false, false, false, false, 140, 30, 150, 0],
  ['pooled13', 39, true, false, false, false, false, 140, 30, 150, 0],
  ['pooled13', 40, true, false, false, false, false, 140, 30, 150, 0],
  ['pooled13', 41, true, false, false, false, false, 140, 30, 150, 0],
  ['pooled13', 39, false, true, false, false, false, 140, 30, 150, 0],
  ['pooled13', 40, false, true, false, false, false, 140, 30, 150, 0],
  ['pooled13', 41, false, true, false, false, false, 140, 30, 150, 0],
  ['pooled13', 39, false, false, true, false, false, 140, 30, 150, 0],
  ['pooled13', 40, false, false, true, false, false, 140, 30, 150, 0],
  ['pooled13', 41, false, false, true, false, false, 140, 30, 150, 0],
  ['pooled13', 39, false, false, false, true, false, 140, 30, 150, 0],
  ['pooled13', 40, false, false, false, true, false, 140, 30, 150, 0],
  ['pooled13', 41, false, false, false, true, false, 140, 30, 150, 0],
  ['pooled13', 39, false, false, false, false, true, 140, 30, 150, 0],
  ['pooled13', 40, false, false, false, false, true, 140, 30, 150, 0],
  ['pooled13', 41, false, false, false, false, true, 140, 30, 150, 0],
  ['pooled13', 39, true, true, false, false, false, 140, 30, 150, 0],
  ['pooled13', 40, true, true, false, false, false, 140, 30, 150, 0],
  ['pooled13', 41, true, true, false, false, false, 140, 30, 150, 0],
  ['pooled13', 39, true, false, true, false, false, 140, 30, 150, 0],
  ['pooled13', 40, true, false, true, false, false, 140, 30, 150, 0],
  ['pooled13', 41, true, false, true, false, false, 140, 30, 150, 0],
  ['pooled13', 39, true, false, false, true, false, 140, 30, 150, 0],
  ['pooled13', 40, true, false, false, true, false, 140, 30, 150, 0],
  ['pooled13', 41, true, false, false, true, false, 140, 30, 150, 0],
  ['pooled13', 39, true, false, false, false, true, 140, 30, 150, 0],
  ['pooled13', 40, true, false, false, false, true, 140, 30, 150, 0],
  ['pooled13', 41, true, false, false, false, true, 140, 30, 150, 0],
  ['pooled13', 39, true, true, true, false, false, 140, 30, 150, 0],
  ['pooled13', 40, true, true, true, false, false, 140, 30, 150, 0],
  ['pooled13', 41, true, true, true, false, false, 140, 30, 150, 0],
  ['pooled13', 39, true, true, false, true, false, 140, 30, 150, 0],
  ['pooled13', 40, true, true, false, true, false, 140, 30, 150, 0],
  ['pooled13', 41, true, true, false, true, false, 140, 30, 150, 0],
  ['pooled13', 39, true, true, false, false, true, 140, 30, 150, 0],
  ['pooled13', 40, true, true, false, false, true, 140, 30, 150, 0],
  ['pooled13', 41, true, true, false, false, true, 140, 30, 150, 0],
  ['pooled13', 39, true, true, true, false, false, 140, 30, 150, 0],
  ['pooled13', 40, true, true, true, false, false, 140, 30, 150, 0],
  ['pooled13', 41, true, true, true, false, false, 140, 30, 150, 0],
  ['pooled13', 39, true, true, true, true, false, 140, 30, 150, 0],
  ['pooled13', 40, true, true, true, true, false, 140, 30, 150, 0],
  ['pooled13', 41, true, true, true, true, false, 140, 30, 150, 0],
  ['pooled13', 39, true, true, true, false, true, 140, 30, 150, 0],
  ['pooled13', 40, true, true, true, false, true, 140, 30, 150, 0],
  ['pooled13', 41, true, true, true, false, true, 140, 30, 150, 0],
  ['pooled13', 39, true, true, true, true, true, 140, 30, 150, 0],
  ['pooled13', 40, true, true, true, true, true, 140, 30, 150, 0],
  ['pooled13', 41, true, true, true, true, true, 140, 30, 150, 0],
]

const mapToDataPlusResultObj = (td) => {
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
  return { ascvdData, score: td[10] }
}

describe('ascvd test', () => {
  it('calculates a set of Framingham ASCVD scores correct', () => {
    testCases
      .map((c) => mapToDataPlusResultObj(c))
      .filter(({ ascvdData: { type } } = c) => type === 'framingham')
      .forEach(({ ascvdData: ad, score } = c) => {
        expect(framingham(ad)).toEqual(score)
      })
  })

  it('calculates a set of Pooled Cohort 2013 ASCVD scores correct', () => {
    testCases
      .map((c) => mapToDataPlusResultObj(c))
      .filter(({ ascvdData: { type } } = c) => type === 'pooled13')
      .forEach(({ ascvdData: ad, score } = c) => {
        expect(pooledCohort2013(ad)).toEqual(score)
      })
  })
})
