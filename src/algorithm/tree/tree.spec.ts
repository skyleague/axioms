import type { Tree } from './index.js'
import { mapTree } from './index.js'

import { bfs, filterTree, showTree, tree } from './tree.js'

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
    expect(bfs(root).reduce((a, b) => a + b, 0)).toMatchInlineSnapshot('28')
})
