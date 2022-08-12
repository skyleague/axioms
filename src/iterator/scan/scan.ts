import { drop } from '../../iterator/drop'
import type { Traversable } from '../../type/traversable'

export function* scanl<T, R>(xs: Traversable<T>, reducer: (acc: R, val: T) => R, init: R) {
    let acc = init
    yield acc
    for (const x of xs) {
        acc = reducer(acc, x)
        yield acc
    }
    return acc
}

export function* scanl1<T>(xs: Traversable<T>, reducer: (acc: T, val: T) => T) {
    yield* scanl(drop(xs, 1), reducer, xs[Symbol.iterator]().next().value as T)
}
