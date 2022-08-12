import type { Traversable } from '../../type'

export function intersection<T>(xs: Traversable<T>, ys: Traversable<T>): Set<T> {
    const sxs = new Set(xs)
    const sys = new Set(ys)
    return new Set([...sxs].filter((x) => sys.has(x)))
}
