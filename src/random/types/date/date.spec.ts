import { arbitraryContext } from '../../arbitrary/context/context.js'
import { xoroshiro128plus } from '../../rng/index.js'
import { date, datetime } from './date.js'

import { describe, expect, it } from 'vitest'

describe('datetime', () => {
    it('random sample', () => {
        const ctx = arbitraryContext({ rng: xoroshiro128plus(1638968569864n) })
        const aint = datetime()
        expect(Array.from({ length: 10 }, () => aint.sample(ctx))).toMatchInlineSnapshot(`
          [
            2120-10-18T16:27:55.000Z,
            2043-12-16T06:04:41.000Z,
            2099-01-10T12:51:38.000Z,
            1979-12-16T13:45:18.000Z,
            2190-07-31T00:32:52.000Z,
            1980-05-25T14:21:03.000Z,
            1991-09-25T08:09:16.000Z,
            2077-01-18T19:43:49.000Z,
            2019-05-01T09:57:56.000Z,
            2010-10-08T15:17:06.000Z,
          ]
        `)
    })

    it('random sample - days', () => {
        const ctx = arbitraryContext({ rng: xoroshiro128plus(1638968569864n) })
        const aint = datetime({ precision: 'days' })
        expect(Array.from({ length: 10 }, () => aint.sample(ctx))).toMatchInlineSnapshot(`
          [
            2120-10-18T00:00:00.000Z,
            2043-12-16T00:00:00.000Z,
            2099-01-10T00:00:00.000Z,
            1979-12-16T00:00:00.000Z,
            2190-07-31T00:00:00.000Z,
            1980-05-25T00:00:00.000Z,
            1991-09-25T00:00:00.000Z,
            2077-01-18T00:00:00.000Z,
            2019-05-01T00:00:00.000Z,
            2010-10-08T00:00:00.000Z,
          ]
        `)
    })

    it('cardinality', () => {
        expect(datetime().supremumCardinality?.(arbitraryContext())).toMatchInlineSnapshot('8640000000001')
    })
})

describe('date', () => {
    it('random sample', () => {
        const ctx = arbitraryContext({ rng: xoroshiro128plus(1638968569864n) })
        const aint = date()
        expect(Array.from({ length: 10 }, () => aint.sample(ctx))).toMatchInlineSnapshot(`
          [
            "2120-10-18",
            "2043-12-16",
            "2099-01-10",
            "1979-12-16",
            "2190-07-31",
            "1980-05-25",
            "1991-09-25",
            "2077-01-18",
            "2019-05-01",
            "2010-10-08",
          ]
        `)
    })

    it('cardinality', () => {
        expect(date().supremumCardinality?.(arbitraryContext())).toMatchInlineSnapshot('8640000000001')
    })
})
