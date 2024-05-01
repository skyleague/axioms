import type { Except, Simplify } from '../../types.js'
import { pickBy } from '../pick/index.js'

export type OmitUndefined<T> = Simplify<
    {
        [k in {
            [l in keyof T]: undefined extends T[l] ? l : never
        }[keyof T]]?: Exclude<T[k], undefined>
    } & {
        [k in {
            [l in keyof T]: undefined extends T[l] ? never : l
        }[keyof T]]: Exclude<T[k], undefined>
    }
>

export function omitUndefined<const T extends ArrayLike<unknown> | object>(obj: T): OmitUndefined<T> {
    return pickBy(obj, ([, v]) => v !== undefined) as unknown as OmitUndefined<T>
}

/**
 * Create a new object with all the properties excluded for which the predicate hold true.
 *
 * ### Example
 * ```ts
 * omitBy({foo: 1, bar: "foo"}, ([, v]) => isNumber(v))
 * // => {bar: "foo"}
 * ```
 *
 * ### Alternatives
 * - [Lodash - omitBy](https://lodash.com/docs/4.17.15#omitBy)
 *
 * @param obj - The object to take the properties from.
 * @param predicate - The function that must hold true for the property to be excluded.
 * @returns The constructed object.
 *
 * @group Object
 */
export function omitBy<
    const T extends ArrayLike<unknown> | object,
    Predicate extends ([key, value]: [key: keyof T, value: T[keyof T]]) => boolean,
>(obj: T, predicate: Predicate): Partial<T> {
    return Object.fromEntries(
        Object.entries(obj).filter(([k, v]) => !predicate([k as keyof T, v as T[keyof T]])),
    ) as unknown as Partial<T>
}

/**
 * It takes an object and an array of keys, and returns a new object with those keys excluded.
 *
 * ### Example
 * ```ts
 * omit({foo: "bar", bar: "foo"}, ["foo"])
 * // => {bar: "foo"}
 *
 * omit({foo: "bar", bar: "foo"}, [])
 * // => {foo: "bar", bar: "foo"}
 * ```
 *
 * ### Alternatives
 * - [Lodash - omit](https://lodash.com/docs/4.17.15#omit)
 *
 * @param obj - The object to take the properties from.
 * @param keys - The keys to omit on the object.
 * @returns The constructed object.
 *
 * @group Object
 */
export function omit<const T extends ArrayLike<unknown> | object, K extends keyof T>(
    obj: T,
    keys: readonly K[],
): Simplify<Except<T, K, { requireExactProps: true }>> {
    return Object.fromEntries(Object.entries(obj).filter(([k]) => !keys.includes(k as K))) as Simplify<
        Except<T, K, { requireExactProps: true }>
    >
}
