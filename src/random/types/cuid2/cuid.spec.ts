import { expect, it } from 'vitest'
import { arbitraryContext } from '../../arbitrary/context/context.js'
import { forAll } from '../../arbitrary/forall/forall.js'
import { xoroshiro128plus } from '../../rng/index.js'
import { cuid2Arbitrary } from './cuid.js'

it('random sample', () => {
    const ctx = arbitraryContext({ rng: xoroshiro128plus(1638968569864n) })
    const aint = cuid2Arbitrary()
    expect(Array.from({ length: 10 }, () => aint.sample(ctx))).toMatchInlineSnapshot(`
      [
        "9g1t12e659q4z4ohnvxyfkgc",
        "qq9zxbgu7wdd58i7nshrdyna",
        "k22ojg4zpopwmdlyj9t0b0xw",
        "5jfhjzgxvo3tmx8esxpns1of",
        "fladjh0j1n6ctx4wwqp2jve2",
        "4dmq8qu3o1o3xkzwq2tdpz5f",
        "q4ch12cn6h7dewa4maewyhpm",
        "6d8kj454lh3n0vh940i2m1op",
        "2voyzi5w1h6n344xl6661j96",
        "y800yryiite7y945j4g4zvzj",
      ]
    `)
})

it('random sample - xl', () => {
    const ctx = arbitraryContext({ rng: xoroshiro128plus(1638968569864n), size: 'xl' as const })
    const aint = cuid2Arbitrary()
    expect(Array.from({ length: 10 }, () => aint.sample(ctx))).toMatchInlineSnapshot(`
      [
        "9g1t12e659q4z4ohnvxyfkgc",
        "qq9zxbgu7wdd58i7nshrdyna",
        "k22ojg4zpopwmdlyj9t0b0xw",
        "5jfhjzgxvo3tmx8esxpns1of",
        "fladjh0j1n6ctx4wwqp2jve2",
        "4dmq8qu3o1o3xkzwq2tdpz5f",
        "q4ch12cn6h7dewa4maewyhpm",
        "6d8kj454lh3n0vh940i2m1op",
        "2voyzi5w1h6n344xl6661j96",
        "y800yryiite7y945j4g4zvzj",
      ]
    `)
})

it('is a valid cuid2', () => {
    forAll(cuid2Arbitrary(), (x) => /^[0-9a-z]+$/.test(x))
})
