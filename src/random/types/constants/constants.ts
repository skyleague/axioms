import type { Dependent } from '../../arbitrary/dependent/index.js'
import { constant } from '../helper/index.js'
import { oneOf } from '../one-of/one-of.js'

/**
 * A function that generates a dependent type for a given set of enumerated values.
 *
 * ### Example
 * ```ts
 * random(constants("foo", "bar"))
 * // => "foo"
 * ```
 *
 * @param consts - The set of enumerated values to use.
 * @returns A dependent type that generates values from the provided set of enumerated values.
 *
 * @group Arbitrary
 */
export function constants<const T extends unknown[]>(...consts: [...T]): Dependent<T[number]> {
    return oneOf(...consts.map((a) => constant(a)))
}
