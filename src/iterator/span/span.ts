import { next } from '../../generator/next'
import { isRight } from '../../guard/is-right'
import type { Traversable, Traverser } from '../../type/traversable'
import { takeWhile } from '../take'

export function span<T, R>(xs: Traversable<T, R>, predicate: (x: T) => boolean): [T[], Traverser<T, R>] {
    const takeIterator = takeWhile(xs, predicate)
    const first = []
    let it = next(takeIterator)
    while (isRight(it)) {
        first.push(it.right)
        it = next(takeIterator)
    }
    const rest = it.left
    return [first, rest]
}
