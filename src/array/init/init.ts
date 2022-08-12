import { splitLast } from '../../iterator/split'
import type { Traversable } from '../../type/traversable'

export function init<T>(xss: Traversable<T>): T[] {
    const [xs] = splitLast(xss)
    return xs
}
