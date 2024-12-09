/**
 * Collect the values from an {@link AsyncIterable} and return them as an array.
 *
 * ### Example
 * ```ts
 * await asyncCollect([1, 2, 3])
 * // => [2, 3, 4]
 *
 * await asyncCollect([Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)])
 * // => [2, 3, 4]
 *
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
 * - [p-all](https://github.com/sindresorhus/p-all)
 *
 * ### Proposals
 * - [`Array.prototype.fromAsync`](https://github.com/tc39/proposal-array-from-async)
 * - [`AsyncIterator.prototype.toArray`](https://github.com/tc39/proposal-async-iterator-helpers)
 *
 * @param xs - The values to map over.
 *
 * @returns An array with the values from the async generator.
 *
 * @typeParam T - The element type.
 * @typeParam O - The mapped output type.
 *
 * @group Async
 */
export async function asyncCollect<T>(xs: AsyncIterable<T> | Iterable<T>): Promise<T[]> {
    const ys: T[] = []
    for await (const item of xs) {
        ys.push(item)
    }
    return ys
}
