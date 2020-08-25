// @flow
import type { ASCVDData, PooledCohort2013Result } from '../types/ASCVDData'

//https://www.onlinejacc.org/content/63/25_Part_B/2935/T6
const pooledCohort2013 = (data: ASCVDData): PooledCohort2013Result => {
  const badResult: PooledCohort2013Result = {
    tenYearRisk: -1,
    lifetimeRisk: -1,
  }
  return badResult
}

export { pooledCohort2013 }
