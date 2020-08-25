// @flow

// https://www.mdcalc.com/homa-ir-homeostatic-model-assessment-insulin-resistance#evidence
const homaIR = (fastingInsulin: number, fastingGlucose: number): number => {
  return (fastingInsulin * fastingGlucose) / 405
}

export { homaIR }
