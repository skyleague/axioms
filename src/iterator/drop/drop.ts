import { peekable } from '../../generator/peekable'
import { isRight } from '../../guard/is-right'
import { toTraverser, toTraversable } from '../../type/traversable'
import type { Traversable } from '../../type/traversable'

export function* drop<T>(xs: Traversable<T>, n: number): Traversable<T, void> {
    const iterator = toTraverser(xs)
    for (let i = 0; i < n; ++i, iterator.next()) {
        //
    }
    yield* toTraversable(iterator)
}

export function* dropWhile<T>(xs: Traversable<T>, predicate: (x: T) => boolean): Traversable<T, void> {
    const iterator = peekable(xs)
    for (let peeked = iterator.peek(); isRight(peeked) && predicate(peeked.right); iterator.next(), peeked = iterator.peek()) {
        //
    }
    yield* toTraversable(iterator)
}
