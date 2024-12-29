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
            "q3b.ofj1e.ery689qurmg.sgyxiluew",
            "ftiy2.19ylduc.rn",
            "9z07wov9uj3.l86.dn",
            "tr76zd4x8jp37z.2yp.kohjnmanaqe",
            "7770.c6pcwfox0.svcr",
            "du-70c4n0-gpx0.ima",
            "xrhoo.hdphjwylrpk",
            "itefewrdx.vm",
            "acwbzzbc5.8sf7brgyeee7wg.ebn",
            "aiaa929st3ph9j.ffrf-6-ul.umxiomye",
          ]
        `)
    })

    it('restricted - matches regex', () => {
        const aint = domain({ format: 'restricted' })
        const regex = /^([A-Z0-9][A-Z0-9\-]*\.)+[A-Z]{2,}$/i
        forAll(aint, (x) => regex.test(x))
    })

    it('restricted - matches regex 2', () => {
        const aint = domain({ format: 'restricted' })
        const regex = /^(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i
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
