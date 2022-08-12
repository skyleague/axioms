import type { Tree } from '../../../algorithm'
import { applicativeTree } from '../../../algorithm'
import type { Arbitrary } from '../arbitrary'
import type { ArbitraryContext, BiasedArbitraryContext } from '../context'
import { makeContext } from '../context'

export interface Integrated<C, T> extends Arbitrary<T> {
    constraints: C
    sample: (context: ArbitraryContext) => T
    value: (context: ArbitraryContext, x?: T) => Tree<T>
    random: (context?: ArbitraryContext) => T
    shrink: (x: T) => Tree<T>
}

export function makeIntegrated<C, T>({
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
    return {
        constraints,
        sample: (context: ArbitraryContext) => biasedSample(constraints, context),
        value: (context: ArbitraryContext, x?: T) =>
            applicativeTree(shrink(constraints, x ?? biasedSample(constraints, context))),
        random: (context?: ArbitraryContext) => biasedSample(constraints, context ?? (localContext ??= makeContext())),
        shrink: (x: T) => shrink(constraints, x),
    }
}
