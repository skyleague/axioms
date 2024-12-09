import {} from '../../guard/index.js'

/**
 * A stack generator type.
 *
 * @typeParam T - The element type.
 */
export interface StackGenerator<T> extends Generator<T, void> {
    /**
     * Push new values into the stack.
     *
     * @param xs - The values to stack.
     */
    push(...xs: Iterable<T>[]): void
}

/**
 * Creates a generator that acts as a FIFO stack.
 *
 * ### Example
 * ```ts
 * collect(stack([1,2,3]))
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
export function stack<T>(initialize: Iterable<T> = []): StackGenerator<T> {
    const pending: Iterator<T>[] = [Iterator.from(initialize)]
    const generator: StackGenerator<T> = (function* () {
        while (pending.length > 0) {
            // biome-ignore lint/style/noNonNullAssertion: we know that pending is not empty
            let node = pending[pending.length - 1]!.next()
            while (node.done && pending.length > 0) {
                pending.pop()
                if (pending.length > 0) {
                    // biome-ignore lint/style/noNonNullAssertion: we know that pending is not empty
                    node = pending[pending.length - 1]!.next()
                }
            }
            if (!node.done) {
                yield node.value
            }
        }
    })() as StackGenerator<T>

    generator.push = (...xss: Iterable<T>[]) => {
        for (const xs of xss) {
            pending.push(Iterator.from(xs))
        }
    }

    return generator
}
