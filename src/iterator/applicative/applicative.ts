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
export function applicative<T>(xs: () => Iterable<T>): Iterable<T> {
    return {
        [Symbol.iterator]() {
            return xs()[Symbol.iterator]()
        },
    }
}
