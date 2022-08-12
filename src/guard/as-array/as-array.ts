import { isArray } from '../is-array'

export function asArray<T>(x: T | T[]): T[] {
    return isArray(x) ? x : [x]
}
