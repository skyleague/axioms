---
editUrl: false
next: false
prev: false
title: "oneOf"
---

> **oneOf**\<`T`\>(...`arbitraries`): [`Dependent`](/api/interfaces/dependent/)\<`TypeOfArbitraries`\<`T`\>\>

It generates an integer between 0 and the number of arbitraries passed in, and then generates a
value from the corresponding arbitrary.

### Example
```ts
random(oneOf(object({foo: string()}), object({bar: string()})))
// => {foo: "bar"}

random(oneOf(object({foo: string()}), object({bar: string()})))
// => {bar: "foo"}
```

## Type Parameters

• **T** *extends* [`Arbitrary`](/api/interfaces/arbitrary/)\<`unknown`\>[]

## Parameters

### arbitraries

...[`...T[]`]

The arbitraries to select one of.

## Returns

[`Dependent`](/api/interfaces/dependent/)\<`TypeOfArbitraries`\<`T`\>\>

An arbitrary that is randomly chosen from the list.

## Defined in

[src/random/types/one-of/one-of.ts:31](https://github.com/skyleague/axioms/blob/75fb1c5c977f1940e84e5cdcef2be336d1fd81da/src/random/types/one-of/one-of.ts#L31)
