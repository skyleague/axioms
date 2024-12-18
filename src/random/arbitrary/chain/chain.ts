import type { Tree } from '../../../algorithm/index.js'
import { mapTree } from '../../../algorithm/index.js'
import { applicative } from '../../../iterator/applicative/applicative.js'
import type { Arbitrary } from '../arbitrary/index.js'
import type { ArbitraryContext } from '../context/context.js'
import type { Dependent } from '../dependent/index.js'
import { dependentArbitrary } from '../dependent/index.js'

/**
 * @internal
 */
export function collapseArbitraryTree<T>(x: Tree<Tree<T>>): Tree<T> {
    return {
        value: x.value.value,
        children: applicative(function* () {
            yield* Iterator.from(x.children).map((c) => collapseArbitraryTree(c))
            yield* x.value.children
        }),
    }
}

/**
 * @internal
 */
export function chainArbitrary<T, U>(a: Arbitrary<T>, f: (a: T, context: ArbitraryContext) => Arbitrary<U>): Dependent<U> {
    return dependentArbitrary((context) => {
        return collapseArbitraryTree(mapTree(a.value(context), (x) => f(x, context).value(context)))
    })
}
