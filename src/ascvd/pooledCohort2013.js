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
  const lnAgeProduct = getBlackMalelnAgeProduct(data)
  const lnTCholProduct = getBlackMaleTCholProdct(data)
  const lnHDLProduct = getBlackMalelnHDLProduct(data)
  const lnSBPProduct = getBlackMaleSBPProduct(data)
  const smokerProduct = data.isSmoker
    ? cd.regression.male.black.currentSmoker
    : 0
  const diabeticProduct = data.isDiabetic
    ? cd.regression.male.black.diabetes
    : 0

  const sumXB =
    lnAgeProduct +
    lnTCholProduct +
    lnHDLProduct +
    lnSBPProduct +
    smokerProduct +
    diabeticProduct

  const result: PooledCohort2013Result = {
    tenYearRisk:
      100 *
      (1 - Math.pow(cd.survival.male.black, Math.exp(sumXB - md.male.black))),
  }

  return result
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

const getBlackMalelnAgeProduct = (data): number => {
  const lnAge = Math.log(data.age)
  const B = cd.regression.male.black.lnAge
  const lnAgeProduct = lnAge * B

  return lnAgeProduct
}
const getBlackMalelnHDLProduct = (data): number => {
  const lnHDL = Math.log(data.cholesterolHDL)
  const B = cd.regression.male.black.lnHDLC
  return lnHDL * B
}

const getBlackMaleTCholProdct = (data): number => {
  const lnTChol = Math.log(data.cholesterolTotal)
  const B = cd.regression.male.black.lnTotalChol
  return lnTChol * B
}
const getBlackMaleSBPProduct = (data): number => {
  const lnSBP = Math.log(data.systolicBloodPressure)
  const B = data.isOnBloodPressureMeds
    ? cd.regression.male.black.lnTreatedSystolicBP
    : cd.regression.male.black.lnUntreatedSystolicBP
  return lnSBP * B
}
