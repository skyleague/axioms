import type { Tree } from '../../../algorithm/tree/index.js'
import type { Arbitrary } from '../arbitrary/index.js'
import { chainArbitrary } from '../chain/index.js'
import { arbitraryContext } from '../context/index.js'
import type { ArbitraryContext } from '../context/index.js'
import { filterArbitrary, mapArbitrary } from '../transform/index.js'

export interface Dependent<T> extends Arbitrary<T> {
    sample(context: ArbitraryContext): T
    random: (context?: ArbitraryContext) => T
    filter<S extends T>(f: (x: T) => x is S): Dependent<S>
    filter(f: (x: T) => boolean): Dependent<T>

    map: <U>(f: (x: T) => U) => Dependent<U>
    chain: <U>(f: (x: T) => Arbitrary<U>) => Dependent<U>
}

/**
 * @internal
 */
export function dependentArbitrary<T>(f: (context: ArbitraryContext) => Tree<T>): Dependent<T> {
    let localContext: ArbitraryContext | undefined
    const dependent = {
        sample: (context: ArbitraryContext) => f(context).value,
        value: (context: ArbitraryContext) => f(context),
        random: (context?: ArbitraryContext) => f(context ?? (localContext ??= arbitraryContext())).value,
        filter: <S extends T>(fn: (x: T) => x is S) => filterArbitrary(dependent, fn),
        map: <U>(fn: (x: T) => U) => mapArbitrary(dependent, fn),
        chain: <U>(fn: (x: T) => Arbitrary<U>) => chainArbitrary(dependent, fn),
    }
    return dependent
}
