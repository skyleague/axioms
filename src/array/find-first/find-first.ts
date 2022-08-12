import type { Traversable, Maybe } from '../../type'
import { Nothing } from '../../type'

export function findFirst<T>(xs: Traversable<T>, by: (item: T) => boolean): Maybe<T> {
    for (const item of xs) {
        if (by(item)) {
            return item
        }
    }
    return Nothing
}
