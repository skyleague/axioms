import type { Tree } from '../../../algorithm/tree'
import type { Arbitrary } from '../arbitrary'
import { makeContext } from '../context'
import type { ArbitraryContext } from '../context'

export interface Dependent<T> extends Arbitrary<T> {
    sample(context: ArbitraryContext): T
    random: (context?: ArbitraryContext) => T
}

export function makeDependent<T>(f: (context: ArbitraryContext) => Tree<T>): Dependent<T> {
    let localContext: ArbitraryContext | undefined
    return {
        sample: (context: ArbitraryContext) => f(context).value,
        value: (context: ArbitraryContext) => f(context),
        random: (context?: ArbitraryContext) => f(context ?? (localContext ??= makeContext())).value,
    }
}
