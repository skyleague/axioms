import type { Traversable } from '../../type'

/**
 * A queue generator type.
 *
 * @typeParam T - The element type.
 */
export interface QueueGenerator<T> extends Generator<T, void> {
    /**
     * Enqueue new values into the queue.
     *
     * @param xs - The values to enqueue.
     */
    enqueue(...xs: Traversable<T>[]): void
}

/**
 * Creates a generator that acts as a LIFO queue.
 *
 * ### Example
 * ```ts
 * collect(queue([1,2,3]))
 * // => [1, 2, 3]
 * ```
 *
 * @param initialize - The initial values to fill the queue.
 *
 * @returns The queue generator.
 *
 * @typeParam T - The element type.
 *
 * @group Generators
 * @alpha
 */
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
