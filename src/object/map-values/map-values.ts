import { entriesOf } from '../entries-of'
import { fromEntries } from '../from-entries'

/**
 * Returns an object with same keys, where the original values are converted using a mapper.
 *
 * ### Example
 * ```ts
 * mapValues({ foo: 0, bar: 2 }, (x) => x + 1)
 * // => { foo: 1, bar: 3 }
 * ```
 *
 * ### Alternatives
 * - [Lodash - mapValues](https://lodash.com/docs/4.17.15#mapValues)
 *
 * @param obj - The object to map the values from.
 * @returns The keys as an array.
 *
 * @group Object
 */
export function mapValues<T extends ArrayLike<unknown> | {}, Mapper extends (v: T[keyof T], k: keyof T) => unknown>(
    obj: T,
    mapper: Mapper
): {
    [K in keyof T]: Mapper extends (v: T[K], k: K) => infer O ? O : never
} {
    return fromEntries(entriesOf(obj).map(([k, v]) => [k, mapper(v as T[keyof T], k as keyof T)])) as {
        [K in keyof T]: Mapper extends (v: T[K], k: K) => infer O ? O : never
    }
}
