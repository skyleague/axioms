export type EntriesOf<T> = T extends (infer I)[] ? [string, I][] : { [K in keyof T]: [K, T[K]] }[keyof T][]

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
export function entriesOf<T extends ArrayLike<unknown> | {}>(obj: T): EntriesOf<T> {
    return Object.entries(obj) as EntriesOf<T>
}
