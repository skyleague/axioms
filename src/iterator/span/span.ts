/**
 * Returns a tuple where first element is longest prefix of `xs` of elements
 * that satisfy the predicate and second element is the remainder of the Iterable.
 *
 * ### Example
 * ```ts
 * const [init, rest] = span([1, 2, 3, 4], (x) => x < 3)
 * init
 * // => [1, 2]
 *
 * collect(rest)
 * // => [3, 4]
 * ```
 *
 * @param xs - The values to span.
 * @param predicate - The predicate to split the Iterable on.
 * @returns A tuple.
 *
 * @typeParam T - The element type.
 * @typeParam R - The return type.
 *
 * @group Iterators
 */
export function span<T, R>(xs: Iterable<T, R>, predicate: (x: T) => boolean): [T[], IteratorObject<T, R>] {
    const first: T[] = []
    const iterator = xs[Symbol.iterator]()
    let current = iterator.next()

    while (!current.done && predicate(current.value)) {
        first.push(current.value)
        current = iterator.next()
    }

    const rest = {
        [Symbol.iterator]() {
            let hasReturnedCurrent = false
            return {
                next() {
                    if (!hasReturnedCurrent && !current.done) {
                        hasReturnedCurrent = true
                        return current
                    }
                    return iterator.next()
                },
            }
        },
    }

    return [first, Iterator.from(rest) as IteratorObject<T, R>]
}
