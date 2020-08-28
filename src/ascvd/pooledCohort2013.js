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
    tenYearRisk: evaluatePooledCohort2013Equation(
      cd.survival.male.black,
      sumXB,
      md.male.black
    ),
  }

  return result
}

const getWhiteMalePooledCohort2013Result = (
  data: ASCVDData
): PooledCohort2013Result => {
  const lnAgeProduct = getWhiteMalelnAgeProduct(data)
  const lnTCholProduct = getWhiteMaleTCholProdct(data)
  const lnTCholXAgeProd = getWhiteMalelnAgeXlnTCholProduct(data)
  const lnHDLProduct = getWhiteMalelnHDLProduct(data)
  const lnHDLXAgeProd = getWhiteMalelnAgeXlnHDLProduct(data)
  const lnSBPProduct = getWhiteMaleSBPProduct(data)
  const smokerProduct = data.isSmoker
    ? cd.regression.male.white.currentSmoker
    : 0
  const diabeticProduct = data.isDiabetic
    ? cd.regression.male.white.diabetes
    : 0

  const sumXB =
    lnAgeProduct +
    lnTCholProduct +
    lnTCholXAgeProd +
    lnHDLProduct +
    lnHDLXAgeProd +
    lnSBPProduct +
    smokerProduct +
    diabeticProduct

  const result: PooledCohort2013Result = {
    tenYearRisk: evaluatePooledCohort2013Equation(
      cd.survival.male.white,
      sumXB,
      md.male.white
    ),
  }

  return result
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
  const lnAgeProduct = getBlackFemalelnAgeProduct(data)
  const lnTCholProduct = getBlackFemaleTCholProdct(data)
  const lnHDLProduct = getBlackFemalelnHDLProduct(data)
  const lnHDLXAgeProd = getBlackFemalelnAgeXlnHDLProduct(data)
  const lnSBPProduct = getBlackFemaleSBPProduct(data)
  const lnAgeXSBPProduct = getBlackFemaleAgeXSBPProduct(data)
  const smokerProduct = data.isSmoker
    ? cd.regression.female.black.currentSmoker
    : 0
  const diabeticProduct = data.isDiabetic
    ? cd.regression.female.black.diabetes
    : 0

  const sumXB =
    lnAgeProduct +
    lnTCholProduct +
    lnHDLProduct +
    lnHDLXAgeProd +
    lnSBPProduct +
    lnAgeXSBPProduct +
    smokerProduct +
    diabeticProduct

  const result: PooledCohort2013Result = {
    tenYearRisk: evaluatePooledCohort2013Equation(
      cd.survival.female.black,
      sumXB,
      md.female.black
    ),
  }

  return result
}

const getWhiteFemalePooledCohort2013Result = (
  data: ASCVDData
): PooledCohort2013Result => {
  throw new Error('Not implemented')
}

const evaluatePooledCohort2013Equation = (
  survival: number,
  individualSum: number,
  meanDataSum: number
): number => {
  return 100 * (1 - Math.pow(survival, Math.exp(individualSum - meanDataSum)))
}

// Black Male
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

// White Male
const getWhiteMalelnAgeProduct = (data): number => {
  const lnAge = Math.log(data.age)
  const B = cd.regression.male.white.lnAge
  const lnAgeProduct = lnAge * B

  return lnAgeProduct
}
const getWhiteMalelnHDLProduct = (data): number => {
  const lnHDL = Math.log(data.cholesterolHDL)
  const B = cd.regression.male.white.lnHDLC
  return lnHDL * B
}

const getWhiteMalelnAgeXlnHDLProduct = (data): number => {
  const lnAge = Math.log(data.age)
  const lnHDL = Math.log(data.cholesterolHDL)
  const B = cd.regression.male.white.lnAgeXlnHDLC
  return lnAge * lnHDL * B
}

const getWhiteMaleTCholProdct = (data): number => {
  const lnTChol = Math.log(data.cholesterolTotal)
  const B = cd.regression.male.white.lnTotalChol
  return lnTChol * B
}

const getWhiteMalelnAgeXlnTCholProduct = (data): number => {
  const lnAge = Math.log(data.age)
  const lnTChol = Math.log(data.cholesterolTotal)
  const B = cd.regression.male.white.lnAgeXlnTotalChol
  return lnAge * lnTChol * B
}

const getWhiteMaleSBPProduct = (data): number => {
  const lnSBP = Math.log(data.systolicBloodPressure)
  const B = data.isOnBloodPressureMeds
    ? cd.regression.male.white.lnTreatedSystolicBP
    : cd.regression.male.white.lnUntreatedSystolicBP
  return lnSBP * B
}

// Black Female

const getBlackFemalelnAgeProduct = (data): number => {
  const lnAge = Math.log(data.age)
  const B = cd.regression.female.black.lnAge
  const lnAgeProduct = lnAge * B

  return lnAgeProduct
}
const getBlackFemaleTCholProdct = (data): number => {
  const lnTChol = Math.log(data.cholesterolTotal)
  const B = cd.regression.female.black.lnTotalChol
  return lnTChol * B
}

const getBlackFemalelnHDLProduct = (data): number => {
  const lnHDL = Math.log(data.cholesterolHDL)
  const B = cd.regression.female.black.lnHDLC
  return lnHDL * B
}

const getBlackFemalelnAgeXlnHDLProduct = (data): number => {
  const lnAge = Math.log(data.age)
  const lnHDL = Math.log(data.cholesterolHDL)
  const B = cd.regression.female.black.lnAgeXlnHDLC
  return lnAge * lnHDL * B
}

const getBlackFemaleSBPProduct = (data): number => {
  const lnSBP = Math.log(data.systolicBloodPressure)
  const B = data.isOnBloodPressureMeds
    ? cd.regression.female.black.lnTreatedSystolicBP
    : cd.regression.female.black.lnUntreatedSystolicBP
  return lnSBP * B
}

const getBlackFemaleAgeXSBPProduct = (data): number => {
  const lnSBP = Math.log(data.systolicBloodPressure)
  const lnAge = Math.log(data.age)
  const B = data.isOnBloodPressureMeds
    ? cd.regression.female.black.lnAgeXlnTreatedSystolicBP
    : cd.regression.female.black.lnAgeXlnUntreatedSystolicBP
  return lnSBP * lnAge * B
}

// White Female
