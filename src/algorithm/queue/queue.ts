import type { Traversable } from '../../type'

export interface QueueGenerator<T> extends Generator<T, void> {
    enqueue(...xs: Traversable<T>[]): void
}

export function queue<T>(initialize: Traversable<T> = []): QueueGenerator<T> {
    const states: Traversable<T>[] = [initialize]
    const generator: QueueGenerator<T> = (function* () {
        while (states.length > 0) {
            const next = states.shift()!
            yield* next
        }
    })() as QueueGenerator<T>

    generator.enqueue = (...xss: Traversable<T>[]) => {
        for (const xs of xss) {
            states.push(xs)
        }
    }
    return generator
}
