import { mapValues } from './map-values'

test('infers correct type', () => {
    const original = {
        foo: 'bar' as const,
        fooz: 'baz' as const,
    }
    const transformed: {
        foo: 'barbar' | 'barbaz' | 'bazbar' | 'bazbaz'
        fooz: 'barbar' | 'barbaz' | 'bazbar' | 'bazbaz'
    } = mapValues(original, (v) => `${v}${v}` as const)
    expect(transformed).toMatchInlineSnapshot(`
        Object {
          "foo": "barbar",
          "fooz": "bazbaz",
        }
    `)
})
