import type { Traversable } from '../../type'

export function isArray<I>(arr: Traversable<I> | unknown): arr is I[] {
    return Array.isArray(arr)
}
