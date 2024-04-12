import type { Simplify } from '../../types.js'

/**
 * Create a new object with all the properties for which the predicate hold true.
 *
 * ### Example
 * ```ts
 * pickBy({foo: 1, bar: "foo"}, ([, v]) => isNumber(v))
 * // => {foo: 1}
 * ```
 *
 * ### Alternatives
 * - [Lodash - pickBy](https://lodash.com/docs/4.17.15#pickBy)
 *
 * @param obj - The object to take the properties from.
 * @param predicate - The function that must hold true for the property to be included.
 * @returns The constructed object.
 *
 * @group Object
 */
export function pickBy<
    T extends ArrayLike<unknown> | object,
    Predicate extends ([key, value]: [key: keyof T, value: T[keyof T]]) => boolean,
>(obj: T, predicate: Predicate): Partial<T> {
    return Object.fromEntries(
        Object.entries(obj).filter(([k, v]) => predicate([k as keyof T, v as T[keyof T]])),
    ) as unknown as Partial<T>
}

/**
 * It takes an object and an array of keys, and returns a new object with only those keys.
 *
 * ### Example
 * ```ts
 * pick({foo: "bar", bar: "foo"}, ["foo"])
 * // => {foo: "bar"}
 *
 * pick({foo: "bar", bar: "foo"}, [])
 * // => {}
 * ```
 *
 * ### Alternatives
 * - [Lodash - pick](https://lodash.com/docs/4.17.15#pick)
 *
 * @param obj - The object to take the properties from.
 * @param keys - The keys to select on the object.
 * @returns The constructed object.
 *
 * @group Object
 */
export function pick<T extends ArrayLike<unknown> | object, K extends keyof T>(obj: T, keys: readonly K[]): Simplify<Pick<T, K>> {
    return Object.fromEntries(Object.entries(obj).filter(([k]) => keys.includes(k as K))) as unknown as Simplify<Pick<T, K>>
}
