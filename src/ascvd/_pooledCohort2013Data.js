// @flow

const pooledCohort2013MeanData = {
  female: {
    white: -29.18,
    black: 86.61,
  },
  male: {
    white: 61.18,
    black: 19.54,
  },
}

const pooledCohort2013Coefficients = {
  survival: {
    female: {
      white: 0.9665,
      black: 0.9533,
    },
    male: {
      white: 0.9144,
      black: 0.8954,
    },
  },
  regression: {
    female: {
      white: {
        lnAge: -29.799,
        lnAgeSquared: 4.884,
        lnTotalChol: 13.54,
        lnAgeXlnTotalChol: -3.114,
        lnHDLC: -13.578,
        lnAgeXlnHDLC: 3.149,
        lnTreatedSystolicBP: 2.019,
        lnAgeXlnTreatedSystolicBP: null,
        lnUntreatedSystolicBP: 1.957,
        lnAgeXlnUntreatedSystolicBP: null,
        currentSmoker: 7.574,
        lnAgeXcurrentSmoker: -1.665,
        diabetes: 0.661,
      },
      black: {
        lnAge: 17.114,
        lnAgeSquared: null,
        lnTotalChol: 0.94,
        lnAgeXlnTotalChol: null,
        lnHDLC: -18.92,
        lnAgeXlnHDLC: 4.475,
        lnTreatedSystolicBP: 29.291,
        lnAgeXlnTreatedSystolicBP: -6.432,
        lnUntreatedSystolicBP: 27.82,
        lnAgeXlnUntreatedSystolicBP: -6.087,
        currentSmoker: 0.691,
        lnAgeXcurrentSmoker: null,
        diabetes: 0.874,
      },
    },
    male: {
      white: {
        lnAge: 12.344,
        lnTotalChol: 11.853,
        lnAgeXlnTotalChol: -2.664,
        lnHDLC: -7.99,
        lnAgeXlnHDLC: 1.769,
        lnTreatedSystolicBP: 1.797,
        lnUntreatedSystolicBP: 1.764,
        currentSmoker: 7.837,
        lnAgeXcurrentSmoker: -1.795,
        diabetes: 0.658,
      },
      black: {
        lnAge: 2.469,
        lnTotalChol: 0.302,
        lnAgeXlnTotalChol: null,
        lnHDLC: -0.307,
        lnAgeXlnHDLC: null,
        lnTreatedSystolicBP: 1.916,
        lnUntreatedSystolicBP: 1.809,
        currentSmoker: 0.549,
        lnAgeXcurrentSmoker: null,
        diabetes: 0.645,
      },
    },
  },
}

export { pooledCohort2013MeanData, pooledCohort2013Coefficients }
