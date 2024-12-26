import { arbitraryContext } from '../../arbitrary/context/context.js'
import { xoroshiro128plus } from '../../rng/index.js'

import { expect, it } from 'vitest'
import { forAll } from '../../arbitrary/forall/forall.js'
import { email } from './email.js'

it('random sample', () => {
    const ctx = arbitraryContext({ rng: xoroshiro128plus(1638968569864n) })
    const aint = email()
    expect(Array.from({ length: 10 }, () => aint.sample(ctx))).toMatchInlineSnapshot(`
      [
        "yb+c.u.ho%.~h.z8^{|x3yr.$%n.{ry/k\`tuin1l@22n9yld.uc.yre-0zz.pjoynguahaxw",
        "3w@tr76zd4x8jp2.7x2byq6pv.jnman",
        "js-{g_\`$@c6pcwfow.015d.yy.woy",
        "d-t#}iw6%.rz.e.8jzlu._oh6p._|z#7.kun32.ig.zf8b^zng.1.6@ybc5z9-sf.aleqcddwoee",
        "2.ja|m.b@1st3ph9jefte.q-5.9lw5s8l.v9g56kp.jnm",
        "c=6j|{^2=_c.mw7jk4a!g.$xei.g=bd.$s4{7@i18l.vh0e8b.u0psj7.yoxlh",
        "+.v.i8.!=p._\`g9.qh.+xm!c%d$oz6+.|nat59pl3es1.zt*ce|i2\`jh.z7#0m.oyr@stg85of9q.d9m0i-d.0a3.39ocgsu8.on",
        "3_iheudh.l.pzm^!f00_8b.t}o5g9k-0bwj.^.5cg7|wh3{#z@t34434s.fi3nlbzo4c.mhffr",
        "0}fxib_ryb.78.l.*sryv1.r0=.0w.518.^vu&/mj.\`6lhtu/@gzc6ow8ge.stf00rwk2.mjsrvwfgmnkj",
        "29u%r-4.q{_6.9enz|9_a.eo_{dd$x.{-9.cqx9.-w@24lu2.ejpfiko",
      ]
    `)
})

it('random sample - xl', () => {
    const ctx = arbitraryContext({ rng: xoroshiro128plus(1638968569864n), size: 'xl' as const })
    const aint = email()
    expect(Array.from({ length: 10 }, () => aint.sample(ctx))).toMatchInlineSnapshot(`
      [
        "yb+ceujho%g~h!z8^{.x3yrj$%n~{ry/k\`tuin1l8*z&t|8pf4ed!2yg~#9#\`6u5}3n-aqa{\`bi3wz2}y.^!f-7{nv*\`#8*c9x^w5qu20a2b9js-{g_\`$$d3^vd6hu7$m%/f!c9f\`3~\`$.-t#}i.6%hrzces8jzluu_oh6pu_|z#7vku.32hig6zf8b^zngb1.6c!!b.=!|~1._bzi8fgg\`5.ijc2oja|mab.&}01+vl|ngi2hyh~^}2q6/z{r50}i=^owgt20s\`c=6j|{^2=_c!mw7jk4a!go.xeipg=bdu$s4{79lk%\`q6ul#g\`b4v$w0n{p~4|zq/c+dvii.j!=pn_\`g9iqh~+xm!c%d$oz6+\`|nat59pl3es1\`zt*.e|i2.jhtz7#0mloyr&181i\`/ui}yf0|r$m~f%fa--4|udi12|c52z53_iheudhbl.pzm^!f00_8b{t}o5g9k-0bwjb^^5cg7|wh3{#zq31*--+-0h*m+tqc#u.dq0qlk#%+0}fxib_rybf78alw*sryv1nr0=f0wl5182^vu&/mj4\`.lhtu/vk#9d^v5{ih1#2h##z6o+\`0t%!=_kn12xu@uyo1m4u.j87wx.yi.yqwapbg",
        "dd$xi{-9rcqx9i-we*r/p3*1ku6lrv5$o77h%w3^}j49s_p6yxnc4&/r8c1-.h2hut!|w$4h8efm/saz#s=pk#pn03/x#bpc//#\`*cg&pw.&xnqagov4\`6w_~1k|%^hsr5u}x}u19c$2vtl=m6jh.t^2eez4&ogu##.x03447=o065%*_ufb}%^qg}y\`v&8mb*9v0u{6x.kk0rb!~k313pu0u^fia_}%i~1*jg\`uprw*2$bt46|5|x-!s=\`wo&.6g37a4.96./w*9rx32u4mfy0b2mdb_y#ffhr.hdi9^h}^ncgqoq/tm.yf\`-aw95e-js\`.un7!+\`.n#by!at^v\`1-l14.##!8c5i9jn8plnsmtagvhi921}v=0&o98$il9/6jjy%$%d-m.3.lmml{\`c=m#$c*azxk60.2p_bsb~9*5nkzi*7%_p=ue~*n$0ur8sxjw#a\`qu}p94_/*w82bya~&q~v+q|}cng.p#}+/9bkvz3hf^_kg5\`{3tnmb%{3nh}|+7!4y7rjk$%lc_#*ru%./=xi%r^nax25/qra0p~t/*su=scs*wbb0d2a/|lx{s-y\`a1/5^yin+2qk%xyi/y.c_nso%ybp=+|}h$2^r9wl}*%4fk6braf^br{=cxa215j2.s7s//8%_tfg0px*mv_0kki^v.0!x+u!d8^v9g_p/0|r6{5g|}_1{d=.1^vctyd6d-!p9t*tjy8t=#*qvefqbl&cyb3nqjstq98s}^*v_r^{88xke=.lk2m&u3e/mg6&0r{h%1zh1\`~wsp2yqlvxke{jqjo*qat_5a.o7lp\`\`fou3j-95{8bi{u/3knt}~tso04j21e|7d}7x-mmsv=\`k*!/.cyl~&g+!t7!p~8f#i%3~$s*hi&zc%+9^.#&+rk$rx7mhyz_uq5.c8zxnq83j{&+yyuk=d3+!~k|#^qzwe5p13stswc+xoj$$6w~}nnrw.j\`+|#-s!&#-r@hqq87333.6126g.45rv8i1zp.2lcu-un8uzly.kwwjrk",
        "#y3s.+oy!15^=6{_f/&182*7f&3i$=vd8$-x5i5h$~!!|4mx37lbg83q$m}uyn=&u7.393md-rg9ee|d+3}p0uhqt53_*+/i-3e|/\`fqnkmjyj*im^d/v|o}s&e{/g*&_|@sb3fbb9.eq0xhym3pk.sima.ohtcwkhg",
        "%nok~p*0{#0q\`13~~8nxa-#{h/e.pa!c-lhbf\`j&&kh-_m3d/col4an6*71|pnsixt-1=*9j19z!.&c1a!z!740|/g2rz*_yc*-m0hgk/qni.nh{{o}3n4urgv5+e}17q-dmjj3*.!d4ej*pf/_{v!z+5+\`vl9=cphhkpuvhn78r}z+5ec7#$5vp|=2&-rub.upi6*2n=p3\`1}+#}}{%%l2tt~d1&jz^#rn^_b_*e{#vg2f9#y*g!}|.gk~2r{j*1q7%17n#36-i+5n{$wmy}3u~-l&~x3crme4\`_\`p~e+w.%hh#gcj\`+5ca|rb__ajz8c_&p^p4rn_}3$_uj10evvl.kvwc&6t6ij1w8}6*i.03m~k+-90lhg!#azrl3x/_!joku|}kfs*-^t+3ec\`i\`gg{tn%ajh~v.ixovt16v{9\`ojgd#r!2o8qdc5x$|+}0ylaftb+x_q{b8o5ds#2s%9aqlet1}9ll1.trzm.g=98d=7.bjkh}u}fxh@rfwa8.yy1wv710ab.c5.du",
        "{wj\`mjxyx3~l7ti9r22d2j5n*cg8.s_w5+1kovd%b9mhlpjh9t6pv6e.b2-^.n_5b9d+hbl9gsh/g+0|0g942w+iz4a3bx0bryg5lx&/*+b_y#kr$#~a{ob.|gxeq^#o-=#ta}}6xz{z=4slt9a8l__4%hdf2nk3*~e~vsi~wp&mkc.!bc|1h2zf\`kctqu4q9wlso97y2*w-pn/dias84&|1/5\`}-w{r9o0g*s#2-gj3.{t0{\`b*!htyj~oyc*o&x6/+syi238/3wluim6oy%lhnybg_c-7.|kut/x3c$%t%-n_}ba{3gj#dcb-$.b%nb+ge3zv9zl^#_r^mb!f3*kg+jd~qo{qxk8.t!u~$m=/1i9|$owulb6f{s$tqp3^!w\`{p$5z3.n%/}tj^bf=-rj=e~06~i\`2c*%a0j*$a#6t-r%c#a+zlei~n!&jb3-xc\`5!8.\`av95{3=zfj64x={ad+4%ox35dc^.+jb~4lm%4.8ans$p32s3ow-c%~s_9e$r6g0}7!ayma8*s.4{wu4gn&iw2!vr-kr1h\`k}!9!\`by7p.\`/365ip^j0^5&#9$yyz_dw.&5qq6m4pcfgvl=xp4#1r%b_m#j|wsitoc$59/8f#/c~i=w|^||os|=xjl.-kq^v=uy38.verxk7%s_m|x6x0.|u4eof\`qf1ow=b#$p#z0d~q^-.09xtzts2^vzgkc2&f37&}pq.x.2h.xgh-y$um7~7qff6.1|r{-\`2=2=zj=m&%k&mxur8y~ce{%}qrb+|u\`=8\`!7v1&bcjqxm|$$04~ju7k9t.k7r//}fbj&~ck0a#ly&au/_tdezr~ok/b9l6p+q17yg04/_~+}^w43.bwyu1f+#ioe%!n6k!\`6\`z-p1im1-l=9jr^rr09=f=i-q}e@b1.iq3r.x1p255bf.kud.bkrsfpfiyqj",
        "sx_2vn#rz#.s\`#i$n-dsxmonx}77^9w._o*sf-y|#j*l+s=$9em!6.e#d~|zdk539wvgq+4fg&oek0p#nvw.|csfx&91*7~_mpx9ad+!%iee-a7/!q7!*0%gt$.j|2_3kh07t6&\`e4foe5ei^/~d$rnb/}*{h.&5j92xs!phjuiq0a}{4rqzd~y4rs81h^#$jwj_/d&p/f3i.r&}/**z}.p72#zzh&0%y_!0y0*~mq00dh9!+~~&d\`0ku8s590muyev93f.$z#s/^/!zqefhr6.ae5vv~s0hpi|tp9|c_c87!!7%m=.3vm0oeo89%nz=%01}9659e7wj!lnb|r*%0$2ox$^c9h!o!k8j7u.v=*s554i_^.{+{mdfe{+8$jhj=$%9ujlrn65dw$uk1b-r&ontecg&o}m~hki%5cuawb89.36nx%}tkd#2-9dts#\`yq~4a0u\`!!*ao*0+ur8}\`.\`#usec~kee2bk0$c8mx85ninyar5^0n_tgv+sy6#4^j%ie_.3$%$s-/52&.}il}4+|tzk_4a299ch-#/47%xb1sy}9{qdzkrqxcs$*5%97^q#ii%c/4{+gz07d%.\`woitk2#&u11%&7a-l$a&+}x7=okhm9hdjagp.igsl$+fal|z*$nbj#!c|gwa^v*p1ux-vtj+0.+*{or4oa~i0f=6p357\`$56u!6.u\`~\`qw-*ew755ppn!tqdjg^i9ge-d!}8~evou+5cxfy5g.1a3f/137v#\`5!e^{k8cd/o91$zwytrim{pv8~\`n@0zu.wfp7srsca.vxqyruuvnj",
        "/2xrhgesm4{p+i14-.aa5m3a&33z5{*_0#b%=z+8.!be$yd\`*/7zwr-{57ir%k_$&.6gj1d-/!bxb\`9h%!t&f^7%u%6c=!chjn-db|+!\`cl{w{y+exn_fkzvx|r.ow~0*\`.v.ls^xv&2%7m3#^b~}w10.8^595q\`|h+0#\`/et%~p|/eyen{-cijy/$4ua{~x+ipkejq0/pb0y{bx.76y&1=$_|%070\`dl-sd!8g.gx%|hq5+w5$5zk4kdcc9/lzk+my6\`-xd}.c.ev_rm/+rk9!1+{a6m|$yz_g!=0dkrt+u%m|{nb2afj4bh.67#zw^8qn_5lkb4#=|_{!wh=bu72e766-7m-j9_2#2.o=r4-q*6s#539s=3rs_~+kus*6.lwt3j.|z46jf3m%p.1-*}xk&e6uja0$km4qwhtxm9il++#.!qomtcgmwugb5h2j3nq+hh/!*rl%-zg8zs\`9m/#rf!$~}d_$df5r1s$5ybygw$+%.1xqw$%~gmn+_v&0q9i2j&8s&^erus/e{mkho333f*\`3{{~/m-s*7}1tlc6!%9.x$ktj-jvg!n2=~dlhf1d_~y_gkcelkzn!c92wx|*me8=jy31nc~r4fl0.$4~!5b0&m{q8^z.q\`\`2b$cw}/k+%mxzev~$+/^g5~+9\`e-%{se-4nx|f3.hf^=r+_%wz\`b00*9qt4\`pj}+r^=_blo|.4m/f!n~04z/8ny/w-qh--|/x2#txc3r/hpe$nfcc~zx\`2y1h|c=1a~dw*f5_d&kl@7aht82mq.vpc2q.wm",
        "*g~ohlq1dis4.41&3cc&t*qr4{5o_hyz!{a8*}u{+ty.tc-6w5ul&qp.g25bvs0_4^1~nbu4}.la9_wsprldi\`.b}dft5{jpyv.%6zvzz$|!+b1$/&x6qw^aaora=8ze+nhzeivg}w3!f93&+0^/k.h##40gh$ngy|0=3y!3m^}.0w/i{v%\`=~gw+8u8adbngsi&ju&k{%++nah4f6-!oo_%lj.y6krb{^0+s^#|2zr_dpg^\`=la2|=r/5n*5^0!s.ninok^hckv$6-t9o9|a*hsh8^g7!!_-rctvv&3|w}%t^!ptdp#3w.|p+1xb2q07#ruh9&fr/a-64g5xpv!a2|z2gkgvj07b%e$5%pa{6.%j1!2=0yavjifdoe05=.+0-5ol86{xex{#\`j8ll4p./^nxa~~.3!rsd}!-w}-1|}\`rv/x37__-r|oji0~0w~v1~r3cku|n|0ugd*e$zqyd.131b_e1e!^j&2/a#k3g830fd1ii1+bl6ae*{2u0!!&/=g|885\`5x\`!25ka8nou9{.zky/lnkzk!b4ov6/mc|o-~r$d.uu=#=2+wq3m~97~~{.x05mw6k%v+/1^ma8~1x^/9yc{e~qa.|^#qlb5oql#bcu8!vduor|8h7/8a.82t#*2y^}8.m|5%yzyxosza1uc&16u$d^e6t.at\`41#1u|_m=fs$fos0z^jlq2z!vw|~2a_+k$=or0s}f^2v+!b4{vr~7q.lvfx00d+-6n\`t~y}86!|_e&m2~l.+m@m9dpicb.09xt2fge.np",
        "_bta2id|lk8y_le24.a=bzs=ysw7c\`w*%mh37q|ml}3r.gq6.pb/s%j2.*s8qvvjj|jix35*7pbk2g^*j9f=siaj~+.ncrfe2gsuc0rr\`n}0!2a9gzozc%ua%vj0b$j1n&nu.4jt7$lvm#0ob+uh{-ipt9l~k2qingywj\`0qe-avl&3%~x3_omz8|#%ep_2.d~+q1h}_th2~5v#w-d838\`afhchw4aitmqwfd&t9xz*8^^5|on#!abylb}30w.$p3xk2ti=nbqz{by5^8e={j7-*34a_{w&_|57e-7is6h9zfe^\`jraf}^nip\`k.{dx3e$\`1$eh#}-s3yc72du#rkg1v_7d0f*ckv3dtz$|4qe{|9*-#y-kk~*z-r7}.teap~#6+#5|6n~k=tcd{!^{\`b_001*7o^vc*+}5.8i1jj=4hj\${1y5^*.u1f*y9!6a4m!d$/&hzga|_s7av/6s+svpu|\`.01-^h/5&46/.d035pb_ilmy$vb{9a$i5=1prgk}}cx^a{4}#i}kv.|390d16~mmp6|qo5y+4g/9himj8a.5&iz7iuw-o|eolt&w_ler/mmsokipzs.}&#ip$&a966g*1x/8al5d$}{&@4fvvgfvs.hitvvyuenk",
        "pwmz/$~m}+gcltu/bh4r~#29s%.2/r$_^&c2bu\`%jp~283x1c.6/&#vf^l93uhvs.*#=k}||{*&u$ck$3ej\`g&9_en5/9s=~da|!jdpus2.2=fw\`y3yybada1rzj#-quzp!4aj.f!5^h=j*5.2n#.7^u|}emd3jpo#45al8!ltm+i6mo2ca_y{$u{s2jl7\`0s_8+ga!!b=4x%|s*=39h8.7\`mny_+3l^-/hri9l7v7@o5il.mnjfplewda6.yc",
      ]
    `)
})

it('restricted', () => {
    const ctx = arbitraryContext({ rng: xoroshiro128plus(1638968569864n) })
    const aint = email({ format: 'restricted' })
    expect(Array.from({ length: 10 }, () => aint.sample(ctx))).toMatchInlineSnapshot(`
      [
        "ksb6bdp@je-fzry689.nliess",
        "h_opgjviz5t@8lduccztr.9z07wov9uj.aa87b.tst-r76.cupxgktwr",
        "5b0r9qxm@rt.xm48.wws",
        "cw9qcyfpz@0dzbyd7u-70c.n-gpx1fmsb.mgrhoo7ke.hjwylrpk",
        "pjw@fwr.x6.jbt.pb",
        "1bc81-.uf@ryee.7gggbujga.ia.1st3ph9jeftfr.ywy",
        "my7t+nx@f6kpenusm7b5.g86t57bzjpxgh.aek0qdfke5.bj",
        "ow+z0ii3_@n0e8.u0psj8.yoxlh",
        "c5cpggzg18l@7yf.f3qizb1c1jrw3.xgajoqhfncim",
        "to5cd-gv_gf@wsiikrm2sy.g5of9qes9m0i-.sca",
      ]
    `)
})

it('restricted - matches regex', () => {
    const aint = email({ format: 'restricted' })
    const regex = /^(?!\.)(?!.*\.\.)([A-Z0-9_'+\-\.]*)[A-Z0-9_+-]@([A-Z0-9][A-Z0-9\-]*\.)+[A-Z]{2,}$/i
    forAll(aint, (x) => regex.test(x))
})
