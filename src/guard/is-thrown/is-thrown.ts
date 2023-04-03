import { Thrown } from '../../type/index.js'
import { isObject } from '../is-object/index.js'

/**
 * Checks if `x` was tagged as thrown.
 *
 * @param x - The value to check.
 *
 * @returns `true` if `x` is tagged as thrown, otherwise `false`.
 *
 * @group Guards
 */
export function isThrown<T extends {}>(x: T | unknown): x is T & { [Thrown]?: true } {
    if (isObject(x)) {
        return Thrown in x
    }
    return false
}

export function thrown<T extends {}>(x: T | unknown): T & { [Thrown]?: true } {
    if (isObject(x)) {
        x[Thrown] = true
    }
    return x as T & { [Thrown]?: true }
}
