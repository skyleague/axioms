import { splitAt } from '.'

import { collect } from '../../array'

test('string', () => {
    const [init, rest] = splitAt('hello world!', 6)
    expect(init).toMatchInlineSnapshot(`
        Array [
          "h",
          "e",
          "l",
          "l",
          "o",
          " ",
        ]
    `)
    expect(collect(rest)).toMatchInlineSnapshot(`
        Array [
          "w",
          "o",
          "r",
          "l",
          "d",
          "!",
        ]
    `)
})

test('simple 1', () => {
    const [init, rest] = splitAt([1, 2, 3], 1)
    expect(init).toMatchInlineSnapshot(`
        Array [
          1,
        ]
    `)
    expect(collect(rest)).toMatchInlineSnapshot(`
        Array [
          2,
          3,
        ]
    `)
})

test('simple 2', () => {
    const [init, rest] = splitAt([1, 2, 3], 3)
    expect(init).toMatchInlineSnapshot(`
        Array [
          1,
          2,
          3,
        ]
    `)
    expect(collect(rest)).toMatchInlineSnapshot(`Array []`)
})

test('over', () => {
    const [init, rest] = splitAt([1, 2, 3], 4)
    expect(init).toMatchInlineSnapshot(`
        Array [
          1,
          2,
          3,
        ]
    `)
    expect(collect(rest)).toMatchInlineSnapshot(`Array []`)
})

test('negative', () => {
    const [init, rest] = splitAt([1, 2, 3], -1)
    expect(init).toMatchInlineSnapshot(`Array []`)
    expect(collect(rest)).toMatchInlineSnapshot(`
        Array [
          1,
          2,
          3,
        ]
    `)
})

test('zero', () => {
    const [init, rest] = splitAt([1, 2, 3], 0)
    expect(init).toMatchInlineSnapshot(`Array []`)
    expect(collect(rest)).toMatchInlineSnapshot(`
        Array [
          1,
          2,
          3,
        ]
    `)
})

test('simple', () => {
    const [init, rest] = splitAt([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 5)
    expect(init).toMatchInlineSnapshot(`
        Array [
          1,
          2,
          3,
          4,
          5,
        ]
    `)
    expect(collect(rest)).toMatchInlineSnapshot(`
        Array [
          6,
          7,
          8,
          9,
          10,
        ]
    `)
})
