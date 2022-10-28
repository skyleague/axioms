import { difference, symmetricDifference } from './difference'

describe('difference', () => {
    test('simple', () => {
        expect(difference(new Set([1, 2, 3]), new Set([2, 3, 4]))).toMatchInlineSnapshot(`
                    Set {
                      1,
                    }
            `)
    })

    test('iterator', () => {
        expect(difference([1, 2, 3], [2, 3, 4])).toMatchInlineSnapshot(`
                    Set {
                      1,
                    }
            `)
    })
})

describe('symmetricDifference', () => {
    test('simple', () => {
        expect(symmetricDifference(new Set([1, 2, 3]), new Set([2, 3, 4]))).toMatchInlineSnapshot(`
            Set {
              1,
              4,
            }
        `)
    })

    test('iterator', () => {
        expect(symmetricDifference([1, 2, 3], [2, 3, 4])).toMatchInlineSnapshot(`
            Set {
              1,
              4,
            }
        `)
    })
})
