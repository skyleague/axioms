import { hasPropertiesDefined } from './has-properties-defined.js'

import { all, collect, float, forAll, keysOf, shuffle, take, tuple, unknown } from '../../../index.js'
import { record } from '../../../random/types/record/record.js'

import { expect, it } from 'vitest'

it('defined properties are defined', () => {
    forAll(tuple(record(unknown()), float({ min: 0, max: 1 })), ([xs, r]) => {
        const keys = keysOf(xs)
        const selectedKeys = collect(take(shuffle(keys), r * keys.length))
        return hasPropertiesDefined(selectedKeys)(xs) === all(selectedKeys, (k) => xs[k] !== undefined)
    })
})

it('filters with correct assertion', () => {
    const original: { foo: string | undefined }[] = [{ foo: 'bar' }, { foo: undefined }]

    const filtered: { foo: string }[] = original.filter(hasPropertiesDefined('foo'))
    expect(filtered).toMatchInlineSnapshot(`
        [
          {
            "foo": "bar",
          },
        ]
    `)
})

it('multiple', () => {
    const original = [{ foo: 'bar', bar: 'fooz' }, { foo: undefined }]
    const filtered = original.filter(hasPropertiesDefined(['foo', 'bar']))
    expect(filtered).toEqual([{ foo: 'bar', bar: 'fooz' }])
})
