import { all } from '../../iterator/all'
import type { Traversable } from '../../type'

export function isSubset<T>(superset: Traversable<T>, sub: Traversable<T>) {
    const sxs = new Set(superset)
    const sys = new Set(sub)
    return all(sxs, (x) => sys.has(x))
}
