import type { Tree } from '../../../algorithm/tree/tree.js'
import { collect } from '../../../array/collect/collect.js'
import { zipWith } from '../../../array/zip/zip.js'
import { isNothing } from '../../../guard/is-nothing/is-nothing.js'
import { applicative } from '../../../iterator/applicative/applicative.js'
import { concat } from '../../../iterator/concat/concat.js'
import { map } from '../../../iterator/map/map.js'
import { uncons } from '../../../iterator/uncons/uncons.js'
import { toTraversable, type Traversable } from '../../../type/traversable/traversable.js'

export function* consNub<T>(x: T, xs: Traversable<T>) {
    const [h, rest] = uncons(xs)
    if (isNothing(h) || h === x) {
        yield x
    } else {
        yield x
        yield h
    }
    yield* toTraversable(rest)
}

/**
 * @internal
 */
export function* towards(x: number, destination: number): Traversable<number, void> {
    if (destination === x) {
        return
    } else if (destination === 0 && x === 1) {
        yield 0
    } else {
        const diff = Math.trunc(x / 2 - destination / 2)
        yield* consNub(
            destination,
            map(halves(diff), (h) => Math.trunc(x - h))
        )
    }
}

function _binarySearchTree(bottom: number, top: number): Tree<number> {
    const shrinks = collect(towards(top, bottom))
    return {
        value: top,
        children: zipWith((b, t) => _binarySearchTree(b, t), shrinks, shrinks.slice(1)),
    }
}
export function binarySearchTree(bottom: number, top: number): Tree<number> {
    const shrinks = collect(towards(top, bottom))
    return {
        value: top,
        children: applicative(() =>
            concat(
                [{ value: bottom, children: [] }],
                zipWith((b, t) => _binarySearchTree(b, t), shrinks, shrinks.slice(1))
            )
        ),
    }
}

/**
 * @internal
 */
export function* halves(x: number): Traversable<number, void> {
    while (x !== 0) {
        yield x
        // es6 <3
        x = Math.trunc(x / 2)
    }
}

/**
 * @internal
 */
export function* towardsf(destination: number, x: number): Traversable<number, void> {
    if (Math.abs(destination - x) < Number.EPSILON) {
        return
    } else {
        const diff = x / 2 - destination / 2
        yield destination
        yield* map(halvesf(diff), (h) => x - h)
    }
}

/**
 * @internal
 */
export function* halvesf(x: number): Traversable<number, void> {
    while (Math.abs(x) > Number.EPSILON) {
        yield x
        x = x / 2
    }
}

/**
 * @internal
 */
export function* splits<T>(xs: T[]): Traversable<[T[], T, T[]], void> {
    for (let i = 0; i < xs.length; ++i) {
        yield [xs.slice(0, i), xs[i]!, xs.slice(i + 1)]
    }
}

/**
 * @internal
 */
export function splitX<T>(xs: T[], p: number): T[] {
    const i = Math.floor(xs.length * p)
    return xs.slice(0, i)
}

/**
 * @internal
 */
export class InfeasibleTree extends Error {
    public override name = 'Tree is found infeasible'
}
