import { isArray, isRight } from '../../guard'
import type { Either, Traversable } from '../../type'
import { toTraverser } from '../../type'

export function applicative<T>(xs: Traversable<T>): Traversable<T> {
    // optimization for Array.isArray
    if (isArray(xs)) {
        return xs
    }

    // memoize for reentry
    let current: Either<Traversable<T>, T[]> = { left: xs }
    const buffer: T[] = []
    return {
        [Symbol.iterator]() {
            if (isRight(current)) {
                return current.right[Symbol.iterator]()
            } else {
                const xss = current.left
                return toTraverser(function* () {
                    // since this is an applicative, we expect each iterator to start at the beginning
                    yield* buffer
                    // lazily continue through the traversable until it's empty
                    for (const x of xss) {
                        buffer.push(x)
                        yield x
                    }
                    current = { right: buffer }
                })
            }
        },
    }
}
