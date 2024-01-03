import type { Tree } from '../../../algorithm/index.js'
import { applicativeTree } from '../../../algorithm/index.js'
import type { Arbitrary } from '../arbitrary/index.js'
import { chainArbitrary } from '../chain/index.js'
import type { ArbitraryContext, BiasedArbitraryContext } from '../context/index.js'
import { arbitraryContext } from '../context/index.js'
import type { Dependent } from '../dependent/index.js'
import { filterArbitrary, mapArbitrary } from '../transform/index.js'

export interface Integrated<C, T> extends Arbitrary<T> {
    constraints: C
    sample: (context: ArbitraryContext) => T
    value: (context: ArbitraryContext, x?: T) => Tree<T>
    random: (context?: ArbitraryContext) => T
    shrink: (x: T) => Tree<T>
    filter<S extends T>(f: (x: T) => x is S): Dependent<S>
    filter(f: (x: T) => boolean): Dependent<T>
    map: <U>(f: (x: T) => U) => Dependent<U>
    chain: <U>(f: (x: T) => Arbitrary<U>) => Dependent<U>
}

/**
 * @internal
 */
export function integratedArbitrary<C, T>({
    sample,
    shrink,
    constraints,
    biased,
}: {
    sample: (constraints: C, context: ArbitraryContext) => T
    shrink: (constraints: C, x: T) => Tree<T>
    constraints: C
    biased?: (constraints: C, context: BiasedArbitraryContext) => C
}): Integrated<C, T> {
    let localContext: ArbitraryContext | undefined
    const biasedSample =
        biased === undefined
            ? sample
            : (lconstraints: C, context: ArbitraryContext) => {
                  const { bias } = context
                  if (bias !== undefined) {
                      return sample(biased(lconstraints, { ...context, bias }), context)
                  }
                  return sample(lconstraints, context)
              }
    const integrated = {
        constraints,
        sample: (context: ArbitraryContext) => biasedSample(constraints, context),
        value: (context: ArbitraryContext, x?: T) =>
            applicativeTree(shrink(constraints, x ?? biasedSample(constraints, context))),
        random: (context?: ArbitraryContext) => biasedSample(constraints, context ?? (localContext ??= arbitraryContext())),
        shrink: (x: T) => shrink(constraints, x),
        filter: <S extends T>(fn: (x: T) => x is S) => filterArbitrary(integrated, fn),
        map: <U>(fn: (x: T) => U) => mapArbitrary(integrated, fn),
        chain: <U>(fn: (x: T) => Arbitrary<U>) => chainArbitrary(integrated, fn),
    }

    return integrated
}
