import { queue } from '../../generator/queue/index.js'
import { stack } from '../../generator/stack/index.js'
import { applicative } from '../../iterator/applicative/index.js'
import { filter } from '../../iterator/filter/index.js'
import { map } from '../../iterator/map/index.js'
import type { Traversable } from '../../type/index.js'

/**
 * A type that represents a tree with an enumerable amount of children.
 *
 * @typeParam T - The element type.
 *
 * @group Algorithm
 */
export interface Tree<T> {
    /**
     * The value of the tree node.
     */
    value: T
    /**
     * The children in the tree node.
     */
    children: Traversable<Tree<T>>
}

/**
 * Helper function to build a tree node.
 *
 * @param x - The node value.
 * @param children - The children attached to the node,
 * @returns A tree.
 *
 * @group Algorithm
 */
export function tree<T>(x: T, children?: Traversable<Tree<T>>): Tree<T> {
    return { value: x, children: children ?? [] }
}

/**
 * Make the tree applicative by making all the children under the
 * root node reentrant.
 *
 * @param x - The node root.
 * @returns An applicative tree.
 *
 * @group Algorithm
 */
export function applicativeTree<T>(x: Tree<T>): Tree<T> {
    return { value: x.value, children: applicative(map(x.children, (c) => applicativeTree(c))) }
}

/**
 * Map a function over the tree starting with the root node, and mapping
 * the children recursively.
 *
 * This function is fully lazy, meaning that we do not evaluate children
 * until they are iterated on. Iteration of the children modify the iterators.
 *
 * ### Example
 * ```ts
 * const t = mapTree(tree(1, [tree(2), tree(3)]), (x) => x + 1)
 * showTree(t)
 * // => └─ 2
 * //       ├─ 3
 * //       └─ 4
 *
 * showTree(t)
 * // => └─ 2
 * ```
 *
 * @param x - The node root.
 * @returns A mapped tree.
 *
 * @group Algorithm
 */
export function mapTree<T, U>(x: Tree<T>, f: (x: T) => U): Tree<U> {
    return { value: f(x.value), children: map(x.children, (c) => mapTree(c, f)) }
}

/**
 * Filter children out of a tree by a given predicate.
 *
 * This function is fully lazy, meaning that we do not evaluate children
 * until they are iterated on. Iteration of the children modify the iterators.
 *
 * ### Example
 * ```ts
 * const t = filterTree(tree(1, [tree(2, tree(5)), tree(3)]), (x) => x < 4)
 * showTree(t)
 * // => └─ 1
 * //       ├─ 2
 * //       └─ 3
 *
 * showTree(t)
 * // => └─ 1
 * ```
 *
 * @param x - The node root.
 * @returns A filter tree.
 *
 * @group Algorithm
 */
export function filterTree<T>(x: Tree<T>, f: (x: T) => boolean): Tree<T> {
    return {
        value: x.value,
        children: map(
            filter(x.children, (c) => f(c.value)),
            (c) => filterTree(c, f),
        ),
    }
}

export function pruneTree<T>(x: Tree<T>): Tree<T> {
    return {
        value: x.value,
        children: [],
    }
}

export function unfoldTree<T>(f: (x: T) => Traversable<T>, x: T): Tree<T> {
    return { value: x, children: map(f(x), (c) => unfoldTree(f, c)) }
}

export function expandTree<T>(f: (x: T) => Traversable<T>, x: Tree<T>): Tree<T> {
    return {
        value: x.value,
        children: map(f(x.value), (c) => unfoldTree(f, c)),
    }
}

export function evaluateTree<T>(x: Tree<T>): Tree<T> {
    return {
        value: x.value,
        children: map(x.children, (c) => evaluateTree(c)),
    }
}

export function* dfsPreOrder<T>(node: Tree<T>): Traversable<T, void> {
    const nodes = stack([node])
    for (const x of nodes) {
        yield x.value
        nodes.push(x.children)
    }
}

export function* dfsPostOrder<T>(node: Tree<T>): Traversable<T, void> {
    const nodes = stack([node])
    const ordered: T[] = []
    for (const x of nodes) {
        ordered.push(x.value)
        nodes.push(x.children)
    }

    for (const value of ordered.reverse()) {
        yield value
    }
}

export function* bfs<T>(node: Tree<T>): Traversable<T, void> {
    const nodes = queue([node])
    for (const x of nodes) {
        yield x.value
        nodes.enqueue(x.children)
    }
}

export function showTree<
    T extends {
        toString: () => string
    },
>(
    t: Tree<T>,
    {
        indent = '',
        isLast = true,
        maxDepth = 2,
        _depth = 0,
    }: {
        indent?: string
        isLast?: boolean
        maxDepth?: number
        _depth?: number
    } = {},
): string {
    if (_depth > maxDepth) {
        return `${indent}└─...`
    }
    const result = `${indent}${isLast ? '└─' : '├─'} ${t.value.toString()}`
    indent += isLast ? '    ' : '|   '
    const children = [...t.children]
    return `${result}${children.length > 0 ? '\n' : ''}${children
        .map((child, i) => showTree(child, { indent, isLast: i === children.length - 1, _depth: _depth + 1, maxDepth }))
        .join('\n')}`
}
