import type { Tree } from '../../../algorithm/index.js'
import { mapTree } from '../../../algorithm/index.js'
import { applicative } from '../../../iterator/applicative/index.js'
import { concat } from '../../../iterator/concat/index.js'
import { map } from '../../../iterator/map/index.js'
import type { Arbitrary } from '../arbitrary/index.js'
import type { Dependent } from '../dependent/index.js'
import { dependentArbitrary } from '../dependent/index.js'

/**
 * @internal
 */
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

/**
 * @internal
 */
export function chainArbitrary<T, U>(a: Arbitrary<T>, f: (a: T) => Arbitrary<U>): Dependent<U> {
    return dependentArbitrary((context) => {
        return collapseArbitraryTree(mapTree(a.value(context), (x) => f(x).value(context)))
    })
}
