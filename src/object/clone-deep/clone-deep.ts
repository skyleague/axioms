import { isArray, isObject } from '../../guard'
import type { Dict } from '../../type'

/**
 * If the input is an array, map over it and recursively call cloneDeep on each element. If the input
 * is an object, map over its entries and recursively call cloneDeep on each value. Otherwise, return
 * the input.
 *
 * ### Example
 * ```ts
 * cloneDeep([1, 2, 3])
 * // => [1, 2, 3]
 * ```
 *
 * ### Alternatives
 * - [Lodash - cloneDeep](https://lodash.com/docs/4.17.15#cloneDeep)
 *
 * @param x - The object to clone.
 * @returns A new object with the same keys and values as the original object.
 *
 * @group Object
 */
export function cloneDeep<Arr extends unknown[]>(x: Arr): Arr
export function cloneDeep<T extends Dict>(x: T): T
export function cloneDeep<V>(x: V): V
export function cloneDeep(x: unknown): unknown {
    if (isArray(x)) {
        return x.map((v) => cloneDeep(v))
    } else if (isObject(x)) {
        return Object.fromEntries(Object.entries(x).map(([k, v]) => [k, cloneDeep(v)]))
    } else {
        return x
    }
}
