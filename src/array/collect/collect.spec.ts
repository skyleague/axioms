import { collect } from './collect'

import { counter } from '../../generator'
import { take } from '../../iterator'

test('simple', () => {
    expect(collect(take(counter(), 4))).toMatchInlineSnapshot(`
        [
          0,
          1,
          2,
          3,
        ]
    `)
})

test('generator', () => {
    function* foobar() {
        yield 'foo'
        yield 'bar'
    }
    expect(collect(foobar())).toMatchInlineSnapshot(`
        [
          "foo",
          "bar",
        ]
    `)
})
