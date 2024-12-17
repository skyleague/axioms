---
editUrl: false
next: false
prev: false
title: "asyncChunk"
---

> **asyncChunk**\<`T`\>(`xs`, `size`): `AsyncIterable`\<`T`[]\>

Creates an async generator that splits the given AsyncIterable into chunks of the required size. If
no even chunks can be created, the last chunk will have fewer elements.

### Example
```ts
await asyncCollect(asyncChunk([1, 2, 3, 4, 5], 1))
// => [[1], [2], [3], [4], [5]]

await asyncCollect(asyncChunk([1, 2, 3, 4, 5], 3))
// => [[1, 2, 3], [4, 5]]

await asyncCollect(asyncChunk([1, 2, 3], 0))
// => [[1], [2], [3]]
```

## Type Parameters

• **T**

The element type.

## Parameters

### xs

The values to split in chunks.

`AsyncIterable`\<`T`, `any`, `any`\> | `Iterable`\<`T`, `any`, `any`\>

### size

`number`

## Returns

`AsyncIterable`\<`T`[]\>

An async map generator.

## See

[chunk](../../../../../../api/functions/chunk)

## Defined in

[src/async/async-chunk/async-chunk.ts:28](https://github.com/skyleague/axioms/blob/75fb1c5c977f1940e84e5cdcef2be336d1fd81da/src/async/async-chunk/async-chunk.ts#L28)
