import type { UnknownArray } from 'type-fest'

export type ValuesOf<T extends ArrayLike<unknown> | object> = T extends UnknownArray ? T[number][] : T[keyof T][]

/**
 * Returns an array of values of the enumerable properties of an object.
 *
 * ### Example
 * ```ts
 * valuesOf({foo: "bar"})
 * // => ["bar"]
 *
 * valuesOf({})
 * // => []
 * ```
 *
 * ### Alternatives
 * - [ECMAScript Object.values](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/values)
 * - [Lodash - values](https://lodash.com/docs/4.17.15#values)
 *
 * @param obj - The object to get the values from.
 * @returns The values as an array.
 *
 * @group Object
 */
export function valuesOf<const T extends ArrayLike<unknown> | object>(obj: T): ValuesOf<T> {
    return Object.values(obj) as ValuesOf<T>
}
