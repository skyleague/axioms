import type { Traverser, Maybe, Traversable } from '../../type'
import { Nothing, toTraverser } from '../../type'

export function iuncons<T>(iterator: Traverser<T>): [Maybe<T>, Traverser<T>] {
    const head = iterator.next()
    return [head.done === true ? Nothing : head.value, iterator]
}

export function uncons<T>(xs: Traversable<T>): [Maybe<T>, Traverser<T>] {
    const iterator = toTraverser(xs)
    return iuncons(iterator)
}
