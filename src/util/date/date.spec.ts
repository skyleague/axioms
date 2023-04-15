import { toISO8601Date } from './date.js'

import { date, datetime, forAll } from '../../index.js'

import { formatISO } from 'date-fns'
import { it } from 'vitest'

it('format date', () => {
    forAll(
        datetime({ minDate: new Date(1000, 0, 1), maxDate: new Date(9999, 0, 1) }),
        (x) => toISO8601Date(x, { format: 'date' }) === formatISO(x, { representation: 'date' })
    )
})

it('format date time', () => {
    forAll(
        datetime({ minDate: new Date(1000, 0, 1), maxDate: new Date(9999, 0, 1) }),
        (x) => toISO8601Date(x, { format: 'date-time' }) === formatISO(x, { representation: 'complete' })
    )
})

it('format date, Date compatibility', () => {
    forAll(date(), (x) => toISO8601Date(new Date(x), { format: 'date' }) === x)
})

it('format date time, Date compatibility', () => {
    forAll(datetime(), (x) => new Date(toISO8601Date(x, { format: 'date-time' })).getTime() === x.getTime())
})
