import { tuple } from './tuple'

import { collect } from '../../../array'
import { repeat } from '../../../generator'
import { take } from '../../../iterator'
import { forAll } from '../../arbitrary/forall'
import { xoroshiro128plus } from '../../rng'
import { integer } from '../integer'

test('counter example - equal', () => {
    expect(() => forAll(tuple(integer(), integer()), ([a, b]) => a !== b, { seed: 42n })).toThrowErrorMatchingInlineSnapshot(`
        "Counter example found after 43 tests (seed: 42n)
        Shrunk 0 time(s)
        Counter example:

        [ 2147483645, 2147483645 ]"
    `)
})

test('random sample', () => {
    const ctx = { rng: xoroshiro128plus(1638968569864n) }
    const aint = tuple(integer(), integer())
    expect(
        collect(
            take(
                repeat(() => aint.sample(ctx)),
                10
            )
        )
    ).toMatchInlineSnapshot(`
        [
          [
            921604357,
            -1817301679,
          ],
          [
            -1226565061,
            511147728,
          ],
          [
            -1723568135,
            552579827,
          ],
          [
            -207009089,
            -1857613535,
          ],
          [
            15946192,
            -1697006873,
          ],
          [
            -2043076968,
            -877591174,
          ],
          [
            -922310816,
            1497140825,
          ],
          [
            694728922,
            -522685001,
          ],
          [
            1749221268,
            -20192102,
          ],
          [
            524553386,
            935778478,
          ],
        ]
    `)
})
