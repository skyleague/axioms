---
editUrl: false
next: false
prev: false
title: "zip"
---

> **zip**\<`T`\>(...`xs`): `IteratorObject`\<`Zip`\<`T`\>\>

Take the Iterables and return a Iterable of tuples.

The function evaluates the Iterables and converts them into arrays.

### Example
```ts
collect(zip([1, 2, 3], [1, 2, 3]))
// => [[1, 1], [2, 2], [3, 3]]
```

## Type Parameters

• **T** *extends* readonly `Iterable`\<`unknown`, `any`, `any`\>[]

## Parameters

### xs

...[`...T[]`]

## Returns

`IteratorObject`\<`Zip`\<`T`\>\>

## Defined in

[src/array/zip/zip.ts:18](https://github.com/skyleague/axioms/blob/75fb1c5c977f1940e84e5cdcef2be336d1fd81da/src/array/zip/zip.ts#L18)
