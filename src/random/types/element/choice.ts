import { mapTree } from '../../../algorithm/tree'
import type { Dependent } from '../../arbitrary/dependent'
import { makeDependent } from '../../arbitrary/dependent'
import { integer } from '../integer'

export function element<T>(elements: T extends string ? string : T[]): Dependent<T extends string ? string : T> {
    const aint = integer({ min: 0, max: elements.length })
    return makeDependent((context) => mapTree(aint.value(context), (n) => elements[n] as T extends string ? string : T))
}
