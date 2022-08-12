import { map } from '../../../iterator'
import type { Traversable } from '../../../type'

export function* towards(x: number, destination: number): Traversable<number, void> {
    if (destination !== x) {
        const diff = Math.trunc(x / 2 - destination / 2)
        yield* map(halves(diff), (h) => Math.trunc(x - h))
    }
}

export function* halves(x: number): Traversable<number, void> {
    while (x !== 0) {
        yield x
        // es6 <3
        x = Math.trunc(x / 2)
    }
}

export function* towardsf(destination: number, x: number): Traversable<number, void> {
    if (destination !== x) {
        const diff = x / 2 - destination / 2
        yield* map(halvesf(diff), (h) => x - h)
    }
}

export function* halvesf(x: number): Traversable<number, void> {
    while (Math.abs(x) > Number.EPSILON) {
        yield x
        x = x / 2
    }
}

export function* shrinkOne<T>(xs: T[]): Traversable<[T[], T, T[]], void> {
    for (let i = 0; i < xs.length; ++i) {
        yield [xs.slice(0, i), xs[i], xs.slice(i + 1)]
    }
}

export function shrinkX<T>(xs: T[], p: number): T[] {
    const i = Math.floor(xs.length * p)
    return xs.slice(0, i)
}

export class InfeasibleTree extends Error {
    public name = 'Tree is found infeasible'
}
