import type { Tree } from '../../../algorithm'
import { mapTree } from '../../../algorithm'
import { applicative } from '../../../iterator/applicative'
import { concat } from '../../../iterator/concat'
import { map } from '../../../iterator/map'
import type { Arbitrary } from '../arbitrary'
import type { Dependent } from '../dependent'
import { makeDependent } from '../dependent'

export function collapseArbitraryTree<T>(x: Tree<Tree<T>>): Tree<T> {
    return {
        value: x.value.value,
        children: applicative(
            concat(
                map(x.children, (c) => collapseArbitraryTree(c)),
                x.value.children
            )
        ),
    }
}

export function chainArbitrary<T, U>(a: Arbitrary<T>, f: (a: T) => Arbitrary<U>): Dependent<U> {
    return makeDependent((context) => {
        return collapseArbitraryTree(mapTree(a.value(context), (x) => f(x).value(context)))
    })
}
