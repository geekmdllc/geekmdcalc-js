// @flow

export type ASCVDData = {
  age: number,
  isDiabetic: boolean,
  isGeneticMale: boolean,
  isBlack: boolean,
  isOnBloodPressureMeds: boolean,
  isSmoker: boolean,
  cholesterolTotal: number,
  cholesterolHDL: number,
  systolicBloodPressure: number,
}

export type PooledCohort2013Result = {
  tenYearRisk: number,
  lifetimeRisk: number,
}

export type FraminghamResult = {
  tenYearRisk: number,
  averageTenYearRisk: number,
}
