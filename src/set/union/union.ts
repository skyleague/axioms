import type { Traversable } from '../../type/traversable'

export function union<T>(xs: Traversable<T>, ys: Traversable<T>): Set<T> {
    const sxs = new Set(xs)
    const sys = new Set(ys)
    return new Set([...sxs, ...sys])
}
