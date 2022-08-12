import { init } from '.'

import { forAll, array, unknown } from '../../random'

test('simple', () => {
    expect(init([1, 2, 3])).toMatchInlineSnapshot(`
        Array [
          1,
          2,
        ]
    `)
})

test('init xs === xs[:-1]', () => {
    forAll(array(unknown()), (xs) => {
        expect(init(xs)).toEqual(xs.slice(0, xs.length - 1))
    })
})
