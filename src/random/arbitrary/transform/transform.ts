import { mapTree, filterTree } from '../../../algorithm/tree'
import type { Arbitrary } from '../arbitrary'
import { makeDependent } from '../dependent'
import type { Dependent } from '../dependent'

export function mapArbitrary<T, U>(f: (x: T) => U, a: Arbitrary<T>): Dependent<U> {
    return makeDependent((context) => mapTree(a.value(context), f))
}

export function filterArbitrary<T>(f: (x: T) => boolean, a: Arbitrary<T>): Dependent<T> {
    return makeDependent((context) => {
        let generated
        // the initial value must be valid
        do {
            generated = a.value(context)
        } while (!f(generated.value))
        return filterTree(f, generated)
    })
}
