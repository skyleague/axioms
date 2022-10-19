import { asyncMap } from './async-map'

import { asyncCollect } from '../async-collect'

test('simple', async () => {
    expect(await asyncCollect(asyncMap([1, 2, 3], (x) => x + 1))).toMatchInlineSnapshot(`
        [
          2,
          3,
          4,
        ]
    `)
})

test('async generator', async () => {
    const asyncFn = <T>(x: T) => Promise.resolve(x)
    async function* foobar() {
        yield await asyncFn('foo')
        yield await asyncFn('Bar')
    }
    expect(await asyncCollect(asyncMap(foobar(), asyncFn))).toMatchInlineSnapshot(`
        [
          "foo",
          "Bar",
        ]
    `)
})
