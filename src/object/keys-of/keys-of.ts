import type { KeysOfUnion, UnknownArray } from '../../types.js'

export type KeysOf<T> = T extends UnknownArray ? string[] : KeysOfUnion<T>[]

/**
 * Returns the names of the enumerable string properties and methods of an object.
 *
 * ### Example
 * ```ts
 * keysOf({foo: "bar"})
 * // => ["foo"]
 *
 * keysOf({})
 * // => []
 * ```
 *
 * ### Alternatives
 * - [ECMAScript Object.keys](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys)
 * - [Lodash - keys](https://lodash.com/docs/4.17.15#keys)
 *
 * @param obj - The object to get the keys from.
 * @returns The keys as an array.
 *
 * @group Object
 */
export function keysOf<const T extends ArrayLike<unknown> | object>(obj: T): KeysOf<T> {
    return Object.keys(obj) as KeysOf<T>
}
