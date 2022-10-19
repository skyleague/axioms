import type { Memoized } from './memoize'
import { memoize } from './memoize'

import { mapValues } from '../../object/map-values'
import type { Dict } from '../../type/dict'

export type MemoizeAttributes<T extends Dict<() => unknown>> = { [K in keyof T]: Memoized<T[K]> }
/**
 * @experimental
 */
export function memoizeAttributes<T extends Dict<() => unknown>>(x: T): MemoizeAttributes<T> {
    return mapValues(x, (v) => memoize(v)) as MemoizeAttributes<T>
}
