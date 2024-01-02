import { isArray, isRight } from '../../guard/index.js'
import { isFunction } from '../../guard/is-function/is-function.js'
import type { Either, Traversable } from '../../type/index.js'
import { toTraverser } from '../../type/index.js'

/**
 * It takes a traversable and returns a traversable that buffers the values of the original traversable.
 *
 * ### Example
 * ```ts
 * const xs = applicative([1, 2, 3])
 * collect(xs)
 * // => [1, 2, 3]
 *
 *
 * const ys = applicative(take(cycle([1, 2]), 4))
 * collect(ys)
 * // => [1, 2, 1, 2]
 * collect(ys)
 * // => [1, 2, 1, 2]
 *
 * ```
 *
 * @param xs - The values to make applicative.
 *
 * @returns A traversable that is an applicative.
 *
 * @typeParam T - The element type.
 *
 * @group Iterators
 */
export function applicative<T>(xs: Traversable<T> | (() => Traversable<T>)): Traversable<T> {
    if (isFunction(xs)) {
        return {
            [Symbol.iterator]() {
                return xs()[Symbol.iterator]()
            },
        }
    }

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
