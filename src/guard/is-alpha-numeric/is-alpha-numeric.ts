/**
 * Check whether given `str` is alphanumeric string.
 *
 * The allowed characters are A-Z, and a-z.
 *
 * ### Example
 * ```ts
 * isAlphaNumeric("foobar")
 * // => true
 *
 * isAlphaNumeric("foobar123")
 * // => true
 *
 * isAlphaNumeric("foobar")
 * // => false
 *
 * isAlphaNumeric("foobar$", "$")
 * // => true
 * ```
 *
 * @param str - The string to check for alphanumeric characters.
 * @param extra - Extra characters that are allowed.
 *
 * @returns `str` consists of alphanumeric characters.
 *
 * @group Guards
 */
export function isAlphaNumeric(str: string, extra?: string): boolean {
    return new RegExp(`^[A-Za-z0-9${extra ?? ''}]+$`).test(str)
}
