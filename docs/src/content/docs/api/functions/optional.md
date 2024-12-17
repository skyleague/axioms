---
editUrl: false
next: false
prev: false
title: "optional"
---

> **optional**\<`T`, `O`\>(`arbitrary`, `constraints`): [`Nothing`](/api/type-aliases/nothing/) *extends* `O` ? [`Dependent`](/api/interfaces/dependent/)\<[`Maybe`](/api/type-aliases/maybe/)\<`T`\>\> : [`Dependent`](/api/interfaces/dependent/)\<`O` \| `T`\>

`optional` takes an arbitrary and returns an arbitrary that is either the original arbitrary or the
optional symbol

### Example
```ts
random(optional(integer()))
// => Nothing

random(optional(integer()))
// => 1234

random(optional(integer({symbol: undefined})))
// => undefined
```

## Type Parameters

• **T**

• **O** = *typeof* [`Nothing`](/api/variables/nothing/)

## Parameters

### arbitrary

[`Arbitrary`](/api/interfaces/arbitrary/)\<`T`\>

The arbitrary to make optional.

### constraints

[`MaybePartial`](/api/type-aliases/maybepartial/)\<[`OptionalGenerator`](/api/interfaces/optionalgenerator/)\<`O`\>\> = `{}`

The constraints used to generate arbitrary values.

## Returns

[`Nothing`](/api/type-aliases/nothing/) *extends* `O` ? [`Dependent`](/api/interfaces/dependent/)\<[`Maybe`](/api/type-aliases/maybe/)\<`T`\>\> : [`Dependent`](/api/interfaces/dependent/)\<`O` \| `T`\>

An optional version of the given arbitrary.

## Defined in

[src/random/types/helper/helper.ts:37](https://github.com/skyleague/axioms/blob/75fb1c5c977f1940e84e5cdcef2be336d1fd81da/src/random/types/helper/helper.ts#L37)
