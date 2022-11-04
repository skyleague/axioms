import type { Tree } from '../../../algorithm/tree'
import type { Arbitrary } from '../arbitrary'
import { chainArbitrary } from '../chain'
import { arbitraryContext } from '../context'
import type { ArbitraryContext } from '../context'
import { filterArbitrary, mapArbitrary } from '../transform'

export interface Dependent<T> extends Arbitrary<T> {
    sample(context: ArbitraryContext): T
    random: (context?: ArbitraryContext) => T
    filter: (f: (x: T) => boolean) => Dependent<T>
    map: <U>(f: (x: T) => U) => Dependent<U>
    chain: <U>(f: (x: T) => Arbitrary<U>) => Dependent<U>
}

export function dependentArbitrary<T>(f: (context: ArbitraryContext) => Tree<T>): Dependent<T> {
    let localContext: ArbitraryContext | undefined
    const dependent = {
        sample: (context: ArbitraryContext) => f(context).value,
        value: (context: ArbitraryContext) => f(context),
        random: (context?: ArbitraryContext) => f(context ?? (localContext ??= arbitraryContext())).value,
        filter: (fn: (x: T) => boolean) => filterArbitrary(dependent, fn),
        map: <U>(fn: (x: T) => U) => mapArbitrary(dependent, fn),
        chain: <U>(fn: (x: T) => Arbitrary<U>) => chainArbitrary(dependent, fn),
    }
    return dependent
}
