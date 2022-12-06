import { mapTree, filterTree } from '../../../algorithm/tree'
import type { Arbitrary } from '../arbitrary'
import { dependentArbitrary } from '../dependent'
import type { Dependent } from '../dependent'

/**
 * @internal
 */
export function mapArbitrary<T, U>(a: Arbitrary<T>, f: (x: T) => U): Dependent<U> {
    return dependentArbitrary((context) => mapTree(a.value(context), f))
}

/**
 * @internal
 */
export function filterArbitrary<T>(a: Arbitrary<T>, f: (x: T) => boolean): Dependent<T> {
    return dependentArbitrary((context) => {
        let generated
        // the initial value must be valid
        do {
            generated = a.value(context)
        } while (!f(generated.value))
        return filterTree(generated, f)
    })
}
