# geekmdcalc-js

Travis Nesbit, MD (geekmdtravis) | GeekMD, LLC

## Build Status

| Main                                                                                                                              | Development                                                                                                                            |Coverage|
| --------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |--------|
| [![Build Status](https://travis-ci.org/geekmdllc/geekmdcalc-js.svg?branch=master)](https://travis-ci.org/geekmdllc/geekmdcalc-js) | [![Build Status](https://travis-ci.org/geekmdllc/geekmdcalc-js.svg?branch=development)](https://travis-ci.org/geekmdllc/geekmdcalc-js) |[![Coverage Status](https://coveralls.io/repos/github/geekmdllc/geekmdcalc-js/badge.svg?branch=main)](https://coveralls.io/github/geekmdllc/geekmdcalc-js?branch=main)|

## Introduction

Decision support is an important part of modern medical practice. Central to this decision support are various evidence-based calculations and algorithms. There are several tools on the internet that allow people to manually enter data to calculate values that aid clinicians as decision support, however to date a comprehensive API is not available in the open source space. `geekmdcalc-js` is a JavaScript library that addresses this knowledge-vaccum in the open-source community.

## Why JavaScript?

There are two major reasons.

1. This is an open-source project. JavaScript is ubiquitous, and developers are plentiful.
2. JavaScript can easily be integrated into front-end and back-end applications.

## Usage

This package can be downloaded and built, and eventually will be published to `npm`.

### Atherosclerotic Cardiovascular Disease (ASCVD) Equations

#### [Framingham (2008)](https://www.ahajournals.org/doi/10.1161/circulationaha.107.699579#FD1)

This is a significant cardiovascular disease risk equation in clinical medicine. It's been used extensively to risk-stratify patients, and widely adopted and modified. Please see the attached study for information on the version implemented here.

Method signature

```js
const framingham = (data, options)
```

`data`

```js
type ASCVDData = {
  age: number,
  isDiabetic: boolean,
  isGeneticMale: boolean,
  isBlack: boolean,
  isOnBloodPressureMeds: boolean,
  isSmoker: boolean,
  cholesterolTotal: number, // mg/dL
  cholesterolHDL: number, // mg/dL
  systolicBloodPressure: number, // mmHg
}
```

\* **NOTE**: While the function `framingham` shares the `type` of `ASCVDData` with `pooledCohort2013`, race is not considered in this equation so the `isBlack` boolean parameter will have no effect on the output.

`options`

```js
type ASCVDOptions = {
  calculationMethod: string,
  avgRiskMethod: string,
}
```

- `calculationMethod`: points | regression\*
- `avgRiskMethod`: constant | calculated\*

\* **CAUTION**: `calculationMethod` regression and `avgRiskMethod` calculated are experimental. They have not yet been tested extensively.

`return`

```js
type FraminghamResult = {
  tenYearRisk: number,
  averageTenYearRisk: number,
  heartAge: number,
}
```

#### Pooled Cohort Equation (2013)

NOT IMPLEMENTED

### Download and Build

Ensure you have `git` and `npm` or `yarn` installed.

1. Clone the repo using the GitHub&reg; link above.
2. Run `yarn build` or `npm run build` to have the ES6 content transpiled to CommomJS in the `build` folder.

### Download from NPM&reg;

NOTE: This packages is not yet depoyed to NPM

## How Can I Contribute?

This part is easy. Everyone is invited to contribute!

1. If you see an issue that you feel you can address, feel free to fork and get to work.
2. If you have a feature request, bug fix, or other issue, feel free to add it to the issues board. And, you can also takle the problem yourself.

### Documentation

- Self-documenting code is best. If your code is clean, people should be able to figure it out by the file names and methods.
- If you feel a particular piece of code is complex, then feel free to add additional commentary.

### Coding Conventions

- Use standard JavaScript file, function, variable, etc. naming conventions.
- Where appropriate, use `flow` for type-checking. The `flow-bin` library is listed as a development dependency.
- Test! While we make no guarantees with this open source product and while everybody should test it themselves before they put it into product as they assume responsibilty for the product, your logic for medical calculations should be evidence-based and have an adequate number of test cases to ensure you've covered every reasonable case.

### Naming branches

Branches should follow the following naming convention:

1. Bug Fixes: `bugfix-[issue#]<-[optional description]>`.
   - Example: A bug fix for calculating an age wrong.
   - `bugfix-23-display-age`
2. Feature Request: `feature-[issue#]<-[optional description]>`.
   - Example: Add FIB-4 calculation.
   - `feature-12-fib4`
3. Other Issues: `issue-[issue#]<-[optional desription]>`.
   - Example: Improve documentation.
   - `issue-89-improve-docs`

### Commit Messages

General template: "`<[skip ci]> [#issue] - Message content goes here`" where content inside of `<` and `>` is optional.

Example: `[skip ci] #103 - Updated 'How can I help?' section of the README.md`

- Commit's the `master` and `development` will be tested with [Travis CI](https://travis-ci.org) continuous integration system. If you feel that the commit does not need to be tested, then prepend `[skip ci]` to the commit message.
- All Commit messages should include `#issue` in the message so that the issue and project boards can track properly.
- Message content should be descriptive, but brief.

### Pull Requests

Always make pull requests for `development` and NOT `master`.
