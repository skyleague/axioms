import { mapTree } from '../../../algorithm/tree/index.js'
import type { Dependent } from '../../arbitrary/dependent/index.js'
import { dependentArbitrary } from '../../arbitrary/dependent/index.js'
import { integer } from '../integer/index.js'

/**
 * It returns an arbitrary that takes a random element from the array.
 *
 * ### Example
 * ```ts
 * random(element("abc"))
 * // => "b"
 *
 * random(element("abc"))
 * // => "c"
 *
 * random(element([1, 2, 3]))
 * // => 3
 * ```
 *
 * @returns An arbitrary.
 *
 * @group Arbitrary
 */
export function element<T extends unknown[] | string>(
    elements: T extends string ? string : T,
): Dependent<T extends string ? string : T[number]> {
    const aint = integer({ min: 0, max: elements.length - 1 })
    return dependentArbitrary((context) => mapTree(aint.value(context), (n) => elements[n] as T extends string ? string : T))
}
