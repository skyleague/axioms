import { isJust, isNothing } from '../../../guard'
import type { Maybe } from '../../../type/maybe'
import { Nothing } from '../../../type/maybe'

export interface Trie<T> {
    value: Maybe<T>
    children: Record<Nothing | PropertyKey, Trie<T>>
}

function find<T>(node: Trie<T>, parts: readonly string[]): Maybe<T> {
    let child: Trie<T> | undefined = node
    for (const head of parts) {
        child = child.children[head]
        if (child === undefined) {
            return Nothing
        }
    }
    return isJust(child.value) ? child.value : Nothing
}

function insert<T>(node: Trie<T>, prefix: string[], value: T): boolean {
    let child: Trie<T> | undefined = node
    for (const head of prefix) {
        child = node.children[head]
        if (child === undefined) {
            child = { value: Nothing, children: {} }
            node.children[head] = child
        }

        node = child
    }
    if (isNothing(node.value)) {
        node.value = value
        return true
    }
    return false
}

export function trie<T>() {
    const root: Trie<T> = { value: Nothing, children: {} }

    return {
        root,
        insert: function (prefix: string[], value: T) {
            return insert(root, prefix, value)
        },
        find: function (parts: readonly string[]) {
            return find(root, parts)
        },
    }
}
