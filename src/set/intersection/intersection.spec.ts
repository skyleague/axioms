import { intersection } from './intersection.js'

test('simple', () => {
    expect(intersection(new Set([1, 2, 3]), new Set([2, 3, 4]))).toMatchInlineSnapshot(`
        Set {
          2,
          3,
        }
    `)
})

test('iterator', () => {
    expect(intersection([1, 2, 3], [2, 3, 4])).toMatchInlineSnapshot(`
        Set {
          2,
          3,
        }
    `)
})
