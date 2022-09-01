import type { KeyOf } from '../../type'

export type ValuesOf<T> = T extends Array<infer I> ? I[] : Array<T[KeyOf<T>]>
export function valuesOf<T extends ArrayLike<unknown> | {}>(obj: T): ValuesOf<T> {
    return Object.values(obj) as ValuesOf<T>
}
