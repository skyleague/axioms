import { mapValues } from './map-values.js'

import { expect, it } from 'vitest'

it('infers correct type', () => {
    const original = {
        foo: 'bar' as const,
        fooz: 'baz' as const,
    }
    const transformed: {
        foo: 'barbar' | 'barbaz' | 'bazbar' | 'bazbaz'
        fooz: 'barbar' | 'barbaz' | 'bazbar' | 'bazbaz'
    } = mapValues(original, (v) => `${v}${v}` as const)
    expect(transformed).toMatchInlineSnapshot(`
        {
          "foo": "barbar",
          "fooz": "bazbaz",
        }
    `)
})
