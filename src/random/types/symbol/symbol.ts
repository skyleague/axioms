import { mapTree } from '../../../algorithm/tree'
import type { Dependent } from '../../arbitrary/dependent'
import { dependentArbitrary } from '../../arbitrary/dependent'
import { alphaNumericString } from '../string'

export function symbol(): Dependent<symbol> {
    const symbolStr = alphaNumericString()
    return dependentArbitrary((context) => mapTree(symbolStr.value(context), (s) => Symbol.for(s)))
}
