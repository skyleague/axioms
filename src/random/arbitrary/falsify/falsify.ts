import type { Tree } from '../../../algorithm/index.js'
import { enumerate } from '../../../generator/index.js'
import { isJust, isDefined } from '../../../guard/index.js'
import type { Traversable, Maybe } from '../../../type/index.js'
import { Nothing } from '../../../type/index.js'
import { toString } from '../../../util/index.js'

import { performance } from 'node:perf_hooks'

export interface FalsifyOptions<T> {
    values: () => Traversable<Tree<T>>
    predicate: (x: T) => [boolean, Maybe<Error>]
    maxDepth: number
    counterExample: T | undefined
}

export interface Falsified<T> {
    counterExample: T
    counterExampleStr: string
    error: Maybe<Error>
    depth: number
    tests: number
}

export class FalsifiedError<T> extends Error {
    public constructor(falsified: Falsified<T>, { seed }: { seed: bigint }) {
        const counterExampleStr = [
            `Counter example found after ${falsified.tests} tests (seed: ${seed}n)`,
            `Shrunk ${falsified.depth} time(s)`,
            `Counter example:`,
            '',
            falsified.counterExampleStr,
        ].join('\n')

        super([counterExampleStr, ...(isJust(falsified.error) ? ['', falsified.error.message] : [])].join('\n'))
        this.name = 'FalsifiedError'
        if (isJust(falsified.error) && isDefined(falsified.error.stack)) {
            this.cause = falsified.error
            if (process.env.JEST_WORKER_ID !== undefined) {
                // jest adds information to the stack, so input the falsify information there if needed
                this.stack = `${counterExampleStr}\n\n${falsified.error.stack}`
                // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-explicit-any
                Object.defineProperty(this, 'matcherResult', (falsified.error as { matcherResult?: any }).matcherResult)
            } else {
                this.stack = falsified.error.stack
            }
        }
    }
}

/**
 * @internal
 */
export function falsify<T>({ values, predicate, maxDepth, counterExample }: FalsifyOptions<T>): Maybe<Falsified<T>> {
    if (isDefined(counterExample)) {
        const [holds, error] = predicate(counterExample)
        if (!holds) {
            return {
                counterExample,
                counterExampleStr: toString(counterExample),
                error,
                depth: 0,
                tests: 0,
            }
        }
        return Nothing
    }
    let smallest = undefined
    for (const [i, tree] of enumerate(values())) {
        let foundCounterExample: Maybe<Tree<T>> = Nothing
        const [holds] = predicate(tree.value)
        if (!holds) {
            const found = findSmallest({ tree, predicate, depth: maxDepth })
            foundCounterExample = found.tree
            const str = toString(foundCounterExample.value)
            const strLength = str.length ?? -1

            const [, error] = predicate(foundCounterExample.value)
            if (smallest === undefined || smallest[1] > strLength || (smallest[1] === strLength && smallest[0] > str)) {
                smallest = [
                    str,
                    strLength,
                    {
                        counterExample: foundCounterExample.value,
                        counterExampleStr: str,
                        error,
                        depth: maxDepth - found.depth,
                        tests: i + 1,
                    },
                ] as const
            }
        }
    }
    if (smallest) {
        return smallest[2]
    }
    return Nothing
}

export function findSmallest<T>({
    tree,
    predicate,
    depth,
}: {
    tree: Tree<T>
    predicate: (x: T) => [boolean, Maybe<Error>]
    depth: number
}): { tree: Tree<T>; depth: number } {
    if (depth > 0) {
        for (const child of tree.children) {
            const [holds] = predicate(child.value)
            if (!holds) {
                return findSmallest({ tree: child, predicate, depth: depth - 1 })
            }
        }
    }

    return { tree, depth }
}

export interface AsyncFalsifyOptions<T> {
    values: () => Traversable<Tree<T>>
    predicate: (x: T) => Promise<[boolean, Maybe<Error>]>
    maxDepth: number
    counterExample: T | undefined
    timeout: number
    tests: number
}

/**
 * @internal
 */
export async function asyncFalsify<T>({
    values,
    predicate,
    maxDepth,
    counterExample,
    timeout,
    tests,
}: AsyncFalsifyOptions<T>): Promise<Maybe<Falsified<T>>> {
    if (isDefined(counterExample)) {
        const [holds, error] = await predicate(counterExample)
        if (!holds) {
            return {
                counterExample,
                counterExampleStr: toString(counterExample),
                error,
                depth: 0,
                tests: 0,
            }
        }
        return Nothing
    }
    let smallest = undefined
    const startTime = performance.now()
    for (const [i, tree] of enumerate(values())) {
        const timeLeft = timeout - (performance.now() - startTime)
        const timeBudget = timeLeft / (tests - i)
        let foundCounterExample: Maybe<Tree<T>> = Nothing
        const [holds] = await predicate(tree.value)
        if (!holds) {
            const found = await asyncFindSmallest({ tree, predicate, depth: maxDepth, timeBudget })
            foundCounterExample = found.tree
            const str = toString(foundCounterExample.value)
            const strLength = str.length

            const [, error] = await predicate(foundCounterExample.value)
            if (smallest === undefined || smallest[1] > strLength || (smallest[1] === strLength && smallest[0] > str)) {
                smallest = [
                    str,
                    strLength,
                    {
                        counterExample: foundCounterExample.value,
                        counterExampleStr: str,
                        error,
                        depth: maxDepth - found.depth,
                        tests: i + 1,
                    },
                ] as const
            }
        }
    }
    if (smallest) {
        return smallest[2]
    }
    return Nothing
}

export async function asyncFindSmallest<T>({
    tree,
    predicate,
    depth,
    timeBudget,
    startTime = performance.now(),
}: {
    tree: Tree<T>
    predicate: (x: T) => Promise<[boolean, Maybe<Error>]>
    depth: number
    timeBudget: number
    startTime?: number
}): Promise<{ tree: Tree<T>; depth: number }> {
    if (depth > 0) {
        for (const child of tree.children) {
            const timeSinceStart = performance.now() - startTime
            if (timeSinceStart > timeBudget) {
                return { tree, depth }
            }
            const [holds] = await predicate(child.value)
            if (!holds) {
                return asyncFindSmallest({ tree: child, predicate, depth: depth - 1, timeBudget, startTime })
            }
        }
    }

    return { tree, depth }
}
