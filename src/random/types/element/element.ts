import type { Dependent } from '../../arbitrary/dependent/index.js'
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
    return integer({ min: 0, max: elements.length - 1 }).map((n) => elements[n] as T extends string ? string : T)
}
