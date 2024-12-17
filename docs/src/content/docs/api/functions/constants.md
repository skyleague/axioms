---
editUrl: false
next: false
prev: false
title: "constants"
---

> **constants**\<`T`\>(...`consts`): [`Dependent`](/api/interfaces/dependent/)\<`T`\[`number`\]\>

A function that generates a dependent type for a given set of enumerated values.

### Example
```ts
random(constants("foo", "bar"))
// => "foo"
```

## Type Parameters

• **T** *extends* `unknown`[]

## Parameters

### consts

...[`...T[]`]

The set of enumerated values to use.

## Returns

[`Dependent`](/api/interfaces/dependent/)\<`T`\[`number`\]\>

A dependent type that generates values from the provided set of enumerated values.

## Defined in

[src/random/types/constants/constants.ts:19](https://github.com/skyleague/axioms/blob/75fb1c5c977f1940e84e5cdcef2be336d1fd81da/src/random/types/constants/constants.ts#L19)
