import { expect, it } from 'vitest'
import { arbitraryContext } from '../../arbitrary/context/context.js'
import { forAll } from '../../arbitrary/forall/forall.js'
import { xoroshiro128plus } from '../../rng/index.js'
import { cuidArbitrary } from './cuid.js'

it('random sample', () => {
    const ctx = arbitraryContext({ rng: xoroshiro128plus(1638968569864n) })
    const aint = cuidArbitrary()
    expect(Array.from({ length: 10 }, () => aint.sample(ctx))).toMatchInlineSnapshot(`
      [
        "c470c01622719b7aef68752bb",
        "cfe57d3e51252c7c5a41911b8",
        "c1fbabe96952850ee28678f7e",
        "cb1cae36c76707e69687080a2",
        "cde2eebb184066ab3d1a0a1e8",
        "ceb1d5bf26713015a7366e429",
        "c6ef7ba63255119710d741081",
        "c0bb01daf51802a12e9222084",
        "c0f300fcf5842422872fef849",
        "c7e598f2d241385e092fee8de",
      ]
    `)
})

it('random sample - xl', () => {
    const ctx = arbitraryContext({ rng: xoroshiro128plus(1638968569864n), size: 'xl' as const })
    const aint = cuidArbitrary()
    expect(Array.from({ length: 10 }, () => aint.sample(ctx))).toMatchInlineSnapshot(`
      [
        "c470c01622719b7aef68752bb",
        "cfe57d3e51252c7c5a41911b8",
        "c1fbabe96952850ee28678f7e",
        "cb1cae36c76707e69687080a2",
        "cde2eebb184066ab3d1a0a1e8",
        "ceb1d5bf26713015a7366e429",
        "c6ef7ba63255119710d741081",
        "c0bb01daf51802a12e9222084",
        "c0f300fcf5842422872fef849",
        "c7e598f2d241385e092fee8de",
      ]
    `)
})

it('is a valid cuid', () => {
    forAll(cuidArbitrary(), (x) => /^c[^\s-]{8,}$/i.test(x))
})
