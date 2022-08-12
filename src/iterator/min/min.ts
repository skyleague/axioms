import { isJust } from '../../guard'
import type { ComparablePrimitive, Just, Maybe, Traversable } from '../../type'
import { Nothing } from '../../type'
import { foldl1 } from '../fold'
import { map } from '../map'

export function min<T extends ComparablePrimitive, Ts extends readonly [T, ...T[]]>(xs: Ts): Just<Ts[number]>
export function min<T extends ComparablePrimitive, Ts extends [T, ...T[]]>(xs: Ts): Just<Ts[number]>
export function min<T extends ComparablePrimitive>(xs: Traversable<T>): Maybe<T>
export function min<T extends ComparablePrimitive>(xs: Traversable<T>): Maybe<T> {
    return foldl1(xs, (a, b) => (b < a ? b : a))
}

export function minBy<T, Ts extends readonly [T, ...T[]]>(xs: Ts, f: (item: T) => ComparablePrimitive): Just<Ts[number]>
export function minBy<T, Ts extends [T, ...T[]]>(xs: Ts, f: (item: T) => ComparablePrimitive): Just<Ts[number]>
export function minBy<T>(xs: Traversable<T>, f: (item: T) => ComparablePrimitive): Maybe<T>
export function minBy<T>(xs: Traversable<T>, f: (item: T) => ComparablePrimitive): Maybe<T> {
    const xMin = foldl1(
        map(xs, (x) => [x, f(x)] as const),
        (acc, x) => (x[1] < acc[1] ? x : acc)
    )
    return isJust(xMin) ? xMin[0] : Nothing
}
