import type { Traversable } from '../../type'
import { toTraverser } from '../../type'

import deepEqual from 'fast-deep-equal/es6'

export function allEqual<
    Xs extends Traversable<unknown>,
    As extends Xs extends Traversable<infer S> ? Traversable<S> : never,
    T = Xs extends Traversable<infer S> ? S : never
>(xs: Xs, as: As, eq: (a: T, b: T) => boolean = equal): boolean {
    const ixs = toTraverser(xs)
    const ias = toTraverser(as)

    let xv = ixs.next()
    let av = ias.next()
    for (; xv.done !== true && av.done !== true; xv = ixs.next(), av = ias.next()) {
        if (!eq(xv.value as T, av.value as T)) {
            return false
        }
    }
    return xv.done === true && av.done === true
}

export function equal(a: unknown, b: unknown): boolean {
    return deepEqual(a, b)
}
