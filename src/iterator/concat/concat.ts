/**
 * Creates a generator that concatenates the given {@link Traversable}s to each other
 * in the given order.
 *
 * ### Example
 * ```ts
 * collect(concat([1, 2], [3, 4], [5]))
 * // => [1, 2, 3, 4, 5]
 * ```
 *
 * ### Alternatives
 * - [ECMAScript - Array.concat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/concat)
 * - [Lodash - concat](https://lodash.com/docs/4.17.15#concat)
 *
 * @param xs - The {@link Iterable}s to concatenate.
 *
 * @returns A concatenation generator.
 *
 * @typeParam T - The element type.
 *
 * @group Iterators
 */
export function concat<T, U>(xs1: Iterable<T>, xs2: Iterable<U>): IteratorObject<T | U, void>
export function concat<T, U, V>(xs1: Iterable<T>, xs2: Iterable<U>, xs3: Iterable<V>): IteratorObject<T | U | V, void>
export function concat<T>(...xs: Iterable<T>[]): IteratorObject<T, void>
export function* concat<T>(...xs: Iterable<T>[]): IteratorObject<T, void> {
    for (const x of xs) {
        yield* x
    }
}
