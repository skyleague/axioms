import type { BinaryTree } from './index.js'
import { dfsLRN, dfsNLR } from './index.js'

import { expect, it } from 'vitest'

it('preorder', () => {
    const tree: BinaryTree<number> = {
        value: 1,
        left: { value: 2, left: { value: 4 }, right: { value: 5 } },
        right: { value: 3, left: { value: 6 }, right: { value: 7 } },
    }

    expect([...dfsNLR(tree)]).toMatchInlineSnapshot(`
        [
          1,
          3,
          7,
          6,
          2,
          5,
          4,
        ]
    `)
})

it('postorder', () => {
    const tree: BinaryTree<number> = {
        value: 1,
        left: { value: 2, left: { value: 4 }, right: { value: 5 } },
        right: { value: 3, left: { value: 6 }, right: { value: 7 } },
    }

    expect([...dfsLRN(tree)]).toMatchInlineSnapshot(`
        [
          4,
          5,
          2,
          6,
          7,
          3,
          1,
        ]
    `)
})
