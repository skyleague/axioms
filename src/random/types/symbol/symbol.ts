import { mapTree } from '../../../algorithm/tree/index.js'
import type { Dependent } from '../../arbitrary/dependent/index.js'
import { dependentArbitrary } from '../../arbitrary/dependent/index.js'
import { alphaNumeric } from '../string/index.js'

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
