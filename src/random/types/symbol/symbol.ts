import { mapTree } from '../../../algorithm/tree'
import type { Dependent } from '../../arbitrary/dependent'
import { dependentArbitrary } from '../../arbitrary/dependent'
import { alphaNumeric } from '../string'

export function symbol(): Dependent<symbol> {
    const symbolStr = alphaNumeric()
    return dependentArbitrary((context) => mapTree(symbolStr.value(context), (s) => Symbol.for(s)))
}
