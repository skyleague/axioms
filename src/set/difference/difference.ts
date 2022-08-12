import type { Traversable } from '../../type/traversable'

export function difference<T>(xs: Traversable<T>, ys: Traversable<T>): Set<T> {
    const setA = new Set(xs)
    const setB = new Set(ys)
    return new Set([...setA].filter((x) => !setB.has(x)))
}

export function symmetricDifference<T>(xs: T[], ys: T[]): Set<T> {
    return new Set([...difference(xs, ys), ...difference(ys, xs)])
}
