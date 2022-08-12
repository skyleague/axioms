import type { Traversable } from '../../type/traversable'
import { foldl } from '../fold'

export function groupBy<T, K extends PropertyKey>(xs: Traversable<T>, group: (val: T) => K): Record<K, T[]> {
    return foldl(
        xs,
        (r, v) => {
            const k = group(v)
            r[k] ??= []
            r[k].push(v)
            return r
        },
        {} as Record<K, T[]>
    )
}
