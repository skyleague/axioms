import deepEqual from 'fast-deep-equal/es6/index.js'

/**
 * It returns true if the two arguments are deeply equal, and false otherwise.
 *
 * This function is a wrapper around [fast-deep-equal](https://www.npmjs.com/package/fast-deep-equal).
 *
 * ### Example
 * ```ts
 * equal({foo: "bar"}, {foo: "bar"})
 * // => true
 *
 * equal([1, 2, 3], [1, 2, 3])
 * // => true
 *
 * equal([1, 2, 3], [1, 2])
 * // => false
 *
 * equal([{foo: "bar"}], [{bar: "foo"}])
 * // => false
 * ```
 *
 * ### Alternatives
 * - [fast-deep-equal](https://www.npmjs.com/package/fast-deep-equal)
 * - [Lodash - isEqual](https://lodash.com/docs/4.17.15#isEqual)
 *
 * @param a - unknown
 * @param b - unknown
 *
 * @returns A function that takes two arguments and returns a boolean.
 *
 * @group Iterators
 */
export function equal(a: unknown, b: unknown): boolean {
    return deepEqual(a, b)
}
