import type { Tree } from '../../../algorithm'
import { enumerate } from '../../../generator'
import { isJust, isDefined } from '../../../guard'
import type { Traversable, Maybe } from '../../../type'
import { Nothing } from '../../../type'
import { toString } from '../../../util'

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
    public falsified: Falsified<T>
    public matcherResult?: unknown
    public constructor(falsified: Falsified<T>, { seed }: { seed: bigint }) {
        super(
            [
                `Counter example found after ${falsified.tests} tests (seed: ${seed}n)`,
                `Shrunk ${falsified.depth} time(s)`,
                `Counter example:`,
                '',

                falsified.counterExampleStr,
                ...(isJust(falsified.error) ? ['', falsified.error.message] : []),
            ].join('\n')
        )
        this.name = 'FalsifiedError'
        this.falsified = falsified
        if (isJust(falsified.error) && isDefined(falsified.error.stack)) {
            this.stack = falsified.error.stack
            this.matcherResult = (this.falsified.error as FalsifiedError<unknown>).matcherResult
        }
    }
}

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
            const strLength = str?.length ?? -1

            const [, error] = predicate(foundCounterExample.value)
            if ((smallest === undefined || smallest[1] > strLength) ?? (0 || (smallest[1] === strLength && smallest[0] > str))) {
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
