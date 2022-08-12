import { hasPropertiesDefined } from './has-properties-defined'

import { all, collect, dict, float, forAll, keysOf, shuffle, take, tuple, unknown } from '../..'

test('defined properties are defined', () => {
    forAll(tuple(dict(unknown()), float({ min: 0, max: 1 })), ([xs, r]) => {
        const keys = keysOf(xs)
        const selectedKeys = collect(take(shuffle(keys), r * keys.length))
        return hasPropertiesDefined(selectedKeys)(xs) === all(selectedKeys, (k) => xs[k] !== undefined)
    })
})

test('filters with correct assertion', () => {
    const original: { foo: string | undefined }[] = [{ foo: 'bar' }, { foo: undefined }]

    const filtered: { foo: string }[] = original.filter(hasPropertiesDefined('foo'))
    expect(filtered).toMatchInlineSnapshot(`
        Array [
          Object {
            "foo": "bar",
          },
        ]
    `)
})
