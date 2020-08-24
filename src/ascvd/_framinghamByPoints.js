// @flow
import type { ASCVDData, FraminghamResult } from '../types/ASCVDData'
import { meanData } from './_framinghamData'
import ErrorMessages from '../errorMessages'

const {
  ascvd: {
    framingham: { byPoints: e },
  },
} = ErrorMessages

// https://www.ahajournals.org/doi/10.1161/circulationaha.107.699579

export const framinghamByPoints = (data: ASCVDData): FraminghamResult => {
  return getResult(data)
}

const agePoints = (data: ASCVDData): number => {
  return data.isGeneticMale ? agePointsMale(data) : agePointsFemale(data)
}

const agePointsFemale = (data: ASCVDData): number => {
  const { age: a } = data
  if (a < 30) {
    throw new RangeError(e.ageLessThan30)
  } else if (a < 35) {
    return 0
  } else if (a < 40) {
    return 2
  } else if (a < 45) {
    return 4
  } else if (a < 50) {
    return 5
  } else if (a < 55) {
    return 7
  } else if (a < 60) {
    return 8
  } else if (a < 65) {
    return 9
  } else if (a < 70) {
    return 10
  } else if (a < 75) {
    return 11
  } else {
    return 12
  }
}

const agePointsMale = (data: ASCVDData): number => {
  const { age: a } = data
  if (a < 30) {
    throw new RangeError(e.ageLessThan30)
  } else if (a < 35) {
    return 0
  } else if (a < 40) {
    return 2
  } else if (a < 45) {
    return 5
  } else if (a < 50) {
    return 6
  } else if (a < 55) {
    return 8
  } else if (a < 60) {
    return 10
  } else if (a < 65) {
    return 11
  } else if (a < 70) {
    return 12
  } else if (a < 75) {
    return 14
  } else {
    return 15
  }
}

const hdlPoints = (data: ASCVDData): number => {
  return data.isGeneticMale ? hdlPointsMale(data) : hdlPointsFemale(data)
}

const hdlPointsFemale = (data: ASCVDData): number => {
  const { cholesterolHDL: hdl } = data

  if (hdl < 35) {
    return 2
  } else if (hdl < 45) {
    return 1
  } else if (hdl < 50) {
    return 0
  } else if (hdl < 60) {
    return -1
  } else {
    return -2
  }
}

const hdlPointsMale = (data: ASCVDData): number => {
  return hdlPointsFemale(data)
}

const totalCholPoints = (data: ASCVDData): number => {
  return data.isGeneticMale
    ? totalCholesterolPointsMale(data)
    : totalCholesterolPointsFemale(data)
}

const totalCholesterolPointsFemale = (data: ASCVDData): number => {
  const { cholesterolTotal: tc } = data

  if (tc < 160) {
    return 0
  } else if (tc < 200) {
    return 1
  } else if (tc < 240) {
    return 3
  } else if (tc < 280) {
    return 4
  } else {
    return 5
  }
}

const totalCholesterolPointsMale = (data: ASCVDData): number => {
  const { cholesterolTotal: tc } = data

  if (tc < 160) {
    return 0
  } else if (tc < 200) {
    return 1
  } else if (tc < 240) {
    return 2
  } else if (tc < 280) {
    return 3
  } else {
    return 4
  }
}

const sbpUntreatedPoints = (data: ASCVDData): number => {
  return data.isGeneticMale
    ? sbpUntreatedPointsMale(data)
    : sbpUntreatedPointsFemale(data)
}

const sbpUntreatedPointsFemale = (data: ASCVDData): number => {
  const { systolicBloodPressure: sbp } = data

  if (sbp < 120) {
    return -3
  } else if (sbp < 130) {
    return 0
  } else if (sbp < 140) {
    return 1
  } else if (sbp < 150) {
    return 2
  } else if (sbp < 160) {
    return 4
  } else {
    return 5
  }
}

const sbpUntreatedPointsMale = (data: ASCVDData): number => {
  const { systolicBloodPressure: sbp } = data

  if (sbp < 120) {
    return -2
  } else if (sbp < 130) {
    return 0
  } else if (sbp < 140) {
    return 1
  } else if (sbp < 160) {
    return 2
  } else {
    return 3
  }
}

const sbpTreatedPoints = (data: ASCVDData): number => {
  return data.isGeneticMale
    ? sbpTreatedPointsMale(data)
    : sbpTreatedPointsFemale(data)
}

const sbpTreatedPointsFemale = (data: ASCVDData): number => {
  const { systolicBloodPressure: sbp } = data

  if (sbp < 120) {
    return -1
  } else if (sbp < 130) {
    return 2
  } else if (sbp < 140) {
    return 3
  } else if (sbp < 150) {
    return 5
  } else if (sbp < 160) {
    return 6
  } else {
    return 7
  }
}

const sbpTreatedPointsMale = (data: ASCVDData): number => {
  const { systolicBloodPressure: sbp } = data

  if (sbp < 120) {
    return 0
  } else if (sbp < 130) {
    return 2
  } else if (sbp < 140) {
    return 3
  } else if (sbp < 160) {
    return 4
  } else {
    return 5
  }
}

const smokerPoints = (data: ASCVDData): number => {
  return data.isGeneticMale ? smokerPointsMale(data) : smokerPointsFemale(data)
}
const smokerPointsFemale = (data: ASCVDData): number => {
  return data.isSmoker ? 3 : 0
}

const smokerPointsMale = (data: ASCVDData): number => {
  return data.isSmoker ? 4 : 0
}

const diabeticPoints = (data: ASCVDData): number => {
  return data.isGeneticMale
    ? diabeticPointsMale(data)
    : diabeticPointsFemale(data)
}

const diabeticPointsFemale = (data: ASCVDData): number => {
  return data.isDiabetic ? 4 : 0
}

const diabeticPointsMale = (data: ASCVDData): number => {
  return data.isDiabetic ? 3 : 0
}

const pointTotal = (data: ASCVDData): number => {
  return (
    agePoints(data) +
    hdlPoints(data) +
    totalCholPoints(data) +
    (data.isOnBloodPressureMeds
      ? sbpTreatedPoints(data)
      : sbpUntreatedPoints(data)) +
    smokerPoints(data) +
    diabeticPoints(data)
  )
}

const percentRiskFemale = (points: number): number => {
  debugger
  const pts = points
  if (pts <= -2) {
    return 0.9 // This is a placeholder for the '<1%' result.
  } else if (pts <= -1) {
    return 1.0
  } else if (pts <= 0) {
    return 1.2
  } else if (pts <= 1) {
    return 1.5
  } else if (pts <= 2) {
    return 1.7
  } else if (pts <= 3) {
    return 2.0
  } else if (pts <= 4) {
    return 2.4
  } else if (pts <= 5) {
    return 2.8
  } else if (pts <= 6) {
    return 3.3
  } else if (pts <= 7) {
    return 3.9
  } else if (pts <= 8) {
    return 4.5
  } else if (pts <= 9) {
    return 5.3
  } else if (pts <= 10) {
    return 6.3
  } else if (pts <= 11) {
    return 7.3
  } else if (pts <= 12) {
    return 8.6
  } else if (pts <= 13) {
    return 10.0
  } else if (pts <= 14) {
    return 11.7
  } else if (pts <= 15) {
    return 13.7
  } else if (pts <= 16) {
    return 15.9
  } else if (pts <= 17) {
    return 18.5
  } else if (pts <= 18) {
    return 21.5
  } else if (pts <= 19) {
    return 24.8
  } else if (pts <= 20) {
    return 28.5
  } else {
    return 30 // This is a placeholder for > 30%
  }
}
const percentRiskMale = (points: number): number => {
  const pts = points
  if (pts <= -3) {
    return 0.9 // This is a placeholder for the '<1%' result.
  } else if (pts <= -2) {
    return 1.1
  } else if (pts <= -1) {
    return 1.4
  } else if (pts <= 0) {
    return 1.6
  } else if (pts <= 1) {
    return 1.9
  } else if (pts <= 2) {
    return 2.3
  } else if (pts <= 3) {
    return 2.8
  } else if (pts <= 4) {
    return 3.3
  } else if (pts <= 5) {
    return 3.9
  } else if (pts <= 6) {
    return 4.7
  } else if (pts <= 7) {
    return 5.6
  } else if (pts <= 8) {
    return 6.7
  } else if (pts <= 9) {
    return 7.9
  } else if (pts <= 10) {
    return 9.4
  } else if (pts <= 11) {
    return 11.2
  } else if (pts <= 12) {
    return 13.2
  } else if (pts <= 13) {
    return 15.6
  } else if (pts <= 14) {
    return 18.4
  } else if (pts <= 15) {
    return 21.6
  } else if (pts <= 16) {
    return 25.3
  } else if (pts <= 17) {
    return 29.4
  } else {
    return 30 // This is a placeholder for > 30%
  }
}

const avgPercentRiskFemale = (points: number): number => {
  throw new Error('Not implemented')
}
const avgPercentRiskMale = (points: number): number => {
  throw new Error('Not implemented')
}

const getResult = (data: ASCVDData): FraminghamResult => {
  const pts = pointTotal(data)
  return data.isGeneticMale ? getResultMale(pts) : getResultFemale(pts)
}

const getResultFemale = (points: number): FraminghamResult => {
  const result: FraminghamResult = {
    tenYearRisk: percentRiskFemale(points),
    averageTenYearRisk: -1, //avgPercentRiskFemale(points),
  }

  return result
}

const getResultMale = (points: number): FraminghamResult => {
  const result: FraminghamResult = {
    tenYearRisk: percentRiskMale(points),
    averageTenYearRisk: -1, // avgPercentRiskMale(points),
  }

  return result
}
