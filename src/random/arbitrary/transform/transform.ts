import { mapTree, filterTree } from '../../../algorithm/tree/index.js'
import { pruneTree } from '../../../algorithm/tree/tree.js'
import type { Arbitrary } from '../arbitrary/index.js'
import { dependentArbitrary } from '../dependent/index.js'
import type { Dependent } from '../dependent/index.js'

/**
 * @internal
 */
export function mapArbitrary<T, U>(a: Arbitrary<T>, f: (x: T) => U): Dependent<U> {
    return dependentArbitrary((context) => mapTree(a.value(context), f))
}

/**
 * @internal
 */
export function filterArbitrary<T>(a: Arbitrary<T>, f: (x: T) => boolean): Dependent<T>
export function filterArbitrary<T, S extends T>(a: Arbitrary<T>, f: (x: T) => x is S): Dependent<S>
export function filterArbitrary<T, S extends T>(a: Arbitrary<T>, f: ((x: T) => x is S) | ((x: T) => boolean)): Dependent<S> {
    return dependentArbitrary((context) => {
        let generated
        // the initial value must be valid
        do {
            generated = a.value(context)
        } while (!f(generated.value))
        return filterTree(generated, f)
    }) as Dependent<S>
}

export function constantArbitrary<T>(a: Arbitrary<T>): Dependent<T> {
    return dependentArbitrary((context) => pruneTree(a.value(context)))
}
