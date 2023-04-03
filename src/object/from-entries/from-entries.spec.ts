import { fromEntries } from './from-entries.js'

import { equal } from '../../iterator/index.js'
import { dict, forAll, unknown } from '../../random/index.js'
import { entriesOf } from '../entries-of/index.js'

test('fromEntries o entriesOf === identity', () => {
    forAll(dict(unknown()), (x) => equal(fromEntries(entriesOf(x)), x))
})

test('infers correct type', () => {
    const original = {
        foo: 'bar' as const,
        fooz: 'baz' as const,
    }
    const entries = entriesOf(original)
    const constructed: {
        foo: 'bar'
        fooz: 'baz'
    } = fromEntries(entries)

    expect(original).toEqual(constructed)
})
