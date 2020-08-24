// @flow

import type { ASCVDData, FraminghamResult } from '../types/ASCVDData'
import {
  meanData,
  regressionData,
  averageRisk as avgRisk,
} from './_framinghamData'

// https://www.ahajournals.org/doi/10.1161/circulationaha.107.699579
// NOTE: Log is 'ln', not base-10

export const framinghamByCoxRegression = (
  data: ASCVDData
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

  const sumBXbar = averageRisk(data)

  const framinghamResult: FraminghamResult = {
    tenYearRisk: 100 * (1 - Math.pow(so10, Math.exp(sumBX - sumBXbar))),
    averageTenYearRisk: -1,
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

const averageRisk = (data: ASCVDData): number =>
  data.isGeneticMale ? avgRisk.male : avgRisk.female

// This is not resulting correctly.
// For case #1, getting: 26.284 and expecting 26.1931
// For case #2, getting 24.0607 and expecting 23.9802
// const sumBXbar =
//   Math.log(md.age) * cd.lnAge +
//   Math.log(md.cholTotal) * cd.lnCholTotal +
//   Math.log(md.cholHDL) * cd.lnCholHDL +
//   Math.log(md.SBP) * (md.BPTreatedPercent / 100) * cd.lnSBPTreated +
//   Math.log(md.SBP) * (1 - md.BPTreatedPercent / 100) * cd.lnSBPUntreated +
//   (md.smokingPercent / 100) * cd.smoking +
//   (md.diabetesPercent / 100) * cd.diabetes

// const B_age = cd.lnAge
// const Xbar_age = Math.log(md.age)
// const B_tc = cd.lnCholTotal
// const Xbar_tc = Math.log(md.cholTotal)
// const B_hdl = cd.lnCholHDL
// const Xbar_hdl = Math.log(md.cholHDL)
// const B_bp_treated = cd.lnSBPTreated
// const Xbar_bp_treated = Math.log(md.SBP) * (md.BPTreatedPercent / 100)
// const B_bp_untreated = cd.lnSBPUntreated
// const Xbar_bp_untreated = Math.log(md.SBP) * (1 - md.BPTreatedPercent / 100)
// // These are okay
// const B_smoking = cd.smoking
// const smokingPercent = md.smokingPercent / 100
// const B_diabetes = cd.diabetes
// const diabetesPercent = md.diabetesPercent / 100

// const equation = `${B_age}*${Xbar_age} + ${B_tc}*${Xbar_tc} + ${B_hdl}*${Xbar_hdl} + ${B_bp_treated}*${Xbar_bp_treated} + ${B_bp_untreated}*${Xbar_bp_untreated} + ${B_smoking}*${smokingPercent} + ${B_diabetes}*${diabetesPercent}`

// const sumBXbar =
//   B_age * Xbar_age +
//   B_tc * Xbar_tc +
//   B_hdl * Xbar_hdl +
//   B_bp_treated * Xbar_bp_treated +
//   B_bp_untreated * Xbar_bp_untreated +
//   B_smoking * smokingPercent +
//   B_diabetes * diabetesPercent
