import { uncons } from '../../iterator/uncons'
import type { Maybe } from '../../type/maybe'
import type { Traversable } from '../../type/traversable'

export function head<T>(xs: Traversable<T>): Maybe<T> {
    const [h] = uncons(xs)
    return h
}
