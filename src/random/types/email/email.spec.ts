import { collect } from '../../../array/index.js'
import { repeat } from '../../../generator/index.js'
import { take } from '../../../iterator/index.js'
import { arbitraryContext } from '../../arbitrary/context/context.js'
import { xoroshiro128plus } from '../../rng/index.js'

import { expect, it } from 'vitest'
import { email } from './email.js'

it('random sample', () => {
    const ctx = arbitraryContext({ rng: xoroshiro128plus(1638968569864n) })
    const aint = email()
    expect(
        collect(
            take(
                repeat(() => aint.sample(ctx)),
                10,
            ),
        ),
    ).toMatchInlineSnapshot(`
      [
        "ozc-cev@f1e9.yrx",
        "|}y4zsk%'o.@l4h7nof.iiy3r2n.8lduccztq.e0z07wov9uj3.la",
        "{bi4x03~z{_$@38jp370x.byp5pvkntr",
        "3@xm3.e660zct5ocwe",
        "8%m'=@yy.7u9",
        "%d/t$~jx8&h@rc.mgrhoo7ke.ko68rzwo",
        "un4@eev.rya.5jebtcw.yz",
        "d@y-sf7brgyeee.7gggbujg.aiaa929st3ph.8eft.qe9",
        "~3r7=0|s62~@4kpenusm7b4.g875t46b",
        "nx9kk6a#g@0dfke4.bo.mu7wyih07",
      ]
    `)
})

it('random sample - xl', () => {
    const ctx = arbitraryContext({ rng: xoroshiro128plus(1638968569864n), size: 'xl' as const })
    const aint = email()
    expect(
        collect(
            take(
                repeat(() => aint.sample(ctx)),
                10,
            ),
        ),
    ).toMatchInlineSnapshot(`
      [
        "ozc-cevjio&g.h#0!_|}y4zsk%'o.{sz/k{u@ftix.22n9yld.ccytqe9z",
        "%{8v6~4o/ara|{bi4x03~z{_$f-8|nw+{%9*c!y_x6qu@rt.bgm48e770.zt.ocwenw0i04d",
        "c#f{4.{%d/t$~jx8&hs0cet9j0lvv\`ph8pv\`}0%8wkun@tfe.vdya6rj.es.wb",
        "$bd^#}.2i\`b0j9ghg{6jjjc3oka}nab}*~12-wl}ohi3h@e6-ulw5s8mvs.855.pents",
        "\`c^7j}|_3=\`c#nx9kk6a#gp@pfk.ebco0nu8xyi.h8lwoh0e8b.o0psj7k9",
        "}0r=c+dvji9j#^qo\`{h!irh.-yn$c'd&o07+{}@avzlht.ct7rm.bc8gt7genr",
        "$1mmpzs*292j{=vi~zg2}s%m.f'fa--6}udj23}d@twu7ffc.ne.a6kr.5ydr",
        "\`9b{u~o6h#k-1bxjb^_7cg8|xi4|%0r42@334sf3i3nlb.z4clsl.h012.rdqgb7mqbdxx.hp",
        "sszw2ns1=f1xl6293_wv'/mj5{7liuv=wk$#d_w7|jh2$3i%%0@j8sn1z56hj.sqotuuy.nm4vkl87wx.dir8x6awc",
        "\`|dd%yj|/!rcqy!i/@dm4lu2thov.ipw1j.wf1pt59g",
      ]
    `)
})
