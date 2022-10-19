import type { Either, Left } from '../../type/either'

/**
 * Check whether given `x` is of type {@link Left}.
 *
 * ### Example
 * ```ts
 * isLeft({left: 123})
 * // => true
 *
 * isLeft({right: 456})
 * // => false
 *
 * isLeft({left: 1234} as Either<number, string>)
 * // => x is Left<number>
 * ```
 *
 * @param x - The value to check.
 *
 * @returns `true` if `x` is a {@link Left}, `false` otherwise.
 *
 * @typeParam L - The {@link Left} type.
 *
 * @group Guards
 * @group Either
 */
export function isLeft<L>(x: Either<L, unknown> | unknown): x is Left<L> {
    return x !== null && x !== undefined && typeof x === 'object' && 'left' in x
}
