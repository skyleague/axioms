import type { Either, InfiniteGenerator, Right, Traverser } from '../../type/index.js'

/**
 * Takes the next value of an iterator, and returns an {@link Either} with the received value.
 * when the iterator is `done`, the function will return it as a {@link Left}.
 *
 * ### Example
 * ```ts
 * next(counter())
 * // => {right: 0}
 *
 * next(toTraverser([1234, 456]))
 * // => {right: 1234}
 *
 * next(toTraverser([]))
 * // => {right: 1234}
 *
 * function* done() {
 *   yield 1
 *   return 'done'
 * }
 * const it = toTraverser(done())
 * next(it)
 * // => {right: 1}
 * next(it)
 * // => {left: "done"}
 * ```
 *
 * @param g - The iterator to take the next value from.
 *
 * @returns `Left` if the iterator is `done`, otherwise `Right`.
 *
 * @typeParam T - The element type.
 *
 * @group Generators
 */
export function next<T>(g: InfiniteGenerator<T>): Right<T>
export function next<T, R = unknown>(g: Generator<T, R> | Traverser<T, R>): Either<R, T>
export function next<T, R = unknown>(g: Generator<T, R> | Traverser<T, R>): Either<R, T> {
    const it = g.next()
    return it.done === true ? { left: it.value } : { right: it.value }
}
