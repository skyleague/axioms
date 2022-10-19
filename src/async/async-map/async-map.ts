import type { AsyncTraversable } from '../../type/async'

/**
 * Map over an {@link AsyncTraversable}, and give the results back as an {@link AsyncTraversable} generator.
 *
 * ### Example
 * ```ts
 * await asyncCollect(asyncMap([1, 2, 3], (x) => x + 1))
 * // => [2, 3, 4]
 *
 * const asyncFn = <T>(x: T) => Promise.resolve(x)
 * async function* foobar() {
 *   yield await asyncFn('foo')
 *   yield await asyncFn('Bar')
 * }
 * await asyncCollect(asyncMap(foobar(), asyncFn))
 * // => ["foo", "bar"]
 * ```
 *
 * ### Alternatives
 * - [p-map-series](https://github.com/sindresorhus/p-map-series)
 *
 * @param xs - The values to map over.
 *
 * @returns An async map generator.
 *
 * @typeParam T - The element type.
 * @typeParam O - The mapped output type.
 *
 * @group Async
 */
export async function* asyncMap<I, O>(
    xs: AsyncTraversable<I>,
    mapper: (x: I, index: number) => O | Promise<O>
): AsyncTraversable<O> {
    let i = 0
    for await (const x of xs) {
        yield await mapper(x, i)
        ++i
    }
}
