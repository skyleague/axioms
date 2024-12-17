---
editUrl: false
next: false
prev: false
title: "maxBy"
---

> **maxBy**\<`T`\>(`xs`, `f`): `T` *extends* `Iterable`\<infer I\> ? `T` *extends* readonly [`unknown`, `...unknown[]`] ? `T`\[`number`\] : [`Maybe`](/api/type-aliases/maybe/)\<`I`\> : `T`

Calculate the maximum value of the given items by applying the function.

### Example
```ts
maxBy([{ 'n': 1 }, { 'n': 2 }], x => x.n)
// => {n: 2}
```

### Alternatives
- [Lodash - maxBy](https://lodash.com/docs/4.17.15#maxBy)

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

The maximum value of the traversable.

## Defined in

[src/iterator/max/max.ts:61](https://github.com/skyleague/axioms/blob/75fb1c5c977f1940e84e5cdcef2be336d1fd81da/src/iterator/max/max.ts#L61)
