import { mapTree } from '../../../algorithm/tree'
import type { RelaxedPartial } from '../../../type/partial'
import { toISO8601Date } from '../../../util/date'
import type { Dependent } from '../../arbitrary/dependent'
import { makeDependent } from '../../arbitrary/dependent'
import { integer } from '../integer'

export interface TimestampGenerator {
    min: number
    max: number
    range: 'full' | 'relevant'
}

export function timestamp(context: RelaxedPartial<TimestampGenerator> = {}): Dependent<number> {
    const { range = 'relevant' } = context
    const { min = range === 'relevant' ? 0 : -8640000000000000, max = range === 'relevant' ? 8640000000000 : 8640000000000000 } =
        context
    return integer({ min, max })
}

export interface DatetimeGenerator {
    minDatetime: Date
    maxDatetime: Date
    precision: 'days' | 'hours' | 'milliseconds' | 'minutes' | 'seconds'
    range: 'full' | 'relevant'
}

export function datetime(context: RelaxedPartial<DatetimeGenerator> = {}): Dependent<Date> {
    const { minDatetime, maxDatetime, precision = 'seconds', range = 'relevant' } = context
    const atimestamp = timestamp({ min: minDatetime?.getTime(), max: maxDatetime?.getTime(), range })
    return makeDependent((ctx) =>
        mapTree(atimestamp.value(ctx), (i) => {
            const d = new Date(i)
            if (!['milliseconds'].includes(precision)) {
                d.setMilliseconds(0)
            }
            if (!['milliseconds', 'seconds'].includes(precision)) {
                d.setSeconds(0)
            }
            if (!['milliseconds', 'seconds', 'minutes'].includes(precision)) {
                d.setMinutes(0)
            }
            if (!['milliseconds', 'seconds', 'minutes', 'hours'].includes(precision)) {
                d.setHours(0)
            }
            return d
        })
    )
}

export interface DateGenerator {
    minDate: string
    maxDate: string
    range: 'full' | 'relevant'
}

export function date(context: RelaxedPartial<DateGenerator> = {}): Dependent<string> {
    const { minDate, maxDate, range = 'relevant' } = context
    const atimestamp = datetime({
        minDatetime: minDate !== undefined ? new Date(minDate) : undefined,
        maxDatetime: maxDate !== undefined ? new Date(maxDate) : undefined,
        range,
        precision: 'days',
    })
    return makeDependent((ctx) =>
        mapTree(atimestamp.value(ctx), (d) => {
            return toISO8601Date(d, { format: 'date' })
        })
    )
}
