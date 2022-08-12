import { isRight } from '../../guard'
import type { Either, Traverser } from '../../type'

export function* prependIterator<T>(first: Either<unknown, IteratorResult<T>>, second: Traverser<T>) {
    if (isRight(first)) {
        if (first.right.done !== true) {
            yield first.right.value
        }
    }
    yield* {
        [Symbol.iterator]() {
            return second
        },
    }
}
