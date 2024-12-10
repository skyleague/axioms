import type { Tree } from '../../../algorithm/index.js'
import { memoize } from '../../../algorithm/memoize/memoize.js'
import { LRUCacheResolver } from '../../../algorithm/memoize/resolver.js'
import type { Arbitrary } from '../arbitrary/index.js'
import { chainArbitrary } from '../chain/index.js'
import type { ArbitrarySizeContext } from '../context/context.js'
import type { ArbitraryContext, BiasedArbitraryContext } from '../context/index.js'
import { arbitraryContext } from '../context/index.js'
import type { Dependent } from '../dependent/index.js'
import { filterArbitrary, mapArbitrary } from '../transform/index.js'
import { constantArbitrary } from '../transform/transform.js'

export interface Integrated<C, T> extends Arbitrary<T> {
    constraints: C
    sample: (context: ArbitraryContext) => T
    value: (context: ArbitraryContext, x?: T) => Tree<T>
    random: (context?: ArbitraryContext) => T
    shrink: (x: T) => Tree<T>
    filter<S extends T>(f: (x: T, context: ArbitraryContext) => x is S): Dependent<S>
    filter(f: (x: T, context: ArbitraryContext) => boolean): Dependent<T>
    map: <U>(f: (x: T, context: ArbitraryContext) => U) => Dependent<U>
    chain: <U>(f: (x: T, context: ArbitraryContext) => Arbitrary<U>) => Dependent<U>
    constant: (isConstant?: boolean) => Dependent<T>
}

/**
 * @internal
 */
export function integratedArbitrary<C, T>({
    sample,
    shrink,
    constraints,
    biased,
    supremumCardinality,
}: {
    sample: (constraints: C, context: ArbitraryContext) => T
    shrink: (constraints: C, x: T) => Tree<T>
    constraints: C
    biased?: (constraints: C, context: BiasedArbitraryContext) => C
    supremumCardinality?: ((context: ArbitrarySizeContext) => number) | undefined
}): Integrated<C, T> {
    let localContext: ArbitraryContext | undefined
    const biasedSample =
        biased === undefined
            ? sample
            : (lconstraints: C, context: ArbitraryContext) => {
                  const { bias } = context
                  if (bias !== undefined) {
                      const oldBias = context.bias
                      context.bias = bias
                      const biasedConstraints = biased(lconstraints, context as BiasedArbitraryContext)
                      const sampled = sample(biasedConstraints, context)
                      context.bias = oldBias
                      return sampled
                  }
                  const sampled = sample(lconstraints, context)
                  return sampled
              }
    const integrated: Integrated<C, T> = {
        constraints,
        sample: (context: ArbitraryContext) => biasedSample(constraints, context),
        value: (context: ArbitraryContext, x?: T) => shrink(constraints, x ?? biasedSample(constraints, context)),
        // biome-ignore lint/suspicious/noAssignInExpressions: This is a valid assignment
        random: (context?: ArbitraryContext) => biasedSample(constraints, context ?? (localContext ??= arbitraryContext())),
        shrink: (x: T) => shrink(constraints, x),
        filter: <S extends T>(fn: (x: T, context: ArbitraryContext) => x is S) => filterArbitrary(integrated, fn),
        map: <U>(fn: (x: T, context: ArbitraryContext) => U) => mapArbitrary(integrated, fn),
        chain: <U>(fn: (x: T, context: ArbitraryContext) => Arbitrary<U>) => chainArbitrary(integrated, fn),
        constant: (isConstant) => (isConstant ? constantArbitrary(integrated) : integrated),
        supremumCardinality:
            supremumCardinality !== undefined
                ? memoize(
                      supremumCardinality,
                      LRUCacheResolver({
                          key: (ctx) => `${ctx.size}:${ctx.depth}`,
                      }),
                  )
                : undefined,
    } satisfies Integrated<C, T>

    return integrated
}
