import type { Maybe } from '../../type/maybe'
import type { Just } from '../../type/maybe/maybe'
import { isNothing } from '../is-nothing'

/**
 * Checks if `x` is not {@link Nothing}.
 *
 * ### Example
 * ```ts
 * isJust(1234)
 * // => true
 *
 * isJust("foobar")
 * // => true
 *
 * isJust(Nothing)
 * // => false
 * ```
 *
 * @param x - The value to check.
 *
 * @returns `false` if `x` is {@link Nothing}, `true` otherwise.
 *
 * @typeParam T - The type of value `x`.
 *
 * @see {@link isNothing}
 *
 * @group Guards
 * @group Maybe
 */
export function isJust<T>(x: Maybe<T>): x is Just<T> {
    return !isNothing(x)
}
