import { fromEntries } from './from-entries.js'

import { equal } from '../../iterator/index.js'
import { forAll, unknown } from '../../random/index.js'
import { record } from '../../random/types/record/record.js'
import { entriesOf } from '../entries-of/index.js'

import { expect, expectTypeOf, it } from 'vitest'

it('fromEntries o entriesOf === identity', () => {
    forAll(record(unknown()), (x) => equal(fromEntries(entriesOf(x)), x))
})

it('infers correct type', () => {
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

it('handles empty array', () => {
    expect(fromEntries([])).toEqual({})
})

it('handles types', () => {
    expectTypeOf(
        fromEntries([
            ['a', 5],
            ['b', 'hello'],
            ['c', false],
        ]),
    ).toEqualTypeOf<{ a: 5; b: 'hello'; c: false }>()
})
