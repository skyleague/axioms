import type { Tree } from '../../../algorithm/tree/tree.js'
import { collect } from '../../../array/collect/collect.js'
import { zip } from '../../../array/zip/zip.js'
import { applicative } from '../../../iterator/applicative/applicative.js'
import { concat } from '../../../iterator/concat/concat.js'
import { map } from '../../../iterator/map/map.js'
import { type Traversable, toTraverser } from '../../../type/traversable/traversable.js'
import type { Simplify } from '../../../types.js'
import type { ArbitraryContext } from '../context/context.js'
import { splitX, splits } from '../shrink/shrink.js'

export interface Arbitrary<T> {
    value: (context: ArbitraryContext) => Tree<T>
}

export type AsArbitrary<T extends ArbitraryOrLiteral<unknown>> = T extends readonly unknown[]
    ? Arbitrary<
          Simplify<{
              [K in keyof T]: T[K] extends { value(context: ArbitraryContext): { value: infer Value } } ? Value : never
          }>
      >
    : T extends Arbitrary<infer U>
      ? Arbitrary<U>
      : T extends Record<PropertyKey, Arbitrary<unknown>>
          ? Arbitrary<{
                  [K in keyof T]: T[K] extends { value(context: ArbitraryContext): { value: infer Value } } ? Value : never
              }>
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
export function interleave<U extends Tree<unknown>[]>(
    ...xs: [...U]
): Tree<{ [K in keyof U]: U[K] extends { value: infer Value } ? Value : never }> {
    return {
        value: xs.map((x) => x.value),
        children: applicative(() => {
            const allShrunk = toTraverser(map(shrinkAll(xs), (x) => interleave(...collect(x))))
            const first = allShrunk.next()
            const second = allShrunk.next()
            return concat(
                first.done !== true ? [first.value] : [],
                ...map(splits(xs), ([as, b, cs]) => map(b.children, (c) => interleave(...as, c, ...cs))),
                second.done !== true ? [second.value] : [],
                // take(
                //     map(shrinkAll(xs), (x) => interleave(...collect(x))),
                //     2
                // )
            )
        }),
    } as Tree<{ [K in keyof U]: U[K] extends { value: infer Value } ? Value : never }>
}

/**
 * @internal
 */
export function shrinkAll<U extends Tree<unknown>[]>(xs: U): Traversable<[...U]> {
    return zip(...xs.map((x) => x.children)) as unknown as Traversable<[...U]>
}

/**
 * @internal
 */
export function interleaveList<T>(axs: Tree<T>[], options: { minLength?: number } = {}): Tree<T[]> {
    const { minLength = 0 } = options
    return {
        value: axs.map((x) => x.value),
        children: applicative(() =>
            concat(
                ...[axs.length > minLength ? [interleaveList(axs.slice(0, minLength), options)] : []],
                // half first to dissect
                ...[Math.floor(axs.length * 0.5) > minLength ? [interleaveList(splitX(axs, 0.5), options)] : []],
                ...map(splits(axs), ([as, b, cs]) => map(b.children, (c) => interleaveList([...as, c, ...cs], options))),
                ...[axs.length > minLength ? map(splits(axs), ([as, , cs]) => interleaveList([...as, ...cs], options)) : []],
                // lazy(() => shrinkAll(axs))
            ),
        ),
    }
}
