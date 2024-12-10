import { expect, it } from 'vitest'
import { span } from './index.js'

it('simple', () => {
    const [init, rest] = span([1, 2, 3, 4, 5, 1, 2, 3], (x) => x < 3)
    expect(init).toMatchInlineSnapshot(`
        [
          1,
          2,
        ]
    `)
    expect(rest.toArray()).toMatchInlineSnapshot(`
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
    expect(rest.toArray()).toMatchInlineSnapshot('[]')
})

it('none', () => {
    const [init, rest] = span([1, 2, 3], (x) => x < 0)
    expect(init).toMatchInlineSnapshot('[]')
    expect(rest.toArray()).toMatchInlineSnapshot(`
        [
          1,
          2,
          3,
        ]
    `)
})
