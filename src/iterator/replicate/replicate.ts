import { repeat } from '../../generator/repeat'
import { filterWithMemory } from '../filter'
import { take } from '../take'

export function* replicate<T>(x: T | ((i: number) => T), n: number): Generator<T> {
    yield* take(repeat(x), n)
}

export function* replicateWithMemory<T>(
    x: (i: number) => T,
    predicate: (x: T, xs: T[], i: number, skippedInRow: number) => boolean,
    n: number
): Generator<T> {
    yield* take(filterWithMemory(repeat(x), predicate), n)
}
