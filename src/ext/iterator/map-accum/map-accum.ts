import type { Traversable } from '../../../type'

export function* mapAccumL<S, B, T>(xs: Traversable<B>, f: (a: S, b: B) => [S, T], init: S): Generator<T, S> {
    let state = init
    let value: T
    for (const x of xs) {
        ;[state, value] = f(state, x)
        yield value
    }
    return state
}
