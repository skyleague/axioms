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
        "zb+c.v.io%.~h.z9^{|x4ys.%&n.{ry/k\`uuin2l@22n9yld.uc.yre-0zz.wnv8tj3ala76",
        "3x@tr76zd4x8jp2.7x2byq6pv.ntrat",
        "js-{g__%@c6pcwfow.015d.yy.7u9",
        "d-t#}iw7&.s0.e.9jzlu._ph7p._|z$8.kun42.ig.zf9b^0ng.2.7@ybc5z9-sf.brgxdee7vgg",
        "3.ka|n.b@1st3ph9jefte.q-5.9lw5s8l.v9g56kp.nts",
        "c=7j|{^3=_c.nx8kk5a!g.%xfi.g=be.$t4{8@i18l.vh0e8b.u0psj7.9u8rl",
        "+.v.i9.!=q._\`h9.rh.+yn#c&d%oz7+.|oau6!ql3es1.0t*ce|j2\`jh.07#0m.pzs@stg85of9q.d9m0i-d.0a3.39ocgsu8.vt",
        "3_iheudh.l.p0n^#f01_8b.u}o6g!k+0bwj.=.6cg7|xi4{$0@t34434s.fi3nlbzo4c.rlhhz",
        "0}fxib_syb.89.l.'sszw2.s0/.1x.518.^wv'/mj.\`6lhtv/@gzc6ow8ge.stf00rwk2.rn1z45hjstpn",
        "3!u&r-4.r{_6.!enz|9_a.eo_{dd%x.{-9.cqx9.-w@24lu2.gnvilov",
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
        "$z3t.+pz#26^=7{^f/'292*8f'3i$=vd9$-y5i6i$~#!|4my37lbh94r%m}uzn='u8.3!4md+rg9ee|d+3}p1vhru63_*+/i-3e{/\`fqnlnjzk*im^d-w|o}t'e{/g*'_|@sb3fbb9.eq0xhym3pk.sima.vl1d5pkj",
        "pwm0-$~m}+gcltu-bh5s~$3!s&.3/r%_^&c3bv\`&jq~394x2c.7/'$vf^l!3vivs.'$=k}|{{*&u%ck%4ek\`g&!_eo5/!s=~da|#jdqvt2.3=fw\`y3yybada1r0j$-ruzp#4aj.g#5^h=k'6.3n#.7=v|}emd3jpp$55al9#ltm+i7no2ca^y{%u{s3jm7\`1s_9*ga##b=5x&|s*=49h9.8\`mnz_+4l^--hsi!l8v8@o5il.mnjfplewda6.9d",
        "rkwn7e=qy++sqs'/'c7/f25otbs*=nnu6.y4^ee~dq^cmf_36!2mai8/fg5i*i7cen~uwe}0.%qaq^&^ub-$lowab/jla^qehyg4f'w6a{jz2igy5is0x9fga6rxdbx##*.3nx-vv8$e&f3+&iq7qrbt}b%vr|l-l7p'-.$7.j%~!}8u8n70n#g&l=y6u%%$l/6ay^oeh/ijp^7@e25qx59i.5ni0c.zouv.u0e5",
        "#11libjl0{-{$sjj0{av+i*h5m%{t}{.!es95pjian6~lne73|{9zy.t^}vg719!'*xiep~=|_eac}fa!42o*i67h&i3j.x$~l.2~=f88.1}5ff!}g#mz0$c7#@nfufv9.ydt9.zk79a0e.3xh31qqi",
        "jq96.7!%-q_k_i76hoybr~|mrr4_mp~'on8cr'3-'~9&_y|j/7.46x5ps-!z{p.sc2hx3l}i@5gx9.5vbu7fbh0f",
        "{0e_$iq|/e#y6$=5=09_$hoqe~hnja'0\`9.1pb5j6i45%zj.\`pfs==7xa3{*y#10/6l$7bga'.j/#6a%3g#xs}m8/4o}^##.w}_x2ua++0obh7v81df9m}_$48.k1y6mdh91mje{m!_fm.$%05ezdrctyym0u{.}!j&x60w6ql{p_7u20.s7~~w4pbn-29%=3e$07/~mt=y~}i1@rw0y-c.np8.zp79vvu0bdm.dxcd2.h84j1iuax1",
        "en!b!o_}w2rl5ucm|_!gj$3~6\`yj|^fr3x_c^mz-!_eq'g74e$.dt}/#th3'3-!2cax+'hnu3{&~og^{%9-|'v96{mgt2q3.g@fvxr7n.zomnes9wk.m8cz8hl0rdg.q82qhe.e7mldlc885j",
        "i5qgzxb0e9_!99s|h!600ml*10l$bpx0$71/-on63o\`wol8c^0r=s-9so\`\`7fe.^||^^3|/&4ku5s*{m1ko''udjo_wnu^um+~0#/&+3dh'$+ww'edg7&#~j%.fe*s_!&i%c*7k+s=@c4yur.hgr8hp61mict.ki1cc81",
        "-xet|d#1+f=z5_a|2h{c{{$xp5q#s%+zy+9t{d2\`p_#!.z^h&#8k%3ql}o.45xgmzx!tg4&}&ii%#uzc&|2'2}1t\`l3/#q!z\`+!og1*h~_sjpq&2sb.*euexr!b_{'m63~!5ancd^yfn=2+uw%~kmw6'^0zl9*&0psfn3.2j3p0np8c4tf*/l~ptf+45+@ikjncstw7c.zvfi03p6f.dakkxb6",
        "g^$z5j=i~_%v.6{2x4|$.1gn8{zum==z*emwk$\`g3*p}kc|'yl|1abc\`xhz}hjon5y5a9=rtru85m.x*/s{l~d=v\`3+*%x0&{o/8'%k_&g!vpv6##oc\`+%ig-hn.9*62ywei^ucn_3y98*mlnyaooh&jwq4*8htw0^ffpdiolu5~/4e@k0.f2g2pmm5ibu.6t.qk",
      ]
    `)
})
