import { isJust, isRight } from '../../../guard'
import type { Either, Maybe } from '../../../type'
import { Nothing } from '../../../type'

export interface ParamTrie<T> {
    value: Either<Nothing, T>
    parameter: Maybe<string>
    children: Record<Nothing | PropertyKey, ParamTrie<T>>
}

function find<T>(node: ParamTrie<T>, parts: readonly string[]): Maybe<[T, [string, string][]]> {
    let child: ParamTrie<T> | undefined = node
    const parameters: [string, string][] = []
    for (const head of parts) {
        child = child.children[head] ?? child.children[Nothing as unknown as string]
        if (child === undefined) {
            return Nothing
        }
        if (isJust(child.parameter)) {
            parameters.push([child.parameter, head])
        }
    }
    return 'right' in child.value ? [child.value.right, parameters] : Nothing
}

function insert<T>(node: ParamTrie<T>, prefix: Either<string, string>[], value: T): boolean {
    let child: ParamTrie<T> | undefined = node
    for (const head of prefix) {
        const [index, parameter] = isRight(head) ? ([head.right, Nothing] as const) : ([Nothing, head.left] as const)

        child = node.children[index as string]
        if (child === undefined) {
            child = { value: { left: Nothing }, children: {}, parameter }
            node.children[index as string] = child
        }

        node = child
    }
    if ('left' in node.value) {
        node.value = { right: value }
        return true
    }
    return false
}

export function parameterTrie<T>(): {
    root: ParamTrie<T>
    insert: (prefix: Either<string, string>[], value: T) => boolean
    find: (parts: readonly string[]) => Maybe<[T, [string, string][]]>
} {
    const root: ParamTrie<T> = { value: { left: Nothing }, children: {}, parameter: Nothing }

    return {
        root,
        insert: function (prefix: Either<string, string>[], value: T) {
            return insert(root, prefix, value)
        },
        find: function (parts: readonly string[]) {
            return find(root, parts)
        },
    }
}
