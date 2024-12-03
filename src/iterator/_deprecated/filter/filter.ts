import type { InfiniteGenerator, Traversable } from '../../../type/index.js'

/**
 * Filters items from the {@link Traversable} that do not satisfy the given predicate.
 *
 * ### Example
 * ```ts
 * collect(filter([1, 2, 3, 4], x => x > 2))
 * // => [3, 4]
 * ```
 *
 * ### Proposals
 * - [`Iterator.prototype.filter`](https://github.com/tc39/proposal-iterator-helpers)
 *
 * @param xs - The values to iterate over.
 * @param by - The predicate that must hold true.
 *
 * @returns The filtered {@link Traversable}.
 *
 * @typeParam T - The element type.
 *
 * @group Iterators
 * @deprecated Use `xs.filter(by)` instead
 */
export function filter<T>(xs: InfiniteGenerator<T>, by: (x: T) => boolean): InfiniteGenerator<T>
export function filter<S extends T, T>(xs: Traversable<T>, by: (x: T) => x is S): Traversable<S>
export function filter<T>(xs: Traversable<T>, by: (x: T) => boolean): Traversable<T>
export function* filter<T>(xs: Traversable<T>, by: (x: T) => boolean) {
    for (const x of xs) {
        if (by(x)) {
            yield x
        }
    }
}

/**
 * @experimental
 */
export function filterWithMemory<S extends T, T>(
    xs: Iterable<T>,
    by: (x: T, xs: S[], i: number, skippedInRow: number) => x is S,
): IteratorObject<S>
export function filterWithMemory<T>(
    xs: Iterable<T>,
    by: (x: T, xs: T[], i: number, skippedInRow: number) => boolean,
): IteratorObject<T>
export function* filterWithMemory<T>(xs: Iterable<T>, by: (x: T, xs: T[], i: number, skippedInRow: number) => boolean) {
    const memory: T[] = []
    let i = 0
    let skippedInRow = 0
    for (const x of xs) {
        if (by(x, memory, i++, skippedInRow)) {
            memory.push(x)
            yield x
            skippedInRow = 0
        } else {
            skippedInRow += 1
        }
    }
}
