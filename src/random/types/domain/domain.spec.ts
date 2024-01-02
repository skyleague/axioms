import { domain, subdomain } from './domain.js'

import { collect } from '../../../array/index.js'
import { repeat } from '../../../generator/index.js'
import { take } from '../../../iterator/index.js'
import { xoroshiro128plus } from '../../rng/index.js'

import { expect, describe, it } from 'vitest'

describe('domain', () => {
    it('random sample', () => {
        const ctx = { rng: xoroshiro128plus(1638968569864n) }
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
            "jb3bcogfj1e-fzry689qurmg01j-8l.qh7nofjtiy3r2n9ylduccztre-0z07wov9uj4ala87bfupst-r75.d3w7io27",
            "xbyq6pvlousatbygm48e7700cu6pcwfox0i15dzbyd7u-70c3.n-gpx1fmsbcnxgrhoo7kexko69r0xphojutefewrdya5.rebtcwbzzbc5z9-sf.brgxdee7vg",
            "gujg.8i",
            "a29st3ph9jeftfrf-6-ulw5s8mvs9g56kpenusm7b5wg986t57bzjpxghva.ek0pdfke",
            "bo0nu7.wih18lwoh0e8bvo0psj8k-v8rl5b3cogfygz6lj77ex.ff-3qizb1c1jrw389janv.khtcms6r",
            "2d9gt.7fnrxzsiikrm.sxsg74of8",
            "d9m0i-d1da44v9ocgsu9cvtrwu7ffcoce.a6ksi6zdss7xb8n.jveyh3rbpgb",
            "5cex8pfu80slut34434sf3i3nlbzo4clslih00.29dqgb7mqbdxyahp2mmrptjms5dsphv.st6po24igv7whfno5ph0zc6ow8gftztf00rwk38sn.z45hjstpn",
            "uyo1m4vkl87wxydjr9y7axcj78cc0qg84yl.bqyf4pd3m4lu2thowimo.0jwwf1p",
            "5gvym6kwrqjbv24mybt4zfueonz9p1ueyddi4nar0n5kh0ljsu5q0akb55z72.b2kpx2qjl.ek",
          ]
        `)
    })
})

describe('subdomain', () => {
    it('random sample', () => {
        const ctx = { rng: xoroshiro128plus(1638968569864n) }
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
            "trb3bcogfj1e-fzry5",
            "7qurmg01j-8mr4h7nofjtiy3r2n9ylduccztre-0z07wov9uj4ala87bfupr",
            "tr76zd4x8jp370x2byq6pvlousatbygm48e7700cu6pcwfox0i15dzbyd7u-6",
            "04n0-f",
            "p1fmsbcnxgrhoo7kexko69r0xphojutefewrdya",
            "5jebtcwbzzbc5z9-sf7brgyeee7wggg",
            "bjga9iaa929st3ph9jeftfrf-6-ulw5s8mv",
            "sg56kpenusm7b5wg986t57bzjpxghvazek0qdfke5bco0nu8xyih18lwoh0e",
            "7vo0",
            "pj8k-v8rl5b3cogfygz6lj77eyflf-3q",
          ]
        `)
    })
})
