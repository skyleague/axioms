---
editUrl: false
next: false
prev: false
title: "filterTree"
---

> **filterTree**\<`T`\>(`x`, `f`): [`Tree`](/api/interfaces/tree/)\<`T`\>

Filter children out of a tree by a given predicate.

This function is fully lazy, meaning that we do not evaluate children
until they are iterated on. Iteration of the children modify the iterators.

### Example
```ts
const t = filterTree(tree(1, [tree(2, tree(5)), tree(3)]), (x) => x < 4)
showTree(t)
// => └─ 1
//       ├─ 2
//       └─ 3

showTree(t)
// => └─ 1
```

## Type Parameters

• **T**

## Parameters

### x

[`Tree`](/api/interfaces/tree/)\<`T`\>

The node root.

### f

(`x`) => `boolean`

## Returns

[`Tree`](/api/interfaces/tree/)\<`T`\>

A filter tree.

## Defined in

[src/algorithm/tree/tree.ts:99](https://github.com/skyleague/axioms/blob/75fb1c5c977f1940e84e5cdcef2be336d1fd81da/src/algorithm/tree/tree.ts#L99)
