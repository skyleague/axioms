import { next } from '../../generator/next'
import { peekable } from '../../generator/peekable'
import { isRight } from '../../guard/is-right'
import type { Traversable, Traverser } from '../../type/traversable'
import { toTraverser } from '../../type/traversable'

export function* take<T>(xs: Traversable<T>, n: number): Generator<T, Traverser<T>> {
    const iterator = toTraverser(xs)

    for (let i = 0; i < n; ++i) {
        const val = next(iterator)
        // isRight inline
        if ('right' in val) {
            yield val.right
        } else {
            break
        }
    }

    return iterator
}

export function* takeWhile<T, R>(xs: Traversable<T, R>, predicate: (x: T) => boolean): Generator<T, Traverser<T, R>> {
    const iterator = peekable(xs)
    for (let peeked = iterator.peek(); isRight(peeked) && predicate(peeked.right); iterator.next(), peeked = iterator.peek()) {
        yield peeked.right
    }
    return iterator
}
