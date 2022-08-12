import { head } from '../../array'
import { isArray } from '../../guard'
import type { BuildTuple, Maybe, Traversable } from '../../type'
import { Nothing } from '../../type'
import { drop } from '../drop'

export type Nth<N extends number, T> = T extends readonly any[] ? T[N] : never

export function at<Xs extends any[], N extends number>(
    xs: readonly [...Xs],
    n: N
): Xs extends readonly [...BuildTuple<N, any>, infer X, ...any[]] ? X : number extends Xs['length'] ? Maybe<Xs[N]> : Nothing
export function at<T, N extends number = number>(xs: Traversable<T>, n: N): Maybe<T>
export function at<T, N extends number = number>(xs: Traversable<T>, n: N): Maybe<T> {
    if (isArray<T>(xs)) {
        return n >= xs.length ? Nothing : xs[n]
    }
    // slow iterator compatible version
    return head(drop(xs, n))
}

export function first<T>(xs: T): T extends readonly [infer N0, ...unknown[]] ? N0 : Nothing
export function first<T>(xs: Traversable<T>): Maybe<T>
export function first<T>(xs: Traversable<T>): Maybe<T> {
    return at(xs, 0)
}

export function second<T>(xs: readonly [unknown, T, ...unknown[]]): T
export function second<T>(xs: Traversable<T>): Maybe<T>
export function second<T>(xs: Traversable<T>): Maybe<T> {
    return at(xs, 1)
}

export function third<T>(xs: readonly [unknown, unknown, T, ...unknown[]]): T
export function third<T>(xs: Traversable<T>): Maybe<T>
export function third<T>(xs: Traversable<T>): Maybe<T> {
    return at(xs, 2)
}
