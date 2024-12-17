---
editUrl: false
next: false
prev: false
title: "min"
---

> **min**\<`T`\>(`xs`): `T` *extends* `Iterable`\<infer I\> ? `T` *extends* readonly [`unknown`, `...unknown[]`] ? `T`\[`number`\] : [`Maybe`](/api/type-aliases/maybe/)\<`I`\> : `T`

Calculate the minimum value of the given items.

### Example
```ts
min([1, 2, 3])
// => 1
```

### Alternatives
- [Lodash - min](https://lodash.com/docs/4.17.15#min)

## Type Parameters

• **T** *extends* `Iterable`\<`string` \| `number` \| `bigint`, `any`, `any`\>

The element type.

## Parameters

### xs

`T`

The values to check.

## Returns

`T` *extends* `Iterable`\<infer I\> ? `T` *extends* readonly [`unknown`, `...unknown[]`] ? `T`\[`number`\] : [`Maybe`](/api/type-aliases/maybe/)\<`I`\> : `T`

The minimum value of the Iterable.

## Defined in

[src/iterator/min/min.ts:25](https://github.com/skyleague/axioms/blob/75fb1c5c977f1940e84e5cdcef2be336d1fd81da/src/iterator/min/min.ts#L25)
