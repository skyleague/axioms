import type { Success } from '../../type/try/index.js'
import { isError } from '../is-error/index.js'

/**
 * Checks if `x` is a {@link Success}.
 *
 * ### Example
 * ```ts
 * isSuccess("foobar")
 * // => true
 *
 * isSuccess(new Error())
 * // => false
 * ```
 *
 * @param x - The value to check.
 *
 * @returns `true` if `x` is a {@link Success}, `false` otherwise.
 *
 * @group Guards
 */
export function isSuccess<T>(x: T): x is Success<T> {
    return !isError(x)
}
