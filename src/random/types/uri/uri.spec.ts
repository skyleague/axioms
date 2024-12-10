import { expect, it } from 'vitest'
import { arbitraryContext } from '../../arbitrary/context/context.js'
import { xoroshiro128plus } from '../../rng/index.js'
import { uri } from './uri.js'

it('random sample', () => {
    const ctx = arbitraryContext({ rng: xoroshiro128plus(1638968569864n) })
    const aint = uri()
    expect(
        Iterator.from(Array.from({ length: 10 }, () => aint.sample(ctx)))
            .take(10)
            .toArray(),
    ).toMatchInlineSnapshot(`
      [
        "https://q3.bo.fj0y",
        "http://59qurmg01j-7.l4h7nof.iiy3r2n.xkduccytqe9zwnv8tj3ala",
        "https://bup.r-r76zd.38jp370x.2y.5pvknt:1082",
        "https://m8e7700cu6o.we:4137504",
        "http://bd7u-70c3.n-gpx1fmr.bm.grhno6kew",
        "https://rxphojute.fwr.da6rjebtc.wy.bc5y89sf6",
        "http://de7.vgg.bjga9ia.813oh8j",
        "http://tre.59tlv4r7lvs8kpentsm6b",
        "https://g86t57bzjpxg.gazek0qd.fe5bc.zmu7wy",
        "https://loh0e8bu.opsj8k-v8r.lb3cogfygz5.k77e.flf92qizb",
      ]
    `)
})

it('random sample - xl', () => {
    const ctx = arbitraryContext({ rng: xoroshiro128plus(1638968569864n), size: 'xl' as const })
    const aint = uri()
    expect(
        Iterator.from(Array.from({ length: 10 }, () => aint.sample(ctx)))
            .take(10)
            .toArray(),
    ).toMatchInlineSnapshot(`
      [
        "https://q3.bo.fj0y/x578p/qmg00j/7lq4h6nnfi/hx2r1/8xkd/ccytqe/zyz6wnv8tj/ala76bftp/t9q75/d3w7io2/zx2byp5pvk/trat//gm37e66/zct5ocw/n/0i04dy//d7u960c/nz9fpw0em/bcmxg/hno6k/w/o68/zwogn/ut/f/v/dxa5r/ea/cwbyz///y89sf6brg/dee7vgg/b/jga8i///18ss3oh8je/t/q/9/9tlv4r7lv/8f45k/ents/6b4/g875t4/byipwggva/ek0pdfk/4///zmu7/yih07l/nhze7b/o0psj7/9u8/l4b2c/ffxg/5kj67ex/l/9/qizb0c0j/w278j//vykh/cms6rm/bc8gt7ge/rwzr/ik/m1sxs/7/of8qds8l0/9d/da33v8nc/s/8cvtr/t6ffcn//a/5k/i5ydr/6xa7n/jveyh3rbpg//5vbew8pfu/zrlts23323/f2i2n/bzn/ckrlhhz0/r8dpfb6m/adxxa/p1/mqo/imr4d/phvsx/5oo14",
        "http://uwhfno5ph0zc.ov7gesztfzz:403807rn1z45h/st/ntut/n0l3ujl/6vxydir8x6//cj67cc/pg73xlb/pxf/pd2l3ku2s/nv/lo/0jwwf1/t59g/ym5kwq/jbu1/lxbs3zfte/my8p/uexddi4m//zm4kh/kjrt4qz//b44/62be1kp/1qjlae/ou6",
        "https://6th916fnmvo9.potyb1tpnh6i.gehn5tdd:37721en/zvqsuuu/4jrwv1/6nda915l/8/7o1xi//xoso7wq3/hr/ay9/us/korn5d/a/90f9s2ge6/klp2/0anuw/v8p3ym57oj/dwetwaub/vo4p1yl/ttou/dq/aticb/qzddfljfc/x/f95jbelkl/nihqd63ap/vc3gm7c/jwy2/ijzaqyan5o/s3hsu0zzyx//fxgjxk/jm/na/o/f/ts8o4r1/yx/fhx4wggq/00c3iauk/ii/77//izzb2arph/r9tk6a/a9x/vjhrg2w0/k4nd92j0s/mxmp/pz//kn9kyu641p/taqa91l/o2k89bie2k/824ybgo/tfd56/ev/7unjia07tj/8/2wyuqwlgh0/hc6z2ln0/45pf0l5iaq/v4lma/k9n42/o4m//2pa//cta38/p7/3q7//4v5qf/3t/h0p/f4qzb/jmj1qak42",
        "https://eu6myph92.0dhwamad.5l.7bqattvgtnm.m44x16ndp2i/6shg/5/qryp/oycx5oxe/k3r7lv7ve/96s7c56s5o//qcv//ykym2ngq/n5z1lod/l//1b/bujlg/nlx/m952o6l/7xxqhd50i/ti/nud4iew1/l7f1s/es69p/ktq/hop/c7/k/k/lan6va3j/hk76dj/ug3x/7xaf7o/tgin89nmj/ugtsd/wc9wq3iimo/6h2z3rbqh/1e3ymwyk9x/z/0/9zm1ef/rb02y5jz/2mh0lpwi/q/6okv3//rqilxug/12qqnh4cu3/9h8z5lr/dvks",
        "https://npb3p.j10w.99jjlo38z3my1z3m/hwpp762336/016/4z/qu7i0yp28/ct9/n7tyky/p56n/pcczqtm/3kqzsv54w7/d41sxt2wd/tfz4ocxz/qvfvfz9yy/uiqtwhaexu/0i9/qj51/w8ty/ic3lex",
        "http://82.9ksoelnv:593294f3td746/l/hi/q/2f/5c/o8j9m1c74/2/68ussb2f///e2qzwgxm2p/shi/auv/1d5/kjop/jjh9k2r7/rl7st99/jpa3z7e/d0kayb3he//6/11/f3/iuc4bkhua/w2/s8kjmf/n3s5/xgsxryr1//ayryw/s84etl/26qb2/ireeg4ljg/je77/8uj/nleov2//sxl3ciggu2/ycucg2kd4/7oyr3v37o/x4//efh/oof/wx/8r2/cbwz0v/k84t/3lnb4okf/1tj4ku/s82z88700h/nn9cs1/r/zlj56b51c/zoetdyzq2e/882eg9t/7g2/lw0sw/zu/3g3vj7/oiq8un93/19/ubli//666k9c/px0eezeb/6/vba8ma66//rx//1k5kumi68/06ogsr//ohjh/ob1w/wfgs",
        "http://93g4sui9.h4zshfez0a.riuq4.ygjhn89hdm23ucb/f6ee7nj0ag/9/9fqk/nsvo/x7jgeczlyt/xkc//qz829r/hadnb/p6l7axjv//ztm/yalhdns8/hhsbnlr/de/xxc5wfagh/8/8eqe/rkfwa8/3x0wu70/abca5de/3p7pg6igp/pt9hw/fymt/ctgvj/bexom6pv/shjoc0by/fh/gfy/wko/dbbt35/j5vaxc2ea/ye/e4e/r8sexutp/fruaubqs//qev/q1/23b6qzhmz/9a7kb48/p/k/zj35zna98/pr7r4u/hnx//h66u0ec/t/gu/9d9omg9p/1ig//yab8sftrd7/bm/oul/pimjywq/2p3kj/cfamxu18s/v683p7lyk/e2mzt/egu17ns76//yfnqg9jq//j1pw43mq/t/x4uphn/i/kq0iej/ae6b3/p8hom4q/bz0n03/69///uegzcba3zu//jb3eduro/rh5z6l5/az/t/he3gc9lj/lqhxunzn90/44/fx80k/nhbv/7",
        "http://nku6y.p8l0wsu7j159.n6bd.3mg5c9rw9f6:2613arg10azw/3l1//a3ridf9/z1/b/3qb6vy/p7aoyv7/5rdgwu/47ac/v0kqtvcb/e2gb9uhi0/txaim0/utm/jp3b09/6yd/lwer8wy//iax2m/u7pnu/j/fptyom3h/se6/8y/y6bqwkm/4uvvfk5gr5/1zx0qq/6cp51/llwiuk//e/h4qk/zsl1b6/zg/pmfnjbzvx4/dz4b9f4/8588/m84/ghf3/k5/4nqt/hodlqhw/m6i8qwpr/8ouc/d6/dsj/4bz0/zrs//l53mryqnrn/t5o/egct1/t/18klap//fhpee/q0niw9wld/w/s8l736t4t5/g4i11/1i/olxq/bd719lla28/64x7/wos1abg/pi8/0su9gnw/xn/hwl349dbg/9bhsaziq/an46nccr/9jh/axhvk2lsw/esu46/295puuzbpq/sd3z/j//yjwhy7w6",
        "http://kgis4i4.yl5.lsy5d.54l.d5bb1ijq2rxu55bfkdud/bpz1hvim9/nzfmp5t/jzlq/lm6zgzi/cmpijjp8w/5ypl6j/md3q8zg2/2m/0xciyvqcz//8rchvuxpoe/3ud/1/dhs/zjo/v8bm/p/xs2w95ik/yac3/0fcc3aw/ylxy2r0en/sg8t6th/r/mw17cvd/dvd/5/9czlia491/ez1vgytpmy/egn/l/a87ul/rc9/ummxs/5/0gpg64c/k4dufem1/422r80kwtz/rf1r0/6ysqs/9ilsscfx/3991c7s/nx",
        "http://yjorcpy.ui0.rm564zrld.flw:933oo9mre/f8n/x8b/bxxyyw0i5/toirkdjx/0jr40ss/xwvydwpgyh/a8/20s",
      ]
    `)
})
