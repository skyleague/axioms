import type { Tree } from './index.js'
import { mapTree } from './index.js'

import { dfsPreOrder, dfsPostOrder, bfs, tree, showTree, filterTree } from './tree.js'

import { sum } from '../../array/index.js'

import { expect, it } from 'vitest'

it('map tree', () => {
    const t = mapTree(tree(1, [tree(2), tree(3)]), (x) => x + 1)
    expect(showTree(t)).toMatchInlineSnapshot(`
        "└─ 2
            ├─ 3
            └─ 4"
    `)
    expect(showTree(t)).toMatchInlineSnapshot(`"└─ 2"`)
})

it('map tree', () => {
    expect(showTree(mapTree(tree(1, [tree(2), tree(3)]), (x) => x + 1))).toMatchInlineSnapshot(`
        "└─ 2
            ├─ 3
            └─ 4"
    `)
})

it('filter tree', () => {
    const t = filterTree(tree(1, [tree(2, [tree(5)]), tree(3)]), (x) => x < 4)
    expect(showTree(t)).toMatchInlineSnapshot(`
        "└─ 1
            ├─ 2
            └─ 3"
    `)
    expect(showTree(t)).toMatchInlineSnapshot(`"└─ 1"`)
})

it('preorder', () => {
    const t: Tree<number> = {
        value: 1,
        children: [
            {
                value: 2,
                children: [
                    { value: 4, children: [] },
                    { value: 5, children: [] },
                ],
            },
            {
                value: 3,
                children: [
                    { value: 6, children: [] },
                    { value: 7, children: [] },
                ],
            },
        ],
    }

    expect([...dfsPreOrder(t)]).toMatchInlineSnapshot(`
        [
          1,
          2,
          4,
          5,
          3,
          6,
          7,
        ]
    `)
})

it('postorder', () => {
    const t: Tree<number> = {
        value: 1,
        children: [
            {
                value: 2,
                children: [
                    { value: 4, children: [] },
                    { value: 5, children: [] },
                ],
            },
            {
                value: 3,
                children: [
                    { value: 6, children: [] },
                    { value: 7, children: [] },
                ],
            },
        ],
    }

    expect([...dfsPostOrder(t)]).toMatchInlineSnapshot(`
        [
          7,
          6,
          3,
          5,
          4,
          2,
          1,
        ]
    `)
})

it('bfs', () => {
    const t: Tree<number> = {
        value: 1,
        children: [
            {
                value: 2,
                children: [
                    { value: 4, children: [] },
                    { value: 5, children: [] },
                ],
            },
            {
                value: 3,
                children: [
                    { value: 6, children: [] },
                    { value: 7, children: [] },
                ],
            },
        ],
    }

    expect([...bfs(t)]).toMatchInlineSnapshot(`
        [
          1,
          2,
          3,
          4,
          5,
          6,
          7,
        ]
    `)
})

it('tree', () => {
    const root = tree(1, [tree(2, [tree(4), tree(5)]), tree(3, [tree(6), tree(7)])])

    expect([...bfs(root)]).toMatchInlineSnapshot(`
        [
          1,
          2,
          3,
          4,
          5,
          6,
          7,
        ]
    `)
    expect(sum(bfs(root))).toMatchInlineSnapshot(`28`)
})
