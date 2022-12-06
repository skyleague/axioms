import { entriesOf } from '../entries-of'
import { fromEntries } from '../from-entries'

/**
 * Returns the names of the enumerable string properties and methods of an object.
 *
 * ### Example
 * ```ts
 * keysOf([["foo", "bar"]])
 * // => ["foo"]
 *
 * keysOf({})
 * // => []
 * ```
 *
 * ### Alternatives
 * - [Lodash - keys](https://lodash.com/docs/4.17.15#keys)
 *
 * @param obj - The object to get the keys from.
 * @returns The keys as an array.
 *
 * @group Object
 */ export function mapValues<T extends ArrayLike<unknown> | {}, Mapper extends (v: T[keyof T], k: keyof T) => unknown>(
    obj: T,
    mapper: Mapper
): {
    [K in keyof T]: Mapper extends (v: T[K], k: K) => infer O ? O : never
} {
    return fromEntries(entriesOf(obj).map(([k, v]) => [k, mapper(v as T[keyof T], k as keyof T)])) as {
        [K in keyof T]: Mapper extends (v: T[K], k: K) => infer O ? O : never
    }
}
