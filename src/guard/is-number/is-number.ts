/**
 * Checks if `x` is a {@link number} primitive.
 *
 * ### Example
 * ```ts
 * isNumber(1234)
 * // => true
 *
 * isNumber(12.34)
 * // => true
 *
 * isNumber("foobar")
 * // => false
 * ```
 *
 * ### Alternatives
 * - [Lodash isNumber](https://lodash.com/docs/4.17.15#isNumber)
 *
 * @param x - The value to check.
 *
 * @returns `true` if `x` is a {@link number}, `false` otherwise.
 *
 * @group Guards
 */
export function isNumber(x: number | unknown): x is number {
    return typeof x === 'number'
}
