import { union } from './union'

test('simple', () => {
    expect(union(new Set([1, 2, 3]), new Set([2, 3, 4]))).toMatchInlineSnapshot(`
        Set {
          1,
          2,
          3,
          4,
        }
    `)
})

test('iterator', () => {
    expect(union([1, 2, 3], [2, 3, 4])).toMatchInlineSnapshot(`
        Set {
          1,
          2,
          3,
          4,
        }
    `)
})

test('mixed', () => {
    expect(union(new Set([1, 2, 3]), new Set(['2', '3', '4']))).toMatchInlineSnapshot(`
        Set {
          1,
          2,
          3,
          "2",
          "3",
          "4",
        }
    `)
})
