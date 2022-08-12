import type { Maybe } from '../../type'
import { Nothing } from '../../type'
import type { Traversable } from '../../type/traversable'
import { reverse } from '../reverse'

export function findLast<T>(xs: Traversable<T>, by: (item: T) => boolean): Maybe<T> {
    for (const item of reverse(xs)) {
        if (by(item)) {
            return item
        }
    }
    return Nothing
}
