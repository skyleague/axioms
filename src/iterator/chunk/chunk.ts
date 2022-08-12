import { toTraversable } from '../../type/traversable'
import type { Traversable } from '../../type/traversable'
import { itrampoline } from '../../util/trampoline'
import type { RecurrentGenerator } from '../../util/trampoline'
import { splitAt } from '../split'

function _chunk<T>(xs: Traversable<T>, size: number): RecurrentGenerator<T[]> {
    const [init, rest] = splitAt(xs, size)
    return [init, init.length > 0 ? () => _chunk(toTraversable(rest), size) : undefined]
}

export function* chunk<T>(xs: Traversable<T>, size: number): Generator<T[]> {
    yield* itrampoline(_chunk)(xs, size)
}
