import type { Either, Traversable } from '../../type/index.js'
import { toTraverser } from '../../type/index.js'

/**
 * A generator that allows looking into the next value, before iterating onto it.
 *
 * @typeParam T - The iterator type.
 * @typeParam R - The generator return type.
 */
export interface PeekableGenerator<T, R> extends Generator<T, R> {
    /**
     * Shows the next value of the generator.
     *
     * @returns `Left<R>` when the next value is the return value, otherwise `Right<T>` with the next value.
     */
    peek(): Either<R, T>
}

/**
 * Creates a generator that allows you to look into the next available value, *before* iterating
 * onto it.
 *
 * ### Example
 * ```ts
 * const iterator = peekable(range(3))
 * let it = next(iterator)
 * while (isRight(it)) {
 *   values.push([it, iterator.peek()])
 *   it = next(iterator)
 * }
 * // values => [
 * //   [ { right: 0 }, { right: 1 } ],
 * //   [ { right: 1 }, { right: 2 } ],
 * //   [ { right: 2 }, { left: undefined } ]
 * // ]
 * ```
 *
 * @param xs - The {@link Traversable} to make peekable.
 *
 * @returns The {@link PeekableGenerator} generator.
 *
 * @typeParam T - The iterator type.
 * @typeParam R - The generator return type.
 *
 * @group Generators
 */
export function peekable<T, R>(xs: Traversable<T, R>): PeekableGenerator<T, R> {
    const iterator = toTraverser(xs)
    let state = iterator.next()

    const generator: PeekableGenerator<T, R> = (function* () {
        while (state.done !== true) {
            const current = state.value
            state = iterator.next()
            yield current
        }
        return state.value
    })() as PeekableGenerator<T, R>

    generator.peek = () => (state.done ? { left: state.value } : { right: state.value })
    return generator
}
