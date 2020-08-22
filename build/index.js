'use strict'

Object.defineProperty(exports, '__esModule', { value: true })

var pooledCohort2013 = function pooledCohort2013(data) {
  var badResult = {
    tenYearRisk: -1,
    lifetimeRisk: -1,
  }
  return badResult
}

// https://www.ahajournals.org/doi/10.1161/circulationaha.107.699579
// NOTE: it would appear that 'log' is 'ln'.
var framingham = function framingham(data) {
  debugger
  var _ref = data.isGeneticMale ? regressionData.male : regressionData.female,
    cd = _ref.coefficient

  var md = data.isGeneticMale ? meanData.male : meanData.female
  var so10 = data.isGeneticMale
    ? regressionData.male.so10
    : regressionData.female.so10
  var sumBX =
    lnAgeValue(data) +
    lnCholTotalValue(data) +
    lnCholHDLValue(data) +
    lnSBPValue(data) +
    smokingValue(data) +
    diabetesValue(data)
  var sumBXbar =
    md.age * cd.lnAge +
    md.cholTotal * cd.lnCholTotal +
    md.cholHDL * cd.lnCholHDL +
    md.SBP *
      (data.isOnBloodPressureMeds ? cd.lnSBPTreated : cd.lnSBPUntreated) +
    (md.smokingPercent / 100) * cd.smoking +
    (md.diabetesPercent / 100) * cd.diabetes
  var result = 1 - Math.pow(so10, sumBX - sumBXbar)
  var framinghamResult = {
    tenYearRisk: result,
    averageTenYearRisk: -1,
  }
  console.log(sumBX)
  console.log(sumBXbar)
  return framinghamResult
}

var lnAgeValue = function lnAgeValue(data) {
  var x = Math.log(data.age)

  var _ref2 = data.isGeneticMale ? regressionData.male : regressionData.female,
    b = _ref2.coefficient.lnAge

  return x * b
}

var lnCholTotalValue = function lnCholTotalValue(data) {
  var x = Math.log(data.cholesterolTotal)

  var _ref3 = data.isGeneticMale ? regressionData.male : regressionData.female,
    b = _ref3.coefficient.lnCholTotal

  return x * b
}

var lnCholHDLValue = function lnCholHDLValue(data) {
  var x = Math.log(data.cholesterolHDL)

  var _ref4 = data.isGeneticMale ? regressionData.male : regressionData.female,
    b = _ref4.coefficient.lnCholHDL

  return x * b
}

var lnSBPValue = function lnSBPValue(data) {
  var x = Math.log(data.systolicBloodPressure)

  var _ref5 = data.isGeneticMale ? regressionData.male : regressionData.female,
    c = _ref5.coefficient

  var b = data.isOnBloodPressureMeds ? c.lnSBPTreated : c.lnSBPUntreated
  return x * b
}

var smokingValue = function smokingValue(data) {
  var x = data.isSmoker ? 1 : 0

  var _ref6 = data.isGeneticMale ? regressionData.male : regressionData.female,
    b = _ref6.coefficient.smoking

  return x * b
}

var diabetesValue = function diabetesValue(data) {
  var x = data.isDiabetic ? 1 : 0

  var _ref7 = data.isGeneticMale ? regressionData.male : regressionData.female,
    b = _ref7.coefficient.diabetes

  return x * b
}

var meanData = {
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
var regressionData = {
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

exports.framingham = framingham
exports.pooledCohort2013 = pooledCohort2013
