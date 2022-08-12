import { fromEntries } from './from-entries'

import { equal } from '../../iterator'
import { dict, forAll, unknown } from '../../random'
import { entriesOf } from '../entries-of'

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
