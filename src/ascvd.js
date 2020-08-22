// @flow

import { ascvdFramingham } from './_ascvd_framingham'
import { ascvdPooled } from './_ascvd_pooled'
import type { ASCVDData } from './types/ASCVDData'

const ascvd = (data: ASCVDData): number => {
  
  switch (data.type.toLowerCase()) {
    case 'framingham':
      return ascvdFramingham(data)
    case 'pooled13':
      return ascvdPooled(data)
    default:
      throw new Error('ascvd has not been implemented.')
  }
}

export { ascvd }
