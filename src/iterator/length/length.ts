import { isArray } from '../../guard'
import type { Traversable, Maybe } from '../../type'
import { Nothing } from '../../type'

export function length<T>(xs: readonly T[]): number
export function length(xs: unknown): Nothing
export function length<T>(xs: Traversable<T> | unknown): Maybe<number> {
    if (isArray(xs)) {
        return xs.length
    }
    return Nothing
}
