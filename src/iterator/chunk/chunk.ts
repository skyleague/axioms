/**
 * Creates a generator that splits the given {@link Iterable} into chunks of the required size. If
 * no even chunks can be created, the last chunk will have fewer elements.
 *
 * ### Example
 * ```ts
 * collect(chunk([1, 2, 3, 4, 5], 1))
 * // => [[1], [2], [3], [4], [5]]
 *
 * collect(chunk([1, 2, 3, 4, 5], 3))
 * // => [[1, 2, 3], [4, 5]]
 *
 * collect(chunk([1, 2, 3], 0))
 * // => [[1], [2], [3]]
 * ```
 *
 * ### Alternatives
 * - [Lodash - chunk](https://lodash.com/docs/4.17.15#chunk)
 *
 * @param xs - The values to split in chunks.
 * @param size - The maximum size of a chunk, constrained to minimum value of 1.
 *
 * @returns A chunk generator.
 *
 * @typeParam T - The element type.
 *
 * @group Iterators
 */
export function* chunk<T>(xs: Iterable<T>, size: number): Generator<T[], void> {
    const iterator = Iterator.from(xs)
    let chunk: T[] = []
    const chunkSize = Math.max(size, 1)

    for (const item of iterator) {
        chunk.push(item)
        if (chunk.length >= chunkSize) {
            yield chunk
            chunk = []
        }
    }

    if (chunk.length > 0) {
        yield chunk
    }
}
