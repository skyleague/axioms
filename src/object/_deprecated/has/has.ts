/**
 * If the key is in the object, return true, otherwise return false.
 *
 * ### Example
 * ```ts
 * has({foo: "bar"}, "foo")
 * // => true
 *
 * has({foo: "bar"}, "bar")
 * // => false
 * ```
 *
 * ### Alternatives
 * - [Lodash - has](https://lodash.com/docs/4.17.15#has)
 *
 * @param obj - The object to check.
 * @param key - The key to check.
 * @returns Whether the key is the object.
 *
 * @group Object
 * @deprecated - Use `key in obj` instead.
 */
export function has<T extends {}>(obj: T, key: string | keyof T): key is keyof T {
    return (key as string) in obj
}
