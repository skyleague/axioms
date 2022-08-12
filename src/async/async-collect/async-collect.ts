import type { AsyncTraversable } from '../../type/async/async'

export async function asyncCollect<T>(xs: AsyncTraversable<T>): Promise<T[]> {
    const ys: T[] = []
    for await (const item of xs) {
        ys.push(item)
    }
    return ys
}
