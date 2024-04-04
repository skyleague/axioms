import { mapTree, filterTree } from '../../../algorithm/tree/index.js'
import { pruneTree } from '../../../algorithm/tree/tree.js'
import type { Arbitrary } from '../arbitrary/index.js'
import type { ArbitraryContext } from '../context/context.js'
import { dependentArbitrary } from '../dependent/index.js'
import type { Dependent } from '../dependent/index.js'

/**
 * @internal
 */
export function mapArbitrary<T, U>(a: Arbitrary<T>, f: (x: T, context: ArbitraryContext) => U): Dependent<U> {
    return dependentArbitrary((context) => mapTree(a.value(context), (v) => f(v, context)))
}

/**
 * @internal
 */
export function filterArbitrary<T>(a: Arbitrary<T>, f: (x: T, context: ArbitraryContext) => boolean): Dependent<T>
export function filterArbitrary<T, S extends T>(a: Arbitrary<T>, f: (x: T, context: ArbitraryContext) => x is S): Dependent<S>
export function filterArbitrary<T, S extends T>(
    a: Arbitrary<T>,
    f: ((x: T, context: ArbitraryContext) => x is S) | ((x: T, context: ArbitraryContext) => boolean)
): Dependent<S> {
    return dependentArbitrary((context) => {
        let generated
        // the initial value must be valid
        do {
            generated = a.value(context)
        } while (!f(generated.value, context))
        return filterTree(generated, (v) => f(v, context))
    }) as Dependent<S>
}

export function constantArbitrary<T>(a: Arbitrary<T>): Dependent<T> {
    return dependentArbitrary((context) => pruneTree(a.value(context)))
}
