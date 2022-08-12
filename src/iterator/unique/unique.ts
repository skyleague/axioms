import type { Traversable } from '../../type'
import { equal } from '../equal'
import { filterWithMemory } from '../filter'

export function unique<T>(xs: Traversable<T>, eq: (a: T, b: T) => boolean = equal): Traversable<T> {
    return filterWithMemory(xs, (y, ys) => ys.find((x) => eq(x, y)) === undefined)
}
