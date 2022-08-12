import { all } from '../../iterator/all'
import type { Traversable } from '../../type'

export function isDisjoint<T>(xs: Traversable<T>, ys: Traversable<T>) {
    const sxs = new Set(xs)
    const sys = new Set(ys)
    return all(sxs, (x) => !sys.has(x))
}
