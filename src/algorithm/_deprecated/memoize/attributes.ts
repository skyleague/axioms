import { mapValues } from '../../../object/map-values/map-values.js'
import type { Memoized } from '../../memoize/memoize.js'
import { memoize } from '../../memoize/memoize.js'

/**
 * @deprecated
 */
export type MemoizeAttributes<T extends Record<PropertyKey, () => unknown>> = { [K in keyof T]: Memoized<T[K]> }
/**
 * @deprecated
 */
export function memoizeAttributes<T extends Record<PropertyKey, () => unknown>>(x: T): MemoizeAttributes<T> {
    return mapValues(x, (v) => memoize(v)) as MemoizeAttributes<T>
}
