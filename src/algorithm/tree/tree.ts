import { applicative } from '../../iterator/applicative'
import { concat } from '../../iterator/concat'
import { filter } from '../../iterator/filter'
import { map } from '../../iterator/map'
import type { Printable, Traversable } from '../../type'
import { queue } from '../queue'
import { stack } from '../stack'

export interface Tree<T> {
    value: T
    children: Traversable<Tree<T>>
}

export function tree<T>(x: T, children?: Traversable<Tree<T>>): Tree<T> {
    return { value: x, children: children ?? [] }
}

export function applicativeTree<T>(x: Tree<T>): Tree<T> {
    return { value: x.value, children: applicative(map(x.children, (c) => applicativeTree(c))) }
}

export function mapTree<T, U>(x: Tree<T>, f: (x: T) => U): Tree<U> {
    return { value: f(x.value), children: map(x.children, (c) => mapTree(c, f)) }
}

export function mapApplicativeTree<T, U>(f: (x: T) => U, x: Tree<T>): Tree<U> {
    return { value: f(x.value), children: applicative(map(x.children, (c) => mapTree(c, f))) }
}

export function filterTree<T>(f: (x: T) => boolean, x: Tree<T>): Tree<T> {
    return {
        value: x.value,
        children: map(
            filter(x.children, (c) => f(c.value)),
            (c) => filterTree(f, c)
        ),
    }
}
export function filterApplicativeTree<T>(f: (x: T) => boolean, x: Tree<T>): Tree<T> {
    return {
        value: x.value,
        children: applicative(
            map(
                filter(x.children, (y) => f(y.value)),
                (c) => filterTree(f, c)
            )
        ),
    }
}

export function unfoldTree<T>(f: (x: T) => Traversable<T>, x: T): Tree<T> {
    return { value: x, children: map(f(x), (c) => unfoldTree(f, c)) }
}

export function expandTree<T>(f: (x: T) => Traversable<T>, x: Tree<T>): Tree<T> {
    return {
        value: x.value,
        children: concat(
            map(x.children, (c) => expandTree(f, c)),
            map(f(x.value), (c) => unfoldTree(f, c))
        ),
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
    const ordered = []
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

export function showTree<T extends Printable>(t: Tree<T>, indent = '', isLast = true, depth = 0): string {
    if (depth > 2) {
        return `${indent}└─...`
    }
    const result = `${indent}${isLast ? '└─' : '├─'} ${t.value.toString()}`
    indent += isLast ? '    ' : '|   '
    const children = [...t.children]
    return `${result}${children.length > 0 ? '\n' : ''}${children
        .map((child, i) => showTree(child, indent, i === children.length - 1, depth + 1))
        .join('\n')}`
}
