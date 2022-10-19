/**
 * Check whether given `str` is alphabetic string.
 *
 * The allowed characters are A-Z, and a-z.
 *
 * ### Example
 * ```ts
 * isAlpha("foobar")
 * // => true
 *
 * isAlpha("foobar123")
 * // => false
 *
 * isAlpha("foobar123", "123")
 * // => true
 * ```
 *
 * @param str - The string to check for alphabetic characters.
 * @param extra - Extra characters that are allowed.
 *
 * @returns `str` consists of alphabetic characters.
 *
 * @group Guards
 */
export function isAlpha(str: string, extra?: string): boolean {
    return new RegExp(`^[A-Za-z${extra ?? ''}]+$`).test(str)
}
