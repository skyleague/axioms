/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Cast } from '../../type/cast'
import type { Item } from '../../type/item'
import type { DeepMutable } from '../../type/mutable'

export type FromEntries<T> = T extends [infer Key, any][]
    ? { [K in Cast<Key, string>]: Extract<Item<T>, [K, any]>[1] }
    : { [key in string]: any }

export type FromEntriesWithReadOnly<T> = FromEntries<DeepMutable<T>>

/**
 * Returns an object created by key-value entries for properties and methods.
 *
 * ### Example
 * ```ts
 * fromEntries([["foo", "bar"]])
 * // => {foo: "bar"}
 *
 * fromEntries([])
 * // => {}
 * ```
 *
 * ### Alternatives
 * - [ECMAScript Object.fromEntries](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries)
 * - [Lodash - fromPairs](https://lodash.com/docs/4.17.15#fromPairs)
 *
 * @param obj - The entries to construct the object from.
 * @returns The constructed object.
 *
 * @group Object
 */
export function fromEntries<T extends any[]>(obj: T): FromEntriesWithReadOnly<T> {
    return Object.fromEntries(obj) as FromEntriesWithReadOnly<T>
}
