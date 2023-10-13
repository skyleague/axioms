import { mapApplicativeTree, tree } from '../../../algorithm/tree/index.js'
import type { Tree } from '../../../algorithm/tree/index.js'
import { collect } from '../../../array/collect/index.js'
import { curryTuple } from '../../../function/tuple/index.js'
import { next } from '../../../generator/index.js'
import { isRight } from '../../../guard/index.js'
import { concat, map } from '../../../iterator/index.js'
import type { SimplifyOnce, Traversable } from '../../../type/index.js'
import { toTraverser } from '../../../type/index.js'
import type { ArbitraryContext } from '../context/index.js'
import { shrinkX, shrinkOne } from '../shrink/index.js'

export interface Arbitrary<T> {
    value: (context: ArbitraryContext) => Tree<T>
}

export type AsArbitrary<T extends ArbitraryOrLiteral<unknown>> = T extends readonly unknown[]
    ? Arbitrary<
          SimplifyOnce<{
              [K in keyof T]: T[K] extends { value(context: ArbitraryContext): { value: infer Value } } ? Value : never
          }>
      >
    : T extends Arbitrary<infer U>
    ? Arbitrary<U>
    : T extends Record<PropertyKey, Arbitrary<unknown>>
    ? Arbitrary<{ [K in keyof T]: T[K] extends { value(context: ArbitraryContext): { value: infer Value } } ? Value : never }>
    : Arbitrary<T>

export type ArbitraryOrLiteral<T> = Arbitrary<T> | T

/**
 * @internal
 */
export type TypeOfArbitrary<T extends Arbitrary<unknown>> = ReturnType<T['value']>['value']

/**
 * @internal
 */
export type TypeOfArbitraries<T extends Arbitrary<unknown>[]> = ReturnType<[...T][number]['value']>['value']

/**
 * @internal
 */
export function interleaveTree<T, U>(r: Tree<T>, l: Tree<(x: T) => U>): Tree<U> {
    const { value: f, children: ls } = l
    const { value: x, children: rs } = r
    return {
        value: f(x),
        children: concat(
            map(ls, (lp) => interleaveTree(r, lp)),
            map(rs, (rp) => interleaveTree(rp, l))
        ),
    }
}

// @todo: optimize this

/**
 * @internal
 */
export function interleave<U extends Tree<unknown>[]>(
    ...xs: [...U]
): Tree<{ [K in keyof U]: U[K] extends { value: infer Value } ? Value : never }> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let init: any = mapApplicativeTree(xs[0], curryTuple(xs.length))
    for (let i = 1; i < xs.length; ++i) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        init = interleaveTree(xs[i], init)
    }
    return init as Tree<{ [K in keyof U]: U[K] extends { value: infer Value } ? Value : never }>
}

/**
 * @internal
 */
export function shrinkAll<T>(xs: Tree<T>[]): Tree<T[]>[] {
    const children = xs.map((x) => {
        const it = toTraverser(x.children)
        const n = next(it)
        return isRight(n) ? ([true, n.right] as const) : ([false, x] as const)
    })
    return children.every(([shrunk]) => shrunk) ? [interleaveList(map(children, ([, c]) => c))] : []
}

/**
 * @internal
 */
export function interleaveList<T>(xs: Traversable<Tree<T>>, options: { minLength?: number } = {}): Tree<T[]> {
    const { minLength = 0 } = options
    const axs = collect(xs)
    return tree(
        axs.map((x) => x.value),
        concat(
            ...[axs.length > minLength ? [interleaveList(axs.slice(0, minLength), options)] : []],
            // half first to dissect
            ...[Math.floor(axs.length * 0.5) > minLength ? [interleaveList(shrinkX(axs, 0.5), options)] : []],
            ...map(shrinkOne(axs), ([as, b, cs]) => map(b.children, (c) => interleaveList(concat(as, [c], cs), options))),
            ...[axs.length > minLength ? map(shrinkOne(axs), ([as, , cs]) => interleaveList(concat(as, cs), options)) : []]
            // lazy(() => shrinkAll(axs))
        )
    )
}
