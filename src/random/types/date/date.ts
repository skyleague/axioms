import type { MaybePartial } from '../../../type/partial/partial.js'
import type { Dependent } from '../../arbitrary/dependent/index.js'
import { integer } from '../integer/index.js'

/**
 * Describes how timestamps are allowed to be generated.
 *
 * @group Arbitrary
 */
export interface TimestampGenerator {
    /**
     * The minimum timestamp integer value to generate.
     */
    min: number
    /**
     * The maximum timestamp integer value to generate.
     */
    max: number
    range: 'full' | 'relevant'
}

/**
 * It returns an arbitrary that generates a timestamp value.
 *
 * ### Example
 * ```ts
 * random(timestamp())
 * // => 12345
 * ```
 *
 * @param constraints - The constraints.
 * @returns An arbitrary that generates a timestamp value.
 *
 * @group Arbitrary
 */
export function timestamp(constraints: MaybePartial<TimestampGenerator> = {}): Dependent<number> {
    const { range = 'relevant' } = constraints
    const { min = range === 'relevant' ? 0 : -8640000000000000, max = range === 'relevant' ? 8640000000000 : 8640000000000000 } =
        constraints
    return integer({ min, max })
}

/**
 * Describes how datetimes are allowed to be generated.
 *
 * @group Arbitrary
 */
export interface DatetimeGenerator {
    /**
     * The minimum date value to generate.
     */
    minDate: Date
    /**
     * The maximum date value to generate.
     */
    maxDate: Date
    /**
     * A way to specify the precision of the generated date.
     */
    precision: 'days' | 'hours' | 'milliseconds' | 'minutes' | 'seconds'
    range: 'full' | 'relevant'
}

/**
 * It returns an arbitrary that generates a datetime value of type Date.
 *
 * ### Example
 * ```ts
 * random(datetime())
 * // => new Date("1991-01-18T15:33:11.000Z")
 *
 * random(datetime({precision: 'days'}))
 * // => new Date("1991-01-17T23:00:00.000Z")
 * ```
 *
 * @param constraints - The constraints.
 * @returns An arbitrary that generates a datetime value.
 *
 * @group Arbitrary
 */
export function datetime(context: MaybePartial<DatetimeGenerator> = {}): Dependent<Date> {
    const { minDate: minDatetime, maxDate: maxDatetime, precision = 'seconds', range = 'relevant' } = context
    return timestamp({ min: minDatetime?.getTime(), max: maxDatetime?.getTime(), range }).map((i) => {
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
}

export interface DateGenerator {
    minDate: string
    maxDate: string
    range: 'full' | 'relevant'
}

/**
 * It returns an arbitrary that generates an ISO08501 date value.
 *
 * ### Example
 * ```ts
 * random(date())
 * // => "1991-01-18"
 * ```
 *
 * @param constraints - The constraints.
 * @returns An arbitrary that generates an ISO08501 date value.
 *
 * @group Arbitrary
 */
export function date(constraints: MaybePartial<DateGenerator> = {}): Dependent<string> {
    const { minDate, maxDate, range = 'relevant' } = constraints

    return datetime({
        minDate: minDate !== undefined ? new Date(minDate) : undefined,
        maxDate: maxDate !== undefined ? new Date(maxDate) : undefined,
        range,
        precision: 'days',
    }).map((d) => d.toISOString().slice(0, 10))
}
