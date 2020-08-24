// @flow

import type { ASCVDData, FraminghamResult } from '../types/ASCVDData'
import {
  meanData,
  regressionData,
  averageRisk as avgRisk,
} from './_framinghamData'
import ErrorMessages from '../errorMessages'

// NOTE: Log is 'ln', not base-10
// https://www.ahajournals.org/doi/10.1161/circulationaha.107.699579
// Implementation of the Cox regression
// https://www.merckmanuals.com/medical-calculators/Framingham08.htm

export const framinghamByCoxRegression = (
  data: ASCVDData,
  avgRiskValue: string = 'constant'
): FraminghamResult => {
  const { coefficient: cd } = data.isGeneticMale
    ? regressionData.male
    : regressionData.female

  const md = data.isGeneticMale ? meanData.male : meanData.female
  const so10 = data.isGeneticMale
    ? regressionData.male.so10
    : regressionData.female.so10

  const sumBX =
    lnAgeValue(data) +
    lnCholTotalValue(data) +
    lnCholHDLValue(data) +
    lnSBPValue(data) +
    smokingValue(data) +
    diabetesValue(data)

  const sumBXbar = getAverageRisk(data, avgRiskValue)

  const framinghamResult: FraminghamResult = {
    tenYearRisk: 100 * (1 - Math.pow(so10, Math.exp(sumBX - sumBXbar))),
    averageTenYearRisk: -1,
    heartAge: -1,
  }

  return framinghamResult
}

const lnAgeValue = (data: ASCVDData): number => {
  const x = Math.log(data.age)
  const {
    coefficient: { lnAge: b },
  } = data.isGeneticMale ? regressionData.male : regressionData.female

  return x * b
}

const lnCholTotalValue = (data: ASCVDData): number => {
  const x = Math.log(data.cholesterolTotal)
  const {
    coefficient: { lnCholTotal: b },
  } = data.isGeneticMale ? regressionData.male : regressionData.female

  return x * b
}

const lnCholHDLValue = (data: ASCVDData): number => {
  const x = Math.log(data.cholesterolHDL)
  const {
    coefficient: { lnCholHDL: b },
  } = data.isGeneticMale ? regressionData.male : regressionData.female

  return x * b
}

const lnSBPValue = (data: ASCVDData): number => {
  const x = Math.log(data.systolicBloodPressure)
  const { coefficient: c } = data.isGeneticMale
    ? regressionData.male
    : regressionData.female

  const b = data.isOnBloodPressureMeds ? c.lnSBPTreated : c.lnSBPUntreated

  return x * b
}

const smokingValue = (data: ASCVDData): number => {
  const x = data.isSmoker ? 1 : 0
  const {
    coefficient: { smoking: b },
  } = data.isGeneticMale ? regressionData.male : regressionData.female

  return x * b
}

const diabetesValue = (data: ASCVDData): number => {
  const x = data.isDiabetic ? 1 : 0
  const {
    coefficient: { diabetes: b },
  } = data.isGeneticMale ? regressionData.male : regressionData.female

  return x * b
}

const getAverageRisk = (data: ASCVDData, averageRiskMethod: string): number => {
  switch (averageRiskMethod.toLowerCase()) {
    case 'constant':
      return getStaticAverageRisk(data)
    case 'calculated':
      return calculateAverageRisk(data)
    default:
      throw new Error(ErrorMessages.generic.unexpected)
  }
}

const getStaticAverageRisk = (data: ASCVDData): number =>
  data.isGeneticMale ? avgRisk.male : avgRisk.female

const calculateAverageRisk = (data: ASCVDData): number => {
  const { coefficient: cd } = data.isGeneticMale
    ? regressionData.male
    : regressionData.female

  const md = data.isGeneticMale ? meanData.male : meanData.female

  const B_age = cd.lnAge
  const Xbar_age = Math.log(md.age)
  const B_tc = cd.lnCholTotal
  const Xbar_tc = Math.log(md.cholTotal)
  const B_hdl = cd.lnCholHDL
  const Xbar_hdl = Math.log(md.cholHDL)
  const B_bp_treated = cd.lnSBPTreated
  const Xbar_bp_treated = Math.log(md.SBP) * (md.BPTreatedPercent / 100)
  const B_bp_untreated = cd.lnSBPUntreated
  const Xbar_bp_untreated = Math.log(md.SBP) * (1 - md.BPTreatedPercent / 100)
  const B_smoking = cd.smoking
  const smokingPercent = md.smokingPercent / 100
  const B_diabetes = cd.diabetes
  const diabetesPercent = md.diabetesPercent / 100

  const sumBXbar =
    B_age * Xbar_age +
    B_tc * Xbar_tc +
    B_hdl * Xbar_hdl +
    B_bp_treated * Xbar_bp_treated +
    B_bp_untreated * Xbar_bp_untreated +
    B_smoking * smokingPercent +
    B_diabetes * diabetesPercent
  return sumBXbar
}
