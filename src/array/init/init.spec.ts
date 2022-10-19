import { init } from '.'

import { forAll, array, unknown } from '../../random'

test('simple', () => {
    expect(init([1, 2, 3])).toMatchInlineSnapshot(`
        [
          1,
          2,
        ]
    `)
})

test('generator', () => {
    function* foobar() {
        yield 'foo'
        yield 'bar'
    }
    expect(init(foobar())).toMatchInlineSnapshot(`
        [
          "foo",
        ]
    `)
})

test('init xs === xs[:-1]', () => {
    forAll(array(unknown()), (xs) => {
        expect(init(xs)).toEqual(xs.slice(0, xs.length - 1))
    })
})
