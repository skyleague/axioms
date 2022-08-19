import type { AsyncTraversable } from '../../type/async'

export async function* asyncMap<I, O>(
    xs: AsyncTraversable<I>,
    mapper: (x: I, index: number) => O | Promise<O>
): AsyncTraversable<O> {
    let i = 0
    for await (const x of xs) {
        yield await mapper(x, i)
        ++i
    }
}
