import { domain, subdomain } from './domain.js'

import { collect } from '../../../array/index.js'
import { repeat } from '../../../generator/index.js'
import { take } from '../../../iterator/index.js'
import { arbitraryContext } from '../../arbitrary/context/context.js'
import { xoroshiro128plus } from '../../rng/index.js'

import { describe, expect, it } from 'vitest'

describe('domain', () => {
    it('random sample', () => {
        const ctx = arbitraryContext({ rng: xoroshiro128plus(1638968569864n) })
        const aint = domain()
        expect(
            collect(
                take(
                    repeat(() => aint.sample(ctx)),
                    10,
                ),
            ),
        ).toMatchInlineSnapshot(`
          [
            "jb3bcog.f1e9.ery689quq.g00j9",
            "l4h7nof.iiy3r2n.8lduccztq.e0z07wov9uj3.la",
            "6f.tst-r7.5d4x8jp37.z2byq6pvk.tratbx",
            "m8e7700cu6o.we",
            "wi15dzbyd.7-70c4nz.fpw0emrbcmxg",
            "ho7kew.k69r0w.gniute",
            "erdya6rj.asc",
            "bzbc5z9-s.fbrgyeee7wg.gbt.ga8i",
            "a29st3ph9jef.eqe959t",
            "vs8mvs9g56k.pnt.m6b4wg8",
          ]
        `)
    })

    it('random sample - xl', () => {
        const ctx = arbitraryContext({ rng: xoroshiro128plus(1638968569864n), size: 'xl' as const })
        const aint = domain()
        expect(
            collect(
                take(
                    repeat(() => aint.sample(ctx)),
                    10,
                ),
            ),
        ).toMatchInlineSnapshot(`
          [
            "jb3bcog.f1e9.ery689quq.g00j9",
            "l4h7nof.iiy3r2n.8lduccztq.e0z07wov9uj3.la",
            "6f.tst-r7.5d4x8jp37.z2byq6pvk.tratbx",
            "m8e7700cu6o.we",
            "wi15dzbyd.7-70c4nz.fpw0emrbcmxg",
            "ho7kew.k69r0w.gniute",
            "erdya6rj.asc",
            "bzbc5z9-s.fbrgyeee7wg.gbt.ga8i",
            "a29st3ph9jef.eqe959t",
            "vs8mvs9g56k.pnt.m6b4wg8",
          ]
        `)
    })
})

describe('subdomain', () => {
    it('random sample', () => {
        const ctx = arbitraryContext({ rng: xoroshiro128plus(1638968569864n) })
        const aint = subdomain()
        expect(
            collect(
                take(
                    repeat(() => aint.sample(ctx)),
                    10,
                ),
            ),
        ).toMatchInlineSnapshot(`
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
