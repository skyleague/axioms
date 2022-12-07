import { mapTree } from '../../../algorithm/tree'
import type { Dependent } from '../../arbitrary/dependent'
import { dependentArbitrary } from '../../arbitrary/dependent'
import { alphaNumeric } from '../string'

/**
 * It returns an arbitrary that generates a symbol.
 *
 * ### Example
 * ```ts
 * random(symbol())
 * // => Symbol(enMgMCe)
 *
 * random(symbol())
 * // => Symbol(wmDI78Hci)
 * ```
 *
 * @returns A symbol arbitrary.
 *
 * @group Arbitrary
 */
export function symbol(): Dependent<symbol> {
    const symbolStr = alphaNumeric()
    return dependentArbitrary((context) => mapTree(symbolStr.value(context), (s) => Symbol.for(s)))
}
