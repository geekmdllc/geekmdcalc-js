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
  switch (data.isGeneticMale) {
    case true:
      return agePointsMale(data)
    case false:
      return agePointsFemale(data)
    default:
      throw new Error(ErrorMessages.generic.unexpected)
  }
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
  throw new Error('Not implemented.')
}

const totalCholPoints = (data: ASCVDData): number => {
  throw new Error('Not implemented.')
}

const sbpPoints = (data: ASCVDData): number => {
  throw new Error('Not implemented.')
}

const bpTreatedPoints = (data: ASCVDData): number => {
  throw new Error('Not implemented.')
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
    sbpPoints(data) +
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
