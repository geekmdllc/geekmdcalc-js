// @flow

import type { ASCVDData, FraminghamResult } from '../types/ASCVDData'
import { meanData, regressionData } from './_framinghamData'

// https://www.ahajournals.org/doi/10.1161/circulationaha.107.699579
// NOTE: it would appear that 'log' is 'ln'.

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

  //TODO: Error is likely in here
  const sumBXbar =
    Math.log(md.age) * cd.lnAge +
    Math.log(md.cholTotal) * cd.lnCholTotal +
    Math.log(md.cholHDL) * cd.lnCholHDL +
    Math.log(md.SBP) * (md.BPTreatedPercent / 100) * cd.lnSBPTreated +
    Math.log(md.SBP) * (1 - md.BPTreatedPercent / 100) * cd.lnSBPUntreated +
    (md.smokingPercent / 100) * cd.smoking +
    (md.diabetesPercent / 100) * cd.diabetes

  const framinghamResult: FraminghamResult = {
    tenYearRisk: Math.pow(so10, sumBX - sumBXbar) * 100,
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
