import { homaIR } from './../src/homaIR'

const variance = 0.1

describe('homaIR', () => {
  it('calculates the score appropriately within a reasonable variance', () => {
    const fastingInsulin = 12.3
    const fastingGlucose = 104
    const actual = homaIR(fastingInsulin, fastingGlucose)
    const expected = 3.2

    expect(actual).toBeLessThan(expected + variance)
    expect(actual).toBeGreaterThan(expected - variance)
  })
})
