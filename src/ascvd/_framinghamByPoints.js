// @flow
import type { ASCVDData, FraminghamResult } from '../types/ASCVDData'
import ErrorMessages from '../errorMessages'

// https://www.ahajournals.org/doi/10.1161/circulationaha.107.699579

// Points	Age, y	HDL	Total Cholesterol	SBP Not Treated	SBP Treated	Smoker	Diabetic

export const framinghamByPoints = (data: ASCVDData): FraminghamResult => {
  throw new Error('Not implemented.')
}

const agePoints = (data: ASCVDData): number => {
  throw new Error('Not implemented.')
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
