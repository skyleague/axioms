---
editUrl: false
next: false
prev: false
title: "arrayWith"
---

> **arrayWith**\<`T`, `Min`\>(`predicate`, `arbitrary`, `constraints`): [`Dependent`](/api/interfaces/dependent/)\<`ArrayOf`\<`T`, `Min`\>\>

:::caution[Experimental]
This API should not be used in production and may be trimmed from a public release.
:::

## Type Parameters

• **T**

• **Min** *extends* `number` = `number`

## Parameters

### predicate

(`x`, `xs`, `skippedInRow`, `constraints`) => [`Try`](/api/type-aliases/try/)\<`boolean`\>

### arbitrary

[`Arbitrary`](/api/interfaces/arbitrary/)\<`T`\>

### constraints

[`MaybePartial`](/api/type-aliases/maybepartial/)\<`ArrayWithGenerator`\<`T`, `Min`\>\> = `{}`

## Returns

[`Dependent`](/api/interfaces/dependent/)\<`ArrayOf`\<`T`, `Min`\>\>

## Defined in

[src/random/types/array/array.ts:119](https://github.com/skyleague/axioms/blob/75fb1c5c977f1940e84e5cdcef2be336d1fd81da/src/random/types/array/array.ts#L119)
