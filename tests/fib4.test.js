import { fib4 } from './../src/fib4'

const variance = 0.01

describe('fib4', () => {
  it('calculates a fib4 score correctly', () => {
    const { age, ast, alt, platelets } = {
      age: 30,
      ast: 100,
      alt: 200,
      platelets: 150,
    }
    const result = fib4(age, ast, alt, platelets)
    const expected = 1.41

    expect(result).toBeLessThan(expected + variance)
    expect(result).toBeGreaterThan(expected - variance)
  })
})
