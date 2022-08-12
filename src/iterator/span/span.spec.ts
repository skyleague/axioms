import { span } from '.'

import { collect } from '../../array'

test('simple', () => {
    const [init, rest] = span([1, 2, 3, 4, 5, 1, 2, 3], (x) => x < 3)
    expect(init).toMatchInlineSnapshot(`
        Array [
          1,
          2,
        ]
    `)
    expect(collect(rest)).toMatchInlineSnapshot(`
        Array [
          3,
          4,
          5,
          1,
          2,
          3,
        ]
    `)
})

test('all', () => {
    const [init, rest] = span([1, 2, 3], (x) => x < 9)
    expect(init).toMatchInlineSnapshot(`
        Array [
          1,
          2,
          3,
        ]
    `)
    expect(collect(rest)).toMatchInlineSnapshot(`Array []`)
})

test('none', () => {
    const [init, rest] = span([1, 2, 3], (x) => x < 0)
    expect(init).toMatchInlineSnapshot(`Array []`)
    expect(collect(rest)).toMatchInlineSnapshot(`
        Array [
          1,
          2,
          3,
        ]
    `)
})
