import { date, datetime } from './date.js'

import { collect } from '../../../array/index.js'
import { repeat } from '../../../generator/index.js'
import { take } from '../../../iterator/index.js'
import { xoroshiro128plus } from '../../rng/index.js'

describe('datetime', () => {
    test('random sample', () => {
        const ctx = { rng: xoroshiro128plus(1638968569864n) }
        const aint = datetime()
        expect(
            collect(
                take(
                    repeat(() => aint.sample(ctx)),
                    10
                )
            )
        ).toMatchInlineSnapshot(`
            [
              2165-08-23T18:33:56.000Z,
              1991-01-18T15:33:11.000Z,
              2028-09-14T19:21:42.000Z,
              2139-06-25T02:03:03.000Z,
              1997-01-09T01:15:09.000Z,
              2142-02-13T18:02:26.000Z,
              2093-09-12T04:39:27.000Z,
              1988-06-24T01:32:54.000Z,
              2107-11-30T06:37:44.000Z,
              1998-09-19T11:30:51.000Z,
            ]
        `)
    })

    test('random sample - days', () => {
        const ctx = { rng: xoroshiro128plus(1638968569864n) }
        const aint = datetime({ precision: 'days' })
        expect(
            collect(
                take(
                    repeat(() => aint.sample(ctx)),
                    10
                )
            )
        ).toMatchInlineSnapshot(`
            [
              2165-08-23T00:00:00.000Z,
              1991-01-18T00:00:00.000Z,
              2028-09-14T00:00:00.000Z,
              2139-06-25T00:00:00.000Z,
              1997-01-09T00:00:00.000Z,
              2142-02-13T00:00:00.000Z,
              2093-09-12T00:00:00.000Z,
              1988-06-24T00:00:00.000Z,
              2107-11-30T00:00:00.000Z,
              1998-09-19T00:00:00.000Z,
            ]
        `)
    })
})

describe('date', () => {
    test('random sample', () => {
        const ctx = { rng: xoroshiro128plus(1638968569864n) }
        const aint = date()
        expect(
            collect(
                take(
                    repeat(() => aint.sample(ctx)),
                    10
                )
            )
        ).toMatchInlineSnapshot(`
            [
              "2165-08-23",
              "1991-01-18",
              "2028-09-14",
              "2139-06-25",
              "1997-01-09",
              "2142-02-13",
              "2093-09-12",
              "1988-06-24",
              "2107-11-30",
              "1998-09-19",
            ]
        `)
    })
})
