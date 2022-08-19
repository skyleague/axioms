import type { AsyncTraversable } from '../../type/async'

export async function* asyncChunk<T>(xs: AsyncTraversable<T>, size: number): AsyncTraversable<T[]> {
    let chunk: T[] = []
    for await (const item of xs) {
        chunk.push(item)
        if (chunk.length >= size) {
            yield chunk
            chunk = []
        }
    }
    if (chunk.length > 0) {
        yield chunk
    }
}
