import type { Tree } from '.'
import { dfsPreOrder, dfsPostOrder, bfs, tree } from '.'

import { sum } from '../../array'

test('preorder', () => {
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
        Array [
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

test('postorder', () => {
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
        Array [
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

test('bfs', () => {
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
        Array [
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

test('tree', () => {
    const root = tree(1, [tree(2, [tree(4), tree(5)]), tree(3, [tree(6), tree(7)])])

    expect([...bfs(root)]).toMatchInlineSnapshot(`
        Array [
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
