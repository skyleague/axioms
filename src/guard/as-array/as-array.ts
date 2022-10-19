import { isArray } from '../is-array'

/**
 * Returns `x` as array if it is not an array type.
 *
 * ### Example
 * ```ts
 * asArray(1)
 * // => [1]
 *
 * asArray([2, 3, 4])
 * // => [2, 3, 4]
 * ```
 *
 * ### Alternatives
 * - [Lodash - castArray](https://lodash.com/docs/#castArray)
 *
 * @param x - The value to cast.
 * @returns `x` interpreted as array.
 *
 * @typeParam T - The value type.
 *
 * @group Guards
 */
export function asArray<T>(x: T | T[]): T[] {
    return isArray(x) ? x : [x]
}
