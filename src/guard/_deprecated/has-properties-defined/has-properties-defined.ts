import { all } from '../../../iterator/all/index.js'
import type { RequireKeys } from '../../../type/_deprecated/keys/index.js'
import type { KeysOfUnion } from '../../../types.js'
import { asArray } from '../../as-array/index.js'

/**
 * Creates a function that acts as a typeguard that makes all given properties required, by checking if all values
 * on the given property are not equal to `undefined`.
 *
 * ### Example
 * ```ts
 * const original = [{ foo: 'bar' }, { foo: undefined }]
 * original.filter(hasPropertiesDefined('foo'))
 * // => [{ foo: 'bar' }]: { foo: string }[]
 *
 * const multiple = [{ foo: 'bar', bar: 'fooz' }, { foo: undefined }]
 * original.filter(hasPropertiesDefined('foo'))
 * // => [{ foo: 'bar', bar: 'fooz' }]: { foo: string, bar: string }[]
 * ```
 *
 * @param keys - The keys to make required in this filter.
 *
 * @returns The typeguard function.
 *
 * @typeParam T - The filter value input type.
 * @typeParam K - The keys on `T` to make required.
 *
 * @group Guards
 * @deprecated will be mostly unneeded in typescript 5.5 https://github.com/microsoft/TypeScript/pull/57465
 */
export function hasPropertiesDefined<T, K extends KeysOfUnion<T> | string>(keys: K | K[]) {
    return (obj: RequireKeys<T, K> | T): obj is RequireKeys<T, K> => {
        return all(asArray(keys), (key) => (obj as Record<K, unknown>)[key] !== undefined)
    }
}
