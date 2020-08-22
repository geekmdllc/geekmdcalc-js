// @flow
import type { ASCVDData, PooledCohort2013Result } from '../types/ASCVDData'

const pooledCohort2013 = (data: ASCVDData): PooledCohort2013Result => {
  const badResult: PooledCohort2013Result = {
    tenYearRisk: -1,
    lifetimeRisk: -1,
  }
  return badResult
}

export { pooledCohort2013 }
