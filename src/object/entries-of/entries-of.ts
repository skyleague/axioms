import type { ArrayValues, UnknownArray } from '../../types.js'

/**
 * Returns an array of key/values of the enumerable properties of an object.
 *
 * ### Example
 * ```ts
 * entriesOf({foo: "bar"})
 * // => [["foo", "bar"]]
 *
 * entriesOf({})
 * // => []
 * ```
 *
 * ### Alternatives
 * - [ECMAScript Object.entries](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries)
 * - [Lodash - toPairs](https://lodash.com/docs/4.17.15#toPairs)
 *
 * @param obj - The object to get the entries from.
 * @returns The array with key/values.
 *
 * @group Object
 */
export function entriesOf<const T extends ArrayLike<unknown> | object>(
    obj: T,
): T extends UnknownArray ? [string, ArrayValues<T>][] : { [K in keyof T]: [K, T[K]] }[keyof T][] {
    return Object.entries(obj) as T extends UnknownArray ? [string, ArrayValues<T>][] : { [K in keyof T]: [K, T[K]] }[keyof T][]
}
