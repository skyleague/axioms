import type { Either, Right } from '../../type/either'

/**
 * Check whether given `x` is of type {@link Right}.
 *
 * ### Example
 * ```ts
 * isRight({right: 123})
 * // => true
 *
 * isRight({left: 456})
 * // => false
 *
 * isRight({right: "foobar"} as Either<number, string>)
 * // => x is Right<string>
 * ```
 *
 * @param x - The value to check.
 *
 * @returns `true` if `x` is a {@link Right}, `false` otherwise.
 *
 * @typeParam R - The {@link Right} type.
 *
 * @group Guards
 * @group Either
 */
export function isRight<R>(x: Either<unknown, R> | unknown): x is Right<R> {
    return x !== null && x !== undefined && typeof x === 'object' && 'right' in x
}
