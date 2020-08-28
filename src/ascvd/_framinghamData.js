// @flow

const averageRisk = {
  female: 26.1931,
  male: 23.9802,
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
    BPTreatedPercent: 10.13,
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

export { meanData, regressionData, averageRisk }
