import { isArray } from '../../guard'
import type { Traversable } from '../../type'

/**
 * Take the {@link Traversable}, and returns it in reversed order.
 *
 * The function evaluates the {@link Traversable} and converts it into an array.
 *
 * ### Example
 * ```ts
 * collect(reverse([1, 2, 3]))
 * // => [3, 2, 1]
 *
 * function* foobar() {
 *     yield 'foo'
 *     yield 'bar'
 * }
 * collect(reverse(foobar()))
 * // => ["bar"", "foo"]
 * ```
 *
 * ### Alternatives
 * - [ECMAScript - Array.reverse](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reverse)
 * - [Lodash - reverse](https://lodash.com/docs/4.17.15#reverse)
 *
 * @param xs - The {@link Traversable} to reverse.
 *
 * @returns The elements from the {@link Traversable} in reversed order.
 *
 * @typeParam T - The element type.
 *
 * @group Array
 */
export function* reverse<T>(xs: Traversable<T>): Generator<T, void> {
    if (isArray<T>(xs)) {
        for (let i = xs.length - 1; i >= 0; --i) {
            yield xs[i]
        }
    } else {
        for (const x of [...xs].reverse()) {
            yield x
        }
    }
}
