import type { Nothing } from '../../type/maybe/maybe'

/**
 * Checks if `x` is {@link Nothing}.
 *
 * ### Example
 * ```ts
 * isNothing(Nothing)
 * // => true
 *
 * isNothing(1234)
 * // => false
 *
 * isNothing("foobar")
 * // => false
 * ```
 *
 * @param x - The value to check.
 *
 * @returns `true` if `x` is {@link Nothing}, `false` otherwise.
 *
 * @see {@link isJust}
 *
 * @group Guards
 * @group Maybe
 */
export function isNothing(x: Nothing | unknown): x is Nothing {
    return (
        x !== undefined &&
        x !== null &&
        typeof x === 'object' &&
        '(Nothing)' in x &&
        (x as { ['(Nothing)']: unknown })['(Nothing)'] === true &&
        Object.isFrozen(x)
    )
}
