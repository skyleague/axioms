import { domain, subdomain } from './domain.js'

import { collect } from '../../../array/index.js'
import { repeat } from '../../../generator/index.js'
import { take } from '../../../iterator/index.js'
import { arbitraryContext } from '../../arbitrary/context/context.js'
import { xoroshiro128plus } from '../../rng/index.js'

import { expect, describe, it } from 'vitest'

describe('domain', () => {
    it('random sample', () => {
        const ctx = arbitraryContext({ rng: xoroshiro128plus(1638968569864n) })
        const aint = domain()
        expect(
            collect(
                take(
                    repeat(() => aint.sample(ctx)),
                    10
                )
            )
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
                    10
                )
            )
        ).toMatchInlineSnapshot(`
          [
            "jb3bcogfj1e-fzry689qurmg01j-8mq.47nofjtiy3r2n8.xduccztre-0z07wov9uj.ala76bftprt",
            "q6zd4x8jp370x2byq6pvlousatbygm48e7700cu6pcwfox0i15dzbyd7u9.6c4n0-gpx1fmsbcnxgrhoo7kexko69r0xphojutefewrdx.arjebtcwbzzbc5z9-sf7brgyeee7wgggbujga9iaa929st3ph9jeftfq.e6-ulw5s8mvs9g56kpenusm7b5wg986t57bzjpxghvazek0qdfke5bco0nu8xyi.07lv",
            "he8bvo0psj8k-v8rl5b3cogfygz6lj77eyflf-3qizb1c0.jw389janvzlhudmt7rn2bd9gt7gfnrw.riikqm1sx",
            "g5of9qes9m0i-d1da44v9ocgsu9cvtrwu7ffcoceai6ksi6zdss7xb8n-j.vyh4sbpgb5.5cex8pfu80slut34434sf3i3nlbzo4clslih012.8dpfb6m",
            "axyahp1.mrptjms5dsphvsxt6po24i.u7v",
            "fo5ph0zc6ow8gftztf00rwk2.rn1z45hjstpn",
            "uyo1m4vkl87wxydjr9y7axcj78cc0qg84yl.bqyf4pd3m4lu2thowimpv.0xxf1pu6-gvym6kwrp.bu14",
            "xt4z.feonz9p1ueyddi4nar0n5kh0ljsu5q0akb4.z62be1kpw1q",
            "lek.o7wq7-th916fnmvo-q-otyb1tpnh6iwgfhn6t.dru",
            "joz0vqsuu.u5jsww127oda-16le9r8o2xia2yoso8wq3hhsmay.9usukoso6dfa6.9f-t2ge7okmp3u0anvw9v9q4zn57pk2dweuxavbywo5p2ymq.touidqra",
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
                    10
                )
            )
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
