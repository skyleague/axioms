import { isObject } from '../../guard/index.js'

/**
 * Merge two objects recursively.
 *
 * ### Example
 * ```ts
 * mergeDeep({a: [{ b: 2 }, { d: 4 }]}, {a: [{ c: 3 }, { e: 5 }]})
 * // => {a: [{ b: 2 }, { d: 4 }]}
 * ```
 *
 * ### Alternatives
 * - [Lodash - https://lodash.com/docs/4.17.15#merge](https://lodash.com/docs/4.17.15#merge)
 *
 * @param source - The object to merge from.
 * @param target - The object to merge into.
 * @returns The merged object.
 *
 * @group Object
 * @experimental
 */
export function mergeDeep<T, U>(source: U, target: T): T | U {
    const output: Record<string, unknown> = Object.assign({}, target)
    if (isObject(target) && isObject(source)) {
        for (const key of Object.keys(source)) {
            const obj = source[key]
            if (isObject(obj)) {
                if (!(key in target)) {
                    Object.assign(output, { [key]: obj })
                } else {
                    output[key] = mergeDeep(obj, target[key])
                }
            } else {
                Object.assign(output, { [key]: obj })
            }
        }
    }
    return output as T | U
}
