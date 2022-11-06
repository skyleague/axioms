import type { Dict } from '../../type'

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
 */
export function isPrimitive(x: unknown): x is Dict<unknown>
export function isPrimitive(x: PropertyKey | boolean | unknown): x is PropertyKey | boolean
export function isPrimitive(x: PropertyKey | boolean | unknown): x is PropertyKey | boolean {
    const type = typeof x
    return x === undefined || x === null || type === 'string' || type === 'boolean' || type === 'number' || type === 'symbol'
}
