---
editUrl: false
next: false
prev: false
title: "minBy"
---

> **minBy**\<`T`\>(`xs`, `f`): `T` *extends* `Iterable`\<infer I\> ? `T` *extends* readonly [`unknown`, `...unknown[]`] ? `T`\[`number`\] : [`Maybe`](/api/type-aliases/maybe/)\<`I`\> : `T`

Calculate the minimum value of the given items by applying the function.

### Example
```ts
minBy([{ 'n': 1 }, { 'n': 2 }], x => x.n)
// => {n: 1}
```

### Alternatives
- [Lodash - minBy](https://lodash.com/docs/4.17.15#minBy)

## Type Parameters

• **T** *extends* `Iterable`\<`unknown`, `any`, `any`\>

The element type.

## Parameters

### xs

`T`

The values to check.

### f

(`item`) => `string` \| `number` \| `bigint`

## Returns

`T` *extends* `Iterable`\<infer I\> ? `T` *extends* readonly [`unknown`, `...unknown[]`] ? `T`\[`number`\] : [`Maybe`](/api/type-aliases/maybe/)\<`I`\> : `T`

The minimum value of the Iterable.

## Defined in

[src/iterator/min/min.ts:61](https://github.com/skyleague/axioms/blob/75fb1c5c977f1940e84e5cdcef2be336d1fd81da/src/iterator/min/min.ts#L61)
