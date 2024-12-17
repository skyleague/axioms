---
editUrl: false
next: false
prev: false
title: "max"
---

> **max**\<`T`\>(`xs`): `T` *extends* `Iterable`\<infer I\> ? `T` *extends* readonly [`unknown`, `...unknown[]`] ? `T`\[`number`\] : [`Maybe`](/api/type-aliases/maybe/)\<`I`\> : `T`

Calculate the maximum value of the given items.

### Example
```ts
max([1, 2, 3])
// => 3
```

### Alternatives
- [Lodash - max](https://lodash.com/docs/4.17.15#max)

## Type Parameters

• **T** *extends* `Iterable`\<`string` \| `number` \| `bigint`, `any`, `any`\>

The element type.

## Parameters

### xs

`T`

The values to check.

## Returns

`T` *extends* `Iterable`\<infer I\> ? `T` *extends* readonly [`unknown`, `...unknown[]`] ? `T`\[`number`\] : [`Maybe`](/api/type-aliases/maybe/)\<`I`\> : `T`

The maximum value of the traversable.

## Defined in

[src/iterator/max/max.ts:25](https://github.com/skyleague/axioms/blob/75fb1c5c977f1940e84e5cdcef2be336d1fd81da/src/iterator/max/max.ts#L25)
