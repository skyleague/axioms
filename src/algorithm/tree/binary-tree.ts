import { stack } from '../../generator/stack'
import type { Traversable } from '../../type'

/**
 * A type that represents a binary tree (which has a maximum of 2 children; left, and right).
 *
 * @typeParam T - The element type.
 *
 * @group Algorithm
 */
export interface BinaryTree<T> {
    /**
     * The value of the tree node.
     */
    value: T
    /**
     * The left child of the tree.
     */
    left?: BinaryTree<T>
    /**
     * The right child of the tree.
     */
    right?: BinaryTree<T>
}

/**
 * Run a depth-first search on the binary tree, that evaluates in the order Node, Left, Right recursively.
 *
 * @param node - The root to start searching from.
 *
 * @returns A generator with the node values in NLR order.
 *
 * @group Algorithm
 */
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

/**
 * Run a depth-first search on the binary tree, that evaluates in the order Left, Right, Node recursively.
 *
 * @param node - The root to start searching from.
 *
 * @returns A generator with the node values in LRN order.
 *
 * @group Algorithm
 */
export function* dfsLRN<T>(node: BinaryTree<T>): Traversable<T, void> {
    const nodes = stack([node])
    const ordered = []
    for (const x of nodes) {
        ordered.push(x.value)
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
