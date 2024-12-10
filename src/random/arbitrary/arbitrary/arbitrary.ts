import type { Tree } from '../../../algorithm/tree/tree.js'
import { zip } from '../../../array/zip/zip.js'
import { applicative } from '../../../iterator/applicative/applicative.js'
import type { Simplify } from '../../../types.js'
import type { ArbitraryContext, ArbitrarySizeContext } from '../context/context.js'
import { splitX, splits } from '../shrink/shrink.js'

export interface Arbitrary<T> {
    value: (context: ArbitraryContext) => Tree<T>
    supremumCardinality?: ((context: ArbitrarySizeContext) => number) | undefined
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
    const allShrunk = shrinkAll(xs).map((x) => interleave(...x))
    let first: IteratorResult<Tree<unknown>> | undefined
    let second: IteratorResult<Tree<unknown>> | undefined
    return {
        value: xs.map((x) => x.value),
        children: applicative(function* () {
            if (first === undefined) {
                first = allShrunk.next()
            }
            if (second === undefined) {
                second = allShrunk.next()
            }

            if (!first.done) {
                yield first.value
            }

            for (const [as, b, cs] of splits(xs)) {
                for (const c of b.children) {
                    yield interleave(...as, c, ...cs)
                }
            }

            if (!second.done) {
                yield second.value
            }
        }),
    } as Tree<{ [K in keyof U]: U[K] extends { value: infer Value } ? Value : never }>
}

/**
 * @internal
 */
export function shrinkAll<U extends Tree<unknown>[]>(xs: U): IteratorObject<[...U]> {
    return zip(...xs.map((x) => x.children)) as unknown as IteratorObject<[...U]>
}

/**
 * @internal
 */
export function interleaveList<T>(axs: Tree<T>[], options: { minLength?: number } = {}): Tree<T[]> {
    const { minLength = 0 } = options
    return {
        value: axs.map((x) => x.value),
        children: applicative(function* () {
            if (axs.length > minLength) {
                yield interleaveList(axs.slice(0, minLength), options)
            }

            // half first to dissect
            if (Math.floor(axs.length * 0.5) > minLength) {
                yield interleaveList(splitX(axs, 0.5), options)
            }

            for (const [as, b, cs] of splits(axs)) {
                for (const c of b.children) {
                    yield interleaveList([...as, c, ...cs], options)
                }
            }

            if (axs.length > minLength) {
                for (const [as, , cs] of splits(axs)) {
                    yield interleaveList([...as, ...cs], options)
                }
            }

            // lazy(() => shrinkAll(axs))
        }),
    }
}
