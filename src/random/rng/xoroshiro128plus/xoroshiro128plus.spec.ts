import { xoroshiro128plus } from './index.js'

import { collect, sum } from '../../../array/index.js'
import { take } from '../../../iterator/index.js'

import { expect, it } from 'vitest'

it('snapshot', () => {
    expect(collect(take(xoroshiro128plus(42n), 20))).toMatchInlineSnapshot(`
      [
        709760481641776491n,
        557825853539905235n,
        2354335986390784554n,
        4764471007882174552n,
        1141755080207815033n,
        1811776429005235015n,
        4926252089440045533n,
        9296832162079764153n,
        10510485367197315043n,
        2843902929848529530n,
        12359677783782539607n,
        14507805741195319434n,
        14487903866241610959n,
        5236492039943889652n,
        17204685869287292792n,
        11098939294094473909n,
        14091961735161232611n,
        6648371229950501176n,
        11766514613272883133n,
        15683996026540909352n,
      ]
    `)
})

it('jump', () => {
    const gen = xoroshiro128plus(42n)
    gen.jump()
    expect(collect(take(gen, 20))).toMatchInlineSnapshot(`
      [
        4575205303074301362n,
        1313241623868421872n,
        10687392359352382818n,
        10604473673132761465n,
        5876227826185476935n,
        300134177991720197n,
        11012762315796943116n,
        9764536677352454177n,
        18016403774890539771n,
        8527627735788094445n,
        8551503506240815924n,
        1549258175561325657n,
        16316765354552111523n,
        629115321048986328n,
        11576815416208247903n,
        2130054061456031878n,
        2882751030295929465n,
        10907262350408094309n,
        2687896168807844063n,
        8674772588912354460n,
      ]
    `)
})

it('sample', () => {
    const gen = xoroshiro128plus(42n)
    expect(gen.sample()).toMatchInlineSnapshot('0.03847619280701853')
    expect(gen.sample()).toMatchInlineSnapshot('0.03023980011382721')
    expect(gen.sample()).toMatchInlineSnapshot('0.12762880956028455')
    expect(gen.sample()).toMatchInlineSnapshot('0.2582824908745027')
    expect(gen.sample()).toMatchInlineSnapshot('0.0618946669203837')
})

it('[0,1) interval', () => {
    const gen = xoroshiro128plus(BigInt(new Date().getTime()))
    const total = 50000
    let mean = 0
    const vals: number[] = []
    for (let i = 0; i < total; ++i) {
        const val = gen.sample()
        vals.push(val)
        mean += val / total
    }
    expect(vals.every((v) => v >= 0 && v < 1)).toBe(true)
    const variance = sum(vals.map((v) => (v - mean) ** 2 / total))
    expect(Math.abs(variance - 1 / 12)).toBeLessThan(0.001)
    expect(Math.abs(mean - 0.5)).toBeLessThan(0.01)
})
