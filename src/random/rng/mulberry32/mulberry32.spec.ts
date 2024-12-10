import { expect, it } from 'vitest'
import { mulberry32 } from './index.js'

it('snapshot', () => {
    expect(mulberry32(42).take(20).toArray()).toMatchInlineSnapshot(`
        [
          0.6011037519201636,
          0.44829055899754167,
          0.8524657934904099,
          0.6697340414393693,
          0.17481389874592423,
          0.5265925421845168,
          0.2732279943302274,
          0.6247446539346129,
          0.8654746483080089,
          0.4723170551005751,
          0.24992373422719538,
          0.8820588334929198,
          0.7457375649828464,
          0.3070015134289861,
          0.19725383794866502,
          0.5007294877432287,
          0.6866120179183781,
          0.6106208984274417,
          0.003842951962724328,
          0.47078192373737693,
        ]
    `)
})

it('jump', () => {
    const gen = mulberry32(42)
    gen.jump()
    expect(gen.take(20).toArray()).toMatchInlineSnapshot(`
        [
          0.6011037519201636,
          0.44829055899754167,
          0.8524657934904099,
          0.6697340414393693,
          0.17481389874592423,
          0.5265925421845168,
          0.2732279943302274,
          0.6247446539346129,
          0.8654746483080089,
          0.4723170551005751,
          0.24992373422719538,
          0.8820588334929198,
          0.7457375649828464,
          0.3070015134289861,
          0.19725383794866502,
          0.5007294877432287,
          0.6866120179183781,
          0.6106208984274417,
          0.003842951962724328,
          0.47078192373737693,
        ]
    `)
})

it('sample', () => {
    const gen = mulberry32(42)
    expect(gen.sample()).toMatchInlineSnapshot('0.6011037519201636')
    expect(gen.sample()).toMatchInlineSnapshot('0.44829055899754167')
    expect(gen.sample()).toMatchInlineSnapshot('0.8524657934904099')
    expect(gen.sample()).toMatchInlineSnapshot('0.6697340414393693')
    expect(gen.sample()).toMatchInlineSnapshot('0.17481389874592423')
})

it('[0,1) interval', () => {
    const gen = mulberry32(new Date().getTime())
    const total = 50000
    let mean = 0
    const vals: number[] = []
    for (let i = 0; i < total; ++i) {
        const val = gen.sample()
        vals.push(val)
        mean += val / total
    }
    expect(vals.every((v) => v >= 0 && v < 1)).toBe(true)
    const variance = vals.map((v) => (v - mean) ** 2 / total).reduce((a, b) => a + b, 0)
    expect(Math.abs(variance - 1 / 12)).toBeLessThan(0.001)
    expect(Math.abs(mean - 0.5)).toBeLessThan(0.01)
})
