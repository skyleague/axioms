import type { RelaxedPartial } from '../../../type/partial'
import type { Integrated } from '../../arbitrary/integrated'
import { integer } from '../integer'

export interface NaturalConstraints {
    min: number
    max: number
}

export function natural(constraints: RelaxedPartial<NaturalConstraints> = {}): Integrated<NaturalConstraints, number> {
    return integer({ min: 0, ...constraints })
}
