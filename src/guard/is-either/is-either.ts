import type { Either } from '../../type/either'

/**
 * Check whether given `x` is of type {@link Either}.
 *
 * ### Example
 * ```ts
 * isEither({left: 123})
 * // => true
 *
 * isEither({right: 456})
 * // => true
 *
 * isEither("foobar")
 * // => false
 * ```
 *
 * @param x - The value to check.
 *
 * @returns `true` if `x` is a {@link Left} or a {@link Right}, `false` otherwise.
 *
 * @typeParam L - The {@link Left} type.
 * @typeParam R - The {@link Right} type.
 *
 * @group Guards
 * @group Either
 */
export function isEither<L, R>(x: Either<L, R> | unknown): x is Either<L, R> {
    return x !== null && x !== undefined && typeof x === 'object' && ('left' in x || 'right' in x)
}
