import type { Traversable } from '../../type'
import { stack } from '../stack'

export interface BinaryTree<T> {
    value: T
    left?: BinaryTree<T>
    right?: BinaryTree<T>
}

export function* dfsNLR<T>(node: BinaryTree<T>): Traversable<T, void> {
    const nodes = stack([node])
    for (const x of nodes) {
        yield x.value
        if (x.left !== undefined) {
            nodes.push([x.left])
        }
        if (x.right !== undefined) {
            nodes.push([x.right])
        }
    }
}

export function* dfsLRN<T>(node: BinaryTree<T>): Traversable<T, void> {
    const nodes = stack([node])
    const ordered = []
    for (const x of nodes) {
        ordered.push(x?.value)
        if (x.left !== undefined) {
            nodes.push([x.left])
        }
        if (x.right !== undefined) {
            nodes.push([x.right])
        }
    }

    for (const value of ordered.reverse()) {
        yield value
    }
}
