import type { InfiniteGenerator } from '../../type/index.js'

/**
 * Creates a generator that counts each iteration.
 *
 * ### Example
 * ```ts
 * collect(take(counter(), 4))
 * // => [0, 1, 2, 3]
 *
 * collect(take(counter(10), 4))
 * // => [10, 11, 12, 13]
 * ```
 *
 * @param start - The number where the counter starts.
 *
 * @returns The counter generator.
 *
 * @group Generators
 */
export function* counter(start = 0): InfiniteGenerator<number> {
    let i = start
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    while (true) {
        yield i++
    }
}
