import { isFunction, isGeneratorFunction } from '../../guard'
import type { InfiniteGenerator } from '../../type'

export function* repeat<T>(x: T | (() => Generator<T>) | ((i: number) => T)): InfiniteGenerator<T> {
    let i = 0
    if (isFunction(x)) {
        while (true) {
            if (isGeneratorFunction<T, void>(x)) {
                yield* x()
            } else {
                yield (x as (i: number) => T)(i)
            }
            ++i
        }
    } else {
        while (true) {
            yield x
            ++i
        }
    }
}
