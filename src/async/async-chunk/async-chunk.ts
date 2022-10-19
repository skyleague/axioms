import type { AsyncTraversable } from '../../type/async'

/**
 * Creates an async generator that splits the given {@link AsyncTraversable} into chunks of the required size. If
 * no even chunks can be created, the last chunk will have fewer elements.
 *
 * ### Example
 * ```ts
 * await asyncCollect(asyncChunk([1, 2, 3, 4, 5], 1))
 * // => [[1], [2], [3], [4], [5]]
 *
 * await asyncCollect(asyncChunk([1, 2, 3, 4, 5], 3))
 * // => [[1, 2, 3], [4, 5]]
 *
 * await asyncCollect(asyncChunk([1, 2, 3], 0))
 * // => [[1], [2], [3]]
 * ```
 *
 * @param xs - The values to split in chunks.
 * @param size - The maximum size of a chunk, constrained to minimum value of 1.
 *
 * @returns An async map generator.
 *
 * @typeParam T - The element type.
 *
 * @see {@link chunk}
 *
 * @group Async
 */
export async function* asyncChunk<T>(xs: AsyncTraversable<T>, size: number): AsyncTraversable<T[]> {
    size = Math.max(size, 1)
    let chunk: T[] = []
    for await (const item of xs) {
        chunk.push(item)
        if (chunk.length >= size) {
            yield chunk
            chunk = []
        }
    }
    if (chunk.length > 0) {
        yield chunk
    }
}
