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
              "cwdxqcsdakk5yn6.r0hnzkit6x3n12y-7xwch-nhru9-ubeonyh22cf.et7luewfsv2z1nxkzpfqebkuhlaxusc5d.cawbfk47p7",
              "xyn-ev5jcodekzspt8id0syg0rcsj162-k4rkyj29.qvmoq2l83mb4xy2k4xlmns5806dh-y5d8hz44gcq5ddowub25e3i9j7zn6ca7.p5xibwobtcc5me1wnt2rabry-rcll5-wx.tmm7tdr",
              "xt8x57fyxl3r.pq11p",
              "ionkpco527.5yls.0haomsf8ej",
              "e1k5xsm8mhdvx-qtxbzkfoal09j0lkfjk3yrva85-ie1x0bgevmx9-rp5y8.p0epveflcygklgw1zfwy8f16yqkfpyeib6953ock01x.ybj",
              "7jcao4jzxr3r8j8a379xm8pw593eitr5vabl2.3xnt9ewzb7ni.h97j",
              "em3nhl9cyh3uy3q2vwxp8aimw176snv27c8dt94v6aru8zbr5ydl.2k2np8ulzrvlkbf3u1yk8j15zbmh2izk1w75w2he9d4no1kf5esa1f.mfz7dg1saj0tvb-1.0e4tu",
              "z28p-8yay0um4m2atxjord-e5bssg4.z28y-a1-ji7hld67yxt6qzhqefvep.wjndrddr3777vcisj7tk.s09oxbmv",
              "oyoz6i9w9bb26qwdm4ltetsa6uorn2czzd7llbnpejpp41i17y8d.4tl0-cbd19js7thtsgcdjgn8d0g7q3ks948bmfce.60aqu-iucbs4wx0qzwra455b8kbzyo2fc1ln3.e753v4oyp",
              "j-q-3b1rmi9ze34vkai7ku9m7c6dbe769hlafu-3.fw9sunm",
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
              "zhwdxq",
              "cdakk5yn7sx0hnzkit6x3n12y-7xwch9",
              "nru9-ubeonyh21",
              "cett7luewfr",
              "uz1nxkzpfqebkuhlaxusc5d4cawbfk58p82yxyn-ev5jcode",
              "jspt8id0syg0rcsj162-k4rkyj2-r-vmoq2l83mb4xy1",
              "kxlmns5806dh-y5d8hz44gcq5ddowub25e3i9j7zn6ca8qt5xibv",
              "ntcc",
              "4e1wnt2rabry-rcll5-wyt",
              "tm8ueriygt8x57fyxl3slp",
            ]
        `)
    })
})
