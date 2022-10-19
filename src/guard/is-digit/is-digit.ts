/**
 * Checks if `xs` contains only digits.
 *
 * ### Example
 * ```ts
 * isDigits("1234")
 * // => true
 *
 * isDigits("1234foobar")
 * // => false
 *
 * isDigits("123.45")
 * // => false
 * ```
 *
 * @param xs - The value to check.
 *
 * @returns `true` if `xs` only contains digits, `false` otherwise.
 *
 * @group Guards
 */
export function isDigits(xs: string): boolean {
    return xs.match(/^[0-9]+$/) !== null
}
