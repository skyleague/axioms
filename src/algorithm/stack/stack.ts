import { next } from '../../generator/next'
import { isLeft, isRight } from '../../guard'
import type { Traversable, Traverser } from '../../type'
import { toTraverser } from '../../type'

export interface StackGenerator<T> extends Generator<T, void> {
    push(...xs: Traversable<T>[]): void
}

export function stack<T>(initialize: Traversable<T> = []): StackGenerator<T> {
    const pending: Traverser<T>[] = [toTraverser(initialize)]
    const generator: StackGenerator<T> = (function* () {
        while (pending.length > 0) {
            let node = next(pending[pending.length - 1])
            while (isLeft(node) && pending.length > 0) {
                pending.pop()
                if (pending.length > 0) {
                    node = next(pending[pending.length - 1])
                }
            }
            if (isRight(node)) {
                yield node.right
            }
        }
    })() as StackGenerator<T>

    generator.push = (...xss: Traversable<T>[]) => {
        for (const xs of xss) {
            pending.push(toTraverser(xs))
        }
    }

    return generator
}
