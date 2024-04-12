import { collect, sum } from '../src/array/index.js'
import { range } from '../src/generator/index.js'
import { map, replicate } from '../src/iterator/index.js'
import { xoroshiro128plus } from '../src/random/index.js'

import { expect, it } from 'vitest'

it('pi', () => {
    const rng = xoroshiro128plus(42n)
    const approxPi = (n: number): number =>
        (sum(
            replicate(() => {
                const x = rng.sample()
                const y = rng.sample()
                return x * x + y * y < 1 ? 1 : 0
            }, n),
        ) /
            n) *
        4

    expect(collect(map(range(3, 5), (x) => approxPi(10 ** x)))).toMatchInlineSnapshot(`
      [
        3.104,
        3.1392,
      ]
    `)
})
