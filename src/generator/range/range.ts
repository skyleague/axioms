import { isDefined } from '../../guard'

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
