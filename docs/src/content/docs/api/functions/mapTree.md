---
editUrl: false
next: false
prev: false
title: "mapTree"
---

> **mapTree**\<`T`, `U`\>(`x`, `f`): [`Tree`](/api/interfaces/tree/)\<`U`\>

Map a function over the tree starting with the root node, and mapping
the children recursively.

This function is fully lazy, meaning that we do not evaluate children
until they are iterated on. Iteration of the children modify the iterators.

### Example
```ts
const t = mapTree(tree(1, [tree(2), tree(3)]), (x) => x + 1)
showTree(t)
// => └─ 2
//       ├─ 3
//       └─ 4

showTree(t)
// => └─ 2
```

## Type Parameters

• **T**

• **U**

## Parameters

### x

[`Tree`](/api/interfaces/tree/)\<`T`\>

The node root.

### f

(`x`) => `U`

## Returns

[`Tree`](/api/interfaces/tree/)\<`U`\>

A mapped tree.

## Defined in

[src/algorithm/tree/tree.ts:72](https://github.com/skyleague/axioms/blob/75fb1c5c977f1940e84e5cdcef2be336d1fd81da/src/algorithm/tree/tree.ts#L72)
