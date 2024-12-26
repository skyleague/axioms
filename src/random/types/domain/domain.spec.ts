import { arbitraryContext } from '../../arbitrary/context/context.js'
import { forAll } from '../../arbitrary/forall/forall.js'
import { xoroshiro128plus } from '../../rng/index.js'
import { domain, subdomain } from './domain.js'

import { describe, expect, it } from 'vitest'

describe('domain', () => {
    it('random sample', () => {
        const ctx = arbitraryContext({ rng: xoroshiro128plus(1638968569864n) })
        const aint = domain()
        expect(Array.from({ length: 10 }, () => aint.sample(ctx))).toMatchInlineSnapshot(`
          [
            "jb3bcog.f1e9.ery689quq.essgy",
            "l4h7nof.iiy3r2n.8lduccztq.e0z07wov9uj3.ha",
            "6f.tst-r7.5d4x8jp37.z2byq6pvk.nmanaq",
            "m8e7700cu6o.pd",
            "wi15dzbyd.7-70c4nz.ekpsdimabiqe",
            "ho7kew.k69r0w.ejgnnd",
            "erdya6rj.anb",
            "bzbc5z9-s.fbrgyeee7wg.gbt.eaxg",
            "a29st3ph9jef.dldywyn",
            "vs8mvs9g56k.pnt.iwbvpex",
          ]
        `)
    })

    it('random sample - xl', () => {
        const ctx = arbitraryContext({ rng: xoroshiro128plus(1638968569864n), size: 'xl' as const })
        const aint = domain()
        expect(Array.from({ length: 10 }, () => aint.sample(ctx))).toMatchInlineSnapshot(`
          [
            "jb3bcog.f1e9.ery689quq.essgy",
            "l4h7nof.iiy3r2n.8lduccztq.e0z07wov9uj3.ha",
            "6f.tst-r7.5d4x8jp37.z2byq6pvk.nmanaq",
            "m8e7700cu6o.pd",
            "wi15dzbyd.7-70c4nz.ekpsdimabiqe",
            "ho7kew.k69r0w.ejgnnd",
            "erdya6rj.anb",
            "bzbc5z9-s.fbrgyeee7wg.gbt.eaxg",
            "a29st3ph9jef.dldywyn",
            "vs8mvs9g56k.pnt.iwbvpex",
          ]
        `)
    })

    it('restricted', () => {
        const ctx = arbitraryContext({ rng: xoroshiro128plus(1638968569864n) })
        const aint = domain({ format: 'restricted' })
        expect(Array.from({ length: 10 }, () => aint.sample(ctx))).toMatchInlineSnapshot(`
          [
            "q3.cgfj1e.ery689qurm.ssgy",
            "qh7nofjtiy3r.nylduccztre-0.zwov9uj4ala8.bup.nylwvrc",
            "7p37.xbyq6pvlous.ty.m8e7700cu6p.pd",
            "015d.bd7u-70c4n.yekpsdima",
            "xrho.whdphj",
            "rxphojutef.vdya6rj.acwbzzbc.y-sf7brgyeee7.eeebngea",
            "a9.8t3ph9je.trf.5ulw5s8mvs9g5.gkdjnmiwbvp",
            "7t57bzjpxghv.qd",
            "pfk.4c.rioxpq",
            "0lwoh0e8bvo0p.gxhyoxl",
          ]
        `)
    })

    it('restricted - matches regex', () => {
        const aint = domain({ format: 'restricted' })
        const regex = /^([A-Z0-9][A-Z0-9\-]*\.)+[A-Z]{2,}$/i
        forAll(aint, (x) => regex.test(x))
    })
})

describe('subdomain', () => {
    it('random sample', () => {
        const ctx = arbitraryContext({ rng: xoroshiro128plus(1638968569864n) })
        const aint = subdomain()
        expect(Array.from({ length: 10 }, () => aint.sample(ctx))).toMatchInlineSnapshot(`
          [
            "trb3",
            "bo",
            "gj0",
            "efzry689qurm",
            "g1j-8mr4h",
            "6ofjth",
            "xr2n9ylduc",
            "ctre-0z06",
            "wv9uj3",
            "aa87b",
          ]
        `)
    })
})
