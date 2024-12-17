---
editUrl: false
next: false
prev: false
title: "nullable"
---

> **nullable**\<`T`\>(`a`, `constraints`): [`Dependent`](/api/interfaces/dependent/)\<`T` \| `null`\>

It takes an arbitrary and returns a new arbitrary that can generate null values.

### Example
```ts
random(nullable(integer()))
// => null

random(nullable(integer()))
// => 1234

random(nullable(integer({symbol: Nothing})))
// => Nothing
```

## Type Parameters

• **T**

## Parameters

### a

[`Arbitrary`](/api/interfaces/arbitrary/)\<`T`\>

### constraints

[`MaybePartial`](/api/type-aliases/maybepartial/)\<`NullableGenerator`\> = `{}`

The constraints used to generate arbitrary values.

## Returns

[`Dependent`](/api/interfaces/dependent/)\<`T` \| `null`\>

An nullable version of the given arbitrary.

## Defined in

[src/random/types/helper/helper.ts:78](https://github.com/skyleague/axioms/blob/75fb1c5c977f1940e84e5cdcef2be336d1fd81da/src/random/types/helper/helper.ts#L78)
