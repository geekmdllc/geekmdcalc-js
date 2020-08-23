// @flow

import type { ASCVDData, FraminghamResult } from '../types/ASCVDData'

// https://www.ahajournals.org/doi/10.1161/circulationaha.107.699579
// NOTE: it would appear that 'log' is 'ln'.

export const framinghamByCoxRegression = (data: ASCVDData): FraminghamResult => {
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
    Math.log(md.SBP) *
      (data.isOnBloodPressureMeds ? cd.lnSBPTreated : cd.lnSBPUntreated) +
    (md.BPTreatedPercent / 100) * cd.lnSBPTreated +
    (md.smokingPercent / 100) * cd.smoking +
    (md.diabetesPercent / 100) * cd.diabetes

  const lnMeanAge = Math.log(md.age)
  const lnMeanCholTot = Math.log(md.cholTotal)
  const lnMeanCholHdl = Math.log(md.cholHDL)
  const lnMeanSbp = Math.log(md.SBP)
  const meanBPTreated = md.BPTreatedPercent / 100
  const meanSmoking = md.smokingPercent / 100
  const meanDiabetes = md.diabetesPercent / 100

  const result = 1 - Math.pow(so10, sumBX - sumBXbar)
  const framinghamResult: FraminghamResult = {
    tenYearRisk: result * 100,
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
  
  const meanData = {
    female: {
      age: 49.1,
      cholTotal: 215.1,
      cholHDL: 57.6,
      SBP: 125.8,
      BPTreatedPercent: 11.76,
      smokingPercent: 34.23,
      diabetesPercent: 3.76,
      CVDIncidentPercent: 10.08,
    },
    male: {
      age: 48.5,
      cholTotal: 212.5,
      cholHDL: 44.9,
      SBP: 129.7,
      BPTreatedPercent: 10.3,
      smokingPercent: 35.22,
      diabetesPercent: 6.5,
      CVDIncidentPercent: 18.09,
    },
  }
  
  const regressionData = {
    female: {
      so10: 0.95012,
      coefficient: {
        lnAge: 2.32888,
        lnCholTotal: 1.20904,
        lnCholHDL: -0.70833,
        lnSBPUntreated: 2.76157,
        lnSBPTreated: 2.82263,
        smoking: 0.52873,
        diabetes: 0.69154,
      },
      hazardRatio: {
        lnAge: 10.27,
        lnCholTotal: 3.35,
        lnCholHDL: 0.49,
        lnSBPUntreated: 15.82,
        lnSBPTreated: 16.82,
        smoking: 1.7,
        diabetes: 2.0,
      },
    },
    male: {
      so10: 0.88936,
      coefficient: {
        lnAge: 3.06117,
        lnCholTotal: 1.1237,
        lnCholHDL: -0.93263,
        lnSBPUntreated: 1.93303,
        lnSBPTreated: 1.99881,
        smoking: 0.65451,
        diabetes: 0.57367,
      },
      hazardRatio: {
        lnAge: 21.35,
        lnCholTotal: 3.08,
        lnCholHDL: 0.39,
        lnSBPUntreated: 6.91,
        lnSBPTreated: 7.38,
        smoking: 1.92,
        diabetes: 1.78,
      },
    },
  }
  