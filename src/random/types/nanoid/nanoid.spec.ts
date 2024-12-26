import { expect, it } from 'vitest'
import { arbitraryContext } from '../../arbitrary/context/context.js'
import { forAll } from '../../arbitrary/forall/forall.js'
import { xoroshiro128plus } from '../../rng/index.js'
import { nanoidArbitrary } from './nanoid.js'

it('random sample', () => {
    const ctx = arbitraryContext({ rng: xoroshiro128plus(1638968569864n) })
    const aint = nanoidArbitrary()
    expect(Array.from({ length: 10 }, () => aint.sample(ctx))).toMatchInlineSnapshot(`
      [
        "hu2P25pb9hL7_8IuFUYZr",
        "tlbKLg_XltRcWnoafxeFO",
        "NnYFj6A54Iyt7-JHJWDoB",
        "zgQ1k1XW2azrvy_tWUI6P",
        "XfpOWJFN2GsUqBjoyv1x2",
        "bmQX8VWKK4zUq3D8oEKeL",
        "6H2H6Wz-WK4QnJ_arDL8l",
        "24mFbudopVh8DipVZuJEq",
        "ofzy8a7Cu6G1Tug71x4D3",
        "I24THZ-w9V1uaF787WCaa",
      ]
    `)
})

it('random sample - xl', () => {
    const ctx = arbitraryContext({ rng: xoroshiro128plus(1638968569864n), size: 'xl' as const })
    const aint = nanoidArbitrary()
    expect(Array.from({ length: 10 }, () => aint.sample(ctx))).toMatchInlineSnapshot(`
      [
        "hu2P25pb9hL7_8IuFUYZr",
        "tlbKLg_XltRcWnoafxeFO",
        "NnYFj6A54Iyt7-JHJWDoB",
        "zgQ1k1XW2azrvy_tWUI6P",
        "XfpOWJFN2GsUqBjoyv1x2",
        "bmQX8VWKK4zUq3D8oEKeL",
        "6H2H6Wz-WK4QnJ_arDL8l",
        "24mFbudopVh8DipVZuJEq",
        "ofzy8a7Cu6G1Tug71x4D3",
        "I24THZ-w9V1uaF787WCaa",
      ]
    `)
})

it('is a valid nanoid', () => {
    forAll(nanoidArbitrary(), (x) => /^[a-z0-9_-]{21}$/i.test(x))
})
