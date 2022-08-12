import type { InfiniteGenerator } from '../../type'

export function* counter(start = 0): InfiniteGenerator<number> {
    let i = start
    while (true) {
        yield i++
    }
}
