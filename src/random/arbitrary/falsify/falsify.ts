import type { Tree } from '../../../algorithm/index.js'
import { recoverTry } from '../../../data/try/try.js'
import { isDefined, isFailure, isJust } from '../../../guard/index.js'
import { isSuccess } from '../../../guard/is-success/is-success.js'
import type { Maybe, Try } from '../../../type/index.js'
import { Nothing } from '../../../type/index.js'
import { inspect } from '../../../util/_internal/inspect/inspect.js'
import { InfeasibleTree } from '../shrink/shrink.js'

import { performance } from 'node:perf_hooks'

export class FalsifiedError extends Error {
    public constructor(falsified: Falsified, { seed }: { seed: bigint }) {
        const counterExampleStr = [
            `Counter example found after ${falsified.tests} tests (seed: ${seed}n)`,
            `Shrunk ${falsified.depth} time(s)`,
            'Counter example:',
            '',
            falsified.counterExample,
        ].join('\n')

        super([counterExampleStr, ...(isJust(falsified.error) ? ['', falsified.error.message] : [])].join('\n'))
        this.name = 'FalsifiedError'
        if (isJust(falsified.error) && isDefined(falsified.error.stack)) {
            if (process.env.JEST_WORKER_ID !== undefined) {
                // jest adds information to the stack, so input the falsify information there if needed
                this.stack = `${counterExampleStr}\n\n${falsified.error.stack}`
                // biome-ignore lint/suspicious/noExplicitAny:
                Object.defineProperty(this, 'matcherResult', (falsified.error as { matcherResult?: any }).matcherResult)
            } else if (process.env.VITEST_WORKER_ID !== undefined) {
                const origMessage = this.message
                this.name = 'AssertionError'
                this.stack = falsified.error.stack
                Object.assign(this, falsified.error)
                this.message = origMessage
                if (!('cause' in this)) {
                    this.cause = falsified.error.cause
                }
            } else {
                this.stack = falsified.error.stack
            }
        }
    }
}

export interface FalsifyOptions<T> {
    values: () => Iterator<Try<Tree<T>>>
    predicate: (x: T) => Try<true>
    maxDepth: number
    counterExample: T | undefined
    timeout: number | false
    tests: number
}

export interface Falsified {
    counterExample: string
    error: Error
    depth: number
    tests: number
}

/**
 * @internal
 */
export function falsify<T>({ values, predicate, maxDepth, counterExample, timeout, tests }: FalsifyOptions<T>): Maybe<Falsified> {
    if (isDefined(counterExample)) {
        const holdOrError = predicate(counterExample)
        if (holdOrError !== true) {
            return {
                counterExample: inspect(counterExample),
                error: holdOrError,
                depth: 0,
                tests: 0,
            }
        }
        return Nothing
    }
    let smallest: Falsified | undefined = undefined
    let failure: Error | undefined = undefined
    const startTime = performance.now()
    for (const [i, tryTree] of Iterator.from(values()).map((x, i) => [i, x] as const)) {
        if (isFailure(tryTree)) {
            failure = tryTree
            continue
        }
        const holdsOrError = predicate(tryTree.value)
        const holdsOrCounterExample = recoverTry(holdsOrError, (error) => {
            const timeBudget = timeout !== false ? (timeout - (performance.now() - startTime)) / (tests - i) : false
            const found = findSmallest({ tree: tryTree, predicate, depth: maxDepth, timeBudget, error, value: tryTree.value })
            return found
        })
        const counterExample = recoverTry(holdsOrCounterExample, (error) => {
            return { tree: tryTree, depth: maxDepth, error, value: tryTree.value }
        })
        if (counterExample !== true && isSuccess(counterExample)) {
            const counterExampleStr = inspect(counterExample.tree.value)
            smallest =
                smallest === undefined || smallest.counterExample.length > counterExampleStr.length
                    ? ({
                          counterExample: counterExampleStr,
                          error: counterExample.error,
                          depth: maxDepth - counterExample.depth,
                          tests: i + 1,
                      } as const)
                    : smallest
        } else if (isFailure(counterExample)) {
            // this means that the generation has failed irrecoverably
            throw counterExample
        }
    }
    if (smallest !== undefined) {
        return smallest
    }
    if (isDefined(failure)) {
        throw failure
    }
    return Nothing
}

export function findSmallest<T>({
    tree,
    predicate,
    depth,
    timeBudget,
    error,
    value,
    startTime = performance.now(),
}: {
    tree: Tree<T>
    predicate: (x: T) => Try<true>
    depth: number
    timeBudget: number | false
    error: Error
    value: unknown
    startTime?: number
}) {
    if (depth > 0) {
        for (const child of tree.children) {
            const timeSinceStart = performance.now() - startTime
            if (timeBudget !== false && timeSinceStart > timeBudget) {
                return { tree, depth, error, value }
            }

            try {
                const holdsOrError = predicate(child.value)
                if (holdsOrError !== true) {
                    return findSmallest({
                        tree: child,
                        predicate,
                        depth: depth - 1,
                        timeBudget,
                        startTime,
                        error: holdsOrError,
                        value: child.value,
                    })
                }
            } catch (e) {
                if (e instanceof InfeasibleTree || e instanceof RangeError) {
                    return { tree, depth, error, value }
                }
                throw e
            }
        }
    }

    return { tree, depth, error, value }
}

export interface AsyncFalsifyOptions<T> {
    values: () => Iterable<Try<Tree<T>>>
    predicate: (x: T) => Promise<Try<true>>
    maxDepth: number
    counterExample: T | undefined
    timeout: number | false
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
}: AsyncFalsifyOptions<T>): Promise<Maybe<Falsified>> {
    if (isDefined(counterExample)) {
        const holdOrError = await predicate(counterExample)
        if (holdOrError !== true) {
            return {
                counterExample: inspect(counterExample),
                error: holdOrError,
                depth: 0,
                tests: 0,
            }
        }
        return Nothing
    }
    let smallest = undefined
    let failure: Error | undefined = undefined
    const startTime = performance.now()
    for (const [i, tryTree] of Iterator.from(values()).map((x, i) => [i, x] as const)) {
        if (isFailure(tryTree)) {
            failure = tryTree
            continue
        }
        const holdsOrError = await predicate(tryTree.value)
        const holdsOrCounterExample = await recoverTry(holdsOrError, async (error) => {
            const timeBudget = timeout !== false ? (timeout - (performance.now() - startTime)) / (tests - i) : false
            const found = await asyncFindSmallest({
                tree: tryTree,
                predicate,
                depth: maxDepth,
                timeBudget,
                error,
                value: tryTree.value,
            })
            return found
        })
        const counterExample = recoverTry(holdsOrCounterExample, (error) => {
            return { tree: tryTree, depth: maxDepth, error, value: tryTree.value }
        })
        if (counterExample !== true && isSuccess(counterExample)) {
            const counterExampleStr = inspect(counterExample.tree.value)
            smallest =
                smallest === undefined || smallest.counterExample.length > counterExampleStr.length
                    ? ({
                          counterExample: counterExampleStr,
                          error: counterExample.error,
                          depth: maxDepth - counterExample.depth,
                          tests: i + 1,
                      } as const)
                    : smallest
        } else if (isFailure(counterExample)) {
            // this means that the generation has failed irrecoverably
            throw counterExample
        }
    }
    if (smallest !== undefined) {
        return smallest
    }
    if (isDefined(failure)) {
        throw failure
    }
    return Nothing
}

export async function asyncFindSmallest<T>({
    tree,
    predicate,
    depth,
    timeBudget,
    error,
    value,
    startTime = performance.now(),
}: {
    tree: Tree<T>
    predicate: (x: T) => Promise<Try<true>>
    depth: number
    timeBudget: number | false
    error: Error
    value: unknown
    startTime?: number
}) {
    if (depth > 0) {
        for (const child of tree.children) {
            const timeSinceStart = performance.now() - startTime
            if (timeBudget !== false && timeSinceStart > timeBudget) {
                return { tree, depth, error, value }
            }
            try {
                const holdsOrError = await predicate(child.value)
                if (holdsOrError !== true) {
                    return asyncFindSmallest({
                        tree: child,
                        predicate,
                        depth: depth - 1,
                        timeBudget,
                        startTime,
                        error: holdsOrError,
                        value: child.value,
                    })
                }
            } catch (e) {
                if (e instanceof InfeasibleTree || e instanceof RangeError) {
                    return { tree, depth, error, value }
                }
                throw e
            }
        }
    }

    return { tree, depth, error, value }
}
