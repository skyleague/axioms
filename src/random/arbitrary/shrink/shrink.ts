import type { Tree } from '../../../algorithm/tree/tree.js'
import { zipWith } from '../../../array/zip/zip.js'
import { applicative } from '../../../iterator/applicative/applicative.js'

/**
 * @internal
 */
export function towards(x: number, destination: number): number[] {
    if (destination === x) {
        return []
    }
    if (destination === 0 && x === 1) {
        return []
    }
    const diff = Math.trunc(x / 2 - destination / 2)
    const xs = halves(diff).map((h) => Math.trunc(x - h))
    if (xs[0] !== destination) {
        xs.unshift(destination)
    }
    return xs
}

function _binarySearchTree(bottom: number, top: number): Tree<number> {
    const shrinks = towards(top, bottom)
    return {
        value: top,
        children: applicative(function* () {
            yield* zipWith((b, t) => _binarySearchTree(b, t), shrinks, shrinks.slice(1))
        }),
    }
}
export function binarySearchTree(bottom: number, top: number): Tree<number> {
    const shrinks = towards(top, bottom)
    return {
        value: top,
        children: applicative(function* () {
            yield { value: bottom, children: [] }
            yield* zipWith((b, t) => _binarySearchTree(b, t), shrinks, shrinks.slice(1))
        }),
    }
}

/**
 * @internal
 */
export function halves(from: number): number[] {
    const xs: number[] = []
    let x = from
    while (x !== 0) {
        xs.push(x)
        // es6 <3
        x = Math.trunc(x / 2)
    }
    return xs
}

/**
 * @internal
 */
export function* towardsf(destination: number, x: number): IteratorObject<number, void> {
    if (Math.abs(destination - x) < Number.EPSILON) {
        return
    }
    const diff = x / 2 - destination / 2
    yield destination
    yield* halvesf(diff).map((h) => x - h)
}

/**
 * @internal
 */
export function* halvesf(from: number): IteratorObject<number, void> {
    let x = from
    while (Math.abs(x) > Number.EPSILON) {
        yield x
        x /= 2
    }
}

/**
 * @internal
 */
export function* splits<T>(xs: T[]): IteratorObject<[T[], T, T[]], void> {
    for (let i = 0; i < xs.length; ++i) {
        // biome-ignore lint/style/noNonNullAssertion: The loop is bounded by the length of xs
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
