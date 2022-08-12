import type { BinaryTree } from '.'
import { dfsNLR, dfsLRN } from '.'

test('preorder', () => {
    const tree: BinaryTree<number> = {
        value: 1,
        left: { value: 2, left: { value: 4 }, right: { value: 5 } },
        right: { value: 3, left: { value: 6 }, right: { value: 7 } },
    }

    expect([...dfsNLR(tree)]).toMatchInlineSnapshot(`
        Array [
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

test('postorder', () => {
    const tree: BinaryTree<number> = {
        value: 1,
        left: { value: 2, left: { value: 4 }, right: { value: 5 } },
        right: { value: 3, left: { value: 6 }, right: { value: 7 } },
    }

    expect([...dfsLRN(tree)]).toMatchInlineSnapshot(`
        Array [
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
