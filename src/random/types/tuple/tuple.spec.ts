import { tuple } from './tuple'

import { forAll } from '../../arbitrary/forall'
import { integer } from '../integer'

test('counter example - equal', () => {
    expect(() => forAll(tuple(integer(), integer()), ([a, b]) => a !== b, { seed: 42n })).toThrowErrorMatchingInlineSnapshot(`
        "Counter example found after 43 tests (seed: 42n)
        Shrunk 0 time(s)
        Counter example:

        [ 2147483645, 2147483645 ]"
    `)
})
