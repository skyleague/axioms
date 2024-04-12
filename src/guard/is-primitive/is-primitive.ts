/**
 * Checks if `x` is a primitive.
 *
 * ### Example
 * ```ts
 * isPrimitive(1234)
 * // => true
 *
 * isPrimitive(12.34)
 * // => true
 *
 * isPrimitive("foobar")
 * // => true
 *
 * isPrimitive({})
 * // => false
 * ```
 *
 * @param x - The value to check.
 *
 * @returns `true` if `x` is a primitive, `false` otherwise.
 *
 * @group Guards
 * @deprecated Hard to find a use case for this function.
 */
export function isPrimitive(x: PropertyKey | boolean | unknown): x is PropertyKey | boolean {
    const type = typeof x
    return x === undefined || x === null || type === 'string' || type === 'boolean' || type === 'number' || type === 'symbol'
}
