import { all } from '../../iterator/all'
import type { Traversable } from '../../type'

export function isSuperset<T>(superset: Traversable<T>, sub: Traversable<T>) {
    const sxs = new Set(superset)
    const sys = new Set(sub)
    return all(sys, (x) => sxs.has(x))
}
