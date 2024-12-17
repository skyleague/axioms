---
editUrl: false
next: false
prev: false
title: "chunk"
---

> **chunk**\<`T`\>(`xs`, `size`): `Generator`\<`T`[], `void`\>

Creates a generator that splits the given Iterable into chunks of the required size. If
no even chunks can be created, the last chunk will have fewer elements.

### Example
```ts
collect(chunk([1, 2, 3, 4, 5], 1))
// => [[1], [2], [3], [4], [5]]

collect(chunk([1, 2, 3, 4, 5], 3))
// => [[1, 2, 3], [4, 5]]

collect(chunk([1, 2, 3], 0))
// => [[1], [2], [3]]
```

### Alternatives
- [Lodash - chunk](https://lodash.com/docs/4.17.15#chunk)

## Type Parameters

• **T**

The element type.

## Parameters

### xs

`Iterable`\<`T`, `any`, `any`\>

The values to split in chunks.

### size

`number`

The maximum size of a chunk, constrained to minimum value of 1.

## Returns

`Generator`\<`T`[], `void`\>

A chunk generator.

## Defined in

[src/iterator/chunk/chunk.ts:29](https://github.com/skyleague/axioms/blob/75fb1c5c977f1940e84e5cdcef2be336d1fd81da/src/iterator/chunk/chunk.ts#L29)
