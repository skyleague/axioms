import { mapApplicativeTree, tree } from '../../../algorithm/tree'
import type { Tree } from '../../../algorithm/tree'
import { collect } from '../../../array/collect'
import { curryTuple } from '../../../function/tuple'
import { next } from '../../../generator'
import { isRight } from '../../../guard'
import { concat, map } from '../../../iterator'
import type { Traversable } from '../../../type'
import { toTraverser } from '../../../type'
import type { ArbitraryContext } from '../context'
import { shrinkX, shrinkOne } from '../shrink'

export interface Arbitrary<T> {
    value: (context: ArbitraryContext) => Tree<T>
}

export type TypeOfArbitrary<T extends Arbitrary<unknown>> = ReturnType<T['value']>['value']
export type TypeOfArbitraries<T extends Arbitrary<unknown>[]> = ReturnType<[...T][number]['value']>['value']

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
export function interleave<U extends Tree<unknown>[]>(
    ...xs: [...U]
): Tree<{ [K in keyof U]: U[K] extends { value: infer Value } ? Value : never }> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let init: any = mapApplicativeTree(curryTuple(xs.length), xs[0])
    for (let i = 1; i < xs.length; ++i) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        init = interleaveTree(xs[i], init)
    }
    return init as Tree<{ [K in keyof U]: U[K] extends { value: infer Value } ? Value : never }>
}

export function shrinkAll<T>(xs: Tree<T>[]): Tree<T[]>[] {
    const children = xs.map((x) => {
        const it = toTraverser(x.children)
        const n = next(it)
        return isRight(n) ? ([true, n.right] as const) : ([false, x] as const)
    })
    return children.every(([shrunk]) => shrunk) ? [interleaveList(map(children, ([, c]) => c))] : []
}

export function interleaveList<T>(xs: Traversable<Tree<T>>, options: { minLength?: number } = {}): Tree<T[]> {
    const { minLength = 0 } = options
    const axs = collect(xs)
    return tree(
        axs.map((x) => x.value),
        concat(
            // half first to dissect
            ...[Math.floor(axs.length * 0.5) > minLength ? [interleaveList(shrinkX(axs, 0.5), options)] : []],
            ...map(shrinkOne(axs), ([as, b, cs]) => map(b.children, (c) => interleaveList(concat(as, [c], cs), options))),
            ...[axs.length > minLength ? map(shrinkOne(axs), ([as, , cs]) => interleaveList(concat(as, cs), options)) : []]
            // lazy(() => shrinkAll(axs))
        )
    )
}
