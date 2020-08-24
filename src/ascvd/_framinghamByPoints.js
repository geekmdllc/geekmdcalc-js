// @flow
import type { ASCVDData, FraminghamResult } from '../types/ASCVDData'
import ErrorMessages from '../errorMessages'

const {
  ascvd: {
    framingham: { byPoints: e },
  },
} = ErrorMessages

// https://www.ahajournals.org/doi/10.1161/circulationaha.107.699579

// Points	Age, y	HDL	Total Cholesterol	SBP Not Treated	SBP Treated	Smoker	Diabetic

export const framinghamByPoints = (data: ASCVDData): FraminghamResult => {
  throw new Error('Not implemented.')
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

const bpTreatedPoints = (data: ASCVDData): number => {
  return data.isGeneticMale
    ? bpTreatedPointsMale(data)
    : bpTreatedPointsFemale(data)
}

const bpTreatedPointsFemale = (data: ASCVDData): number => {
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

const bpTreatedPointsMale = (data: ASCVDData): number => {
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
  throw new Error('Not implemented.')
}

const diabeticPoints = (data: ASCVDData): number => {
  throw new Error('Not implemented.')
}

const pointTotal = (data: ASCVDData): number => {
  return (
    agePoints(data) +
    hdlPoints(data) +
    totalCholPoints(data) +
    sbpUntreatedPoints(data) +
    bpTreatedPoints(data) +
    smokerPoints(data) +
    diabeticPoints(data)
  )
}

const getResult = (points: number, data: ASCVDData): FraminghamResult => {
  switch (data.isGeneticMale) {
    case true:
      return getResultMale(points)
    case false:
      return getResultFemale(points)
  }
  throw new Error(ErrorMessages.generic.unexpected)
}

const getResultMale = (points: number): FraminghamResult => {
  throw new Error('Not implemented.')
}

const getResultFemale = (points: number): FraminghamResult => {
  throw new Error('Not implemented.')
}
