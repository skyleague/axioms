import type { Failure, Try } from '../../type/try/index.js'
import { isError } from '../is-error/index.js'

/**
 * Checks if `x` is a {@link Failure}.
 *
 * ### Example
 * ```ts
 * isFailure("foobar")
 * // => false
 *
 * isFailure(new Error())
 * // => true
 * ```
 *
 * @param x - The value to check.
 *
 * @returns `true` if `x` is a {@link Failure}, `false` otherwise.
 *
 * @group Guards
 */
export function isFailure(x: Try<unknown> | unknown): x is Failure {
    return isError(x)
}
