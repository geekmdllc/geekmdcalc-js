// @flow
import type { ASCVDData, PooledCohort2013Result } from '../types/ASCVDData'
import {
  pooledCohort2013Coefficients as cd,
  pooledCohort2013MeanData as md,
} from './_pooledCohort2013Data'
import ErrorMessages from '../errorMessages'

//https://www.onlinejacc.org/content/63/25_Part_B/2935/T6
// Equation 1- S_10^e^[sum(XB) - sum(X_barB)]
const pooledCohort2013 = (data: ASCVDData): PooledCohort2013Result => {
  return getPooledCohort2013Result(data)
}

export { pooledCohort2013 }

function getPooledCohort2013Result(data) {
  return data.isGeneticMale
    ? getMalePooledCohort2013Result(data)
    : getFemalePooledCohort2013Result(data)
}

const getMalePooledCohort2013Result = (
  data: ASCVDData
): PooledCohort2013Result => {
  return data.isBlack
    ? getBlackMalePooledCohort2013Result(data)
    : getWhiteMalePooledCohort2013Result(data)
}

const getBlackMalePooledCohort2013Result = (
  data: ASCVDData
): PooledCohort2013Result => {
  throw new Error('Not implemented')
}

const getWhiteMalePooledCohort2013Result = (
  data: ASCVDData
): PooledCohort2013Result => {
  throw new Error('Not implemented')
}

const getFemalePooledCohort2013Result = (
  data: ASCVDData
): PooledCohort2013Result => {
  return data.isBlack
    ? getBlackFemalePooledCohort2013Result(data)
    : getWhiteFemalePooledCohort2013Result(data)
}

const getBlackFemalePooledCohort2013Result = (
  data: ASCVDData
): PooledCohort2013Result => {
  throw new Error('Not implemented')
}

const getWhiteFemalePooledCohort2013Result = (
  data: ASCVDData
): PooledCohort2013Result => {
  throw new Error('Not implemented')
}
