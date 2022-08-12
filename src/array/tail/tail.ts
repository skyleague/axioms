import { uncons } from '../../iterator/uncons'
import type { Traversable, Traverser } from '../../type/traversable'

export function tail<T>(xs: Traversable<T>): Traverser<T> {
    const [, rest] = uncons(xs)
    return rest
}
