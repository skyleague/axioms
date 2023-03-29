import { isDefined } from '../../guard/index.js'

/**
 * Creates a generator of numbers from start to exclusive end. If the end end is not specified,
 * the start will be interpreted as end, and the start will be set to 0.
 *
 * ### Example
 * ```ts
 * collect(range(5))
 * // => [0, 1, 2, 3, 4]
 *
 * collect(range(0, 20, 5))
 * // => [0, 5, 10, 15]
 *
 * for (const x of range(3)) {
 *   x // ?
 * }
 * // => 0, 1, 2
 * ```
 *
 * ### Alternatives
 * - [Lodash - range](https://lodash.com/docs/4.17.15#range)
 *
 * @param start - The start of the range.
 * @param stop - The end of the range (exclusive).
 * @param step - The increment value.
 *
 * @returns The range generator.
 *
 * @group Generators
 */
export function* range(start: number, stop?: number, step = 1) {
    start = Math.floor(start)
    step = Math.floor(Math.max(step, 1))
    const [vstart, vstop] = isDefined(stop) ? [start, Math.floor(stop)] : [0, start]
    const steps = (vstop - vstart) / step
    let val = vstart
    for (let i = 0; i < steps; ++i, val += step) {
        yield val
    }
}
