import { mapTree } from '../../../algorithm/tree'
import type { Dependent } from '../../arbitrary/dependent'
import { dependentArbitrary } from '../../arbitrary/dependent'
import { integer } from '../integer'

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
    elements: T extends string ? string : T
): Dependent<T extends string ? string : T[number]> {
    const aint = integer({ min: 0, max: elements.length })
    return dependentArbitrary((context) => mapTree(aint.value(context), (n) => elements[n] as T extends string ? string : T))
}
