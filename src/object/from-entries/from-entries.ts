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
export function fromEntries<const T extends ReadonlyArray<readonly [PropertyKey, unknown]>>(
    entries: T,
): { [K in T[number] as K[0]]: K[1] } {
    return Object.fromEntries(entries) as { [K in T[number] as K[0]]: K[1] }
}
