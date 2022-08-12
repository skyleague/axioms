import { isJust } from '../../guard/is-just'
import type { Maybe } from '../../type/maybe'
import { Nothing } from '../../type/maybe'
import { toTraversable } from '../../type/traversable'
import type { Traversable } from '../../type/traversable'
import { uncons } from '../uncons'

export function foldl<T, R = T>(xs: Traversable<T>, reducer: (acc: R, val: T) => R, init: R): R {
    let acc = init
    for (const x of xs) {
        acc = reducer(acc, x)
    }
    return acc
}

export function foldl1<T>(xs: Traversable<T>, reducer: (acc: T, val: T) => T): Maybe<T> {
    const [head, rest] = uncons(xs)
    // if first is undefined due to the length of the Iterable
    // the result will be an empty array
    if (isJust(head)) {
        return foldl(toTraversable(rest), reducer, head)
    }
    return Nothing
}

export const reduce = foldl
