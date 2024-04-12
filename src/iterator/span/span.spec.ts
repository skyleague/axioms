import { span } from './index.js'

import { collect } from '../../array/index.js'

import { expect, it } from 'vitest'

it('simple', () => {
    const [init, rest] = span([1, 2, 3, 4, 5, 1, 2, 3], (x) => x < 3)
    expect(init).toMatchInlineSnapshot(`
        [
          1,
          2,
        ]
    `)
    expect(collect(rest)).toMatchInlineSnapshot(`
        [
          3,
          4,
          5,
          1,
          2,
          3,
        ]
    `)
})

it('all', () => {
    const [init, rest] = span([1, 2, 3], (x) => x < 9)
    expect(init).toMatchInlineSnapshot(`
        [
          1,
          2,
          3,
        ]
    `)
    expect(collect(rest)).toMatchInlineSnapshot('[]')
})

it('none', () => {
    const [init, rest] = span([1, 2, 3], (x) => x < 0)
    expect(init).toMatchInlineSnapshot('[]')
    expect(collect(rest)).toMatchInlineSnapshot(`
        [
          1,
          2,
          3,
        ]
    `)
})
