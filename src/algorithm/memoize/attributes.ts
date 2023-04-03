import type { Memoized } from './memoize.js'
import { memoize } from './memoize.js'

import { mapValues } from '../../object/map-values/index.js'
import type { Dict } from '../../type/dict/index.js'

export type MemoizeAttributes<T extends Dict<() => unknown>> = { [K in keyof T]: Memoized<T[K]> }
/**
 * @experimental
 */
export function memoizeAttributes<T extends Dict<() => unknown>>(x: T): MemoizeAttributes<T> {
    return mapValues(x, (v) => memoize(v)) as MemoizeAttributes<T>
}
