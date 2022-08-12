import type { InfiniteGenerator, Traversable } from '../../type'

export function filter<T>(xs: InfiniteGenerator<T>, by: (x: T) => boolean): InfiniteGenerator<T>
export function filter<S extends T, T>(xs: Traversable<T>, by: (x: T) => x is S): Traversable<S>
export function filter<T>(xs: Traversable<T>, by: (x: T) => boolean): Traversable<T>
export function* filter<T>(xs: Traversable<T>, by: (x: T) => boolean) {
    for (const x of xs) {
        if (by(x)) {
            yield x
        }
    }
}

export function filterWithMemory<S extends T, T>(
    xs: Traversable<T>,
    by: (x: T, xs: S[], i: number, skippedInRow: number) => x is S
): Traversable<S>
export function filterWithMemory<T>(
    xs: Traversable<T>,
    by: (x: T, xs: T[], i: number, skippedInRow: number) => boolean
): Traversable<T>
export function* filterWithMemory<T>(xs: Traversable<T>, by: (x: T, xs: T[], i: number, skippedInRow: number) => boolean) {
    const memory: T[] = []
    let i = 0
    let skippedInRow = 0
    for (const x of xs) {
        if (by(x, memory, i++, skippedInRow)) {
            memory.push(x)
            yield x
            skippedInRow = 0
        } else {
            skippedInRow += 1
        }
    }
}
