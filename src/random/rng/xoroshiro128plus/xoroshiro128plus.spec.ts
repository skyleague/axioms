import { xoroshiro128plus } from '.'

import { sum, collect } from '../../../array'
import { take } from '../../../iterator'

test('snapshot', () => {
    expect(collect(take(xoroshiro128plus(42n), 20))).toMatchInlineSnapshot(`
        Array [
          17588299989574477559n,
          16434512596789117038n,
          7942322027046763999n,
          13301974987989830442n,
          3020458451031399491n,
          580273706755399157n,
          76377905802520908n,
          7427733099182947649n,
          8497765639435273716n,
          1072139577910028995n,
          10560078220679967055n,
          1626388854571583670n,
          5309664724278612392n,
          11912926025937456230n,
          15277841369755218290n,
          8935692774928434984n,
          6286614284202692358n,
          2577164289242456935n,
          6778310846192456449n,
          17346511196439760728n,
        ]
    `)
})

test('jump', () => {
    const gen = xoroshiro128plus(42n)
    gen.jump()
    expect(collect(take(gen, 20))).toMatchInlineSnapshot(`
        Array [
          6921508229568972135n,
          15531501889178088198n,
          6876877104398742747n,
          14946047638621290925n,
          10339376136649391157n,
          13969680445080017518n,
          8867762093628696210n,
          5982046976469177580n,
          18116138145394955161n,
          3742924706997984547n,
          2242623033690228570n,
          14373146630811260219n,
          4568795128589666712n,
          13489964443816129807n,
          15197412548441946273n,
          3919003543438182477n,
          15839270335514578427n,
          17247969546591234609n,
          14188685069230220007n,
          12885497229932771550n,
        ]
    `)
})

test('sample', () => {
    const gen = xoroshiro128plus(42n)
    expect(gen.sample()).toMatchInlineSnapshot(`0.9534636529511711`)
    expect(gen.sample()).toMatchInlineSnapshot(`0.8909167130589575`)
    expect(gen.sample()).toMatchInlineSnapshot(`0.43055413981517876`)
    expect(gen.sample()).toMatchInlineSnapshot(`0.7211015090163208`)
    expect(gen.sample()).toMatchInlineSnapshot(`0.1637393807255222`)
})

test('[0,1) interval', () => {
    const gen = xoroshiro128plus(BigInt(new Date().getTime()))
    const total = 50000
    let mean = 0
    const vals = []
    for (let i = 0; i < total; ++i) {
        const val = gen.sample()
        vals.push(val)
        mean += val / total
    }
    expect(vals.every((v) => v >= 0 && v < 1)).toBe(true)
    const variance = sum(vals.map((v) => Math.pow(v - mean, 2) / total))
    expect(Math.abs(variance - 1 / 12)).toBeLessThan(0.001)
    expect(Math.abs(mean - 0.5)).toBeLessThan(0.01)
})
