---
editUrl: false
next: false
prev: false
title: "isArray"
---

> **isArray**\<`I`\>(`xs`): `xs is I[]`

Checks if `xs` is classified as Array.

### Example
```ts
asArray(1)
// => [1]

asArray([2, 3, 4])
// => [2, 3, 4]
```

### Alternatives
- [ECMAScript Array.isArray](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/isArray)

## Type Parameters

• **I**

The element type of the Iterable class.

## Parameters

### xs

`unknown`

The value to check.

## Returns

`xs is I[]`

Returns `true` if `xs` is an Array, else `false`.

## Defined in

[src/guard/is-array/is-array.ts:24](https://github.com/skyleague/axioms/blob/75fb1c5c977f1940e84e5cdcef2be336d1fd81da/src/guard/is-array/is-array.ts#L24)
