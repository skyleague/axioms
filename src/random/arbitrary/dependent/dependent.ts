import type { Tree } from '../../../algorithm/tree/index.js'
import type { Arbitrary } from '../arbitrary/index.js'
import { chainArbitrary } from '../chain/index.js'
import { arbitraryContext } from '../context/index.js'
import type { ArbitraryContext } from '../context/index.js'
import { filterArbitrary, mapArbitrary } from '../transform/index.js'
import { constantArbitrary } from '../transform/transform.js'

export interface Dependent<T> extends Arbitrary<T> {
    sample(context: ArbitraryContext): T
    random: (context?: ArbitraryContext) => T
    filter<S extends T>(f: (x: T, context: ArbitraryContext) => x is S): Dependent<S>
    filter(f: (x: T, context: ArbitraryContext) => boolean): Dependent<T>

    map: <U>(f: (x: T, context: ArbitraryContext) => U) => Dependent<U>
    chain: <U>(f: (x: T, context: ArbitraryContext) => Arbitrary<U>) => Dependent<U>
    constant: () => Dependent<T>
}

/**
 * @internal
 */
export function dependentArbitrary<T>(
    f: (context: ArbitraryContext) => Tree<T>,
    { supremumCardinality }: Pick<Dependent<unknown>, 'supremumCardinality'> = {},
): Dependent<T> {
    let localContext: ArbitraryContext | undefined
    const dependent: Dependent<T> = {
        sample: (context: ArbitraryContext) => f(context).value,
        value: (context: ArbitraryContext) => f(context),
        // biome-ignore lint/suspicious/noAssignInExpressions: This is a valid use case for assignment in expressions
        random: (context?: ArbitraryContext) => f(context ?? (localContext ??= arbitraryContext())).value,
        filter: <S extends T>(fn: (x: T, context: ArbitraryContext) => x is S) => filterArbitrary(dependent, fn),
        map: <U>(fn: (x: T, context: ArbitraryContext) => U) => mapArbitrary(dependent, fn),
        chain: <U>(fn: (x: T, context: ArbitraryContext) => Arbitrary<U>) => chainArbitrary(dependent, fn),
        constant: () => constantArbitrary(dependent),
        supremumCardinality,
    } satisfies Dependent<T>
    return dependent
}
