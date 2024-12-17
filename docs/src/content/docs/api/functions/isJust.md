---
editUrl: false
next: false
prev: false
title: "isJust"
---

> **isJust**\<`T`\>(`x`): `x is Just<T>`

Checks if `x` is not [Nothing](../../../../../../api/type-aliases/nothing).

### Example
```ts
isJust(1234)
// => true

isJust("foobar")
// => true

isJust(Nothing)
// => false
```

## Type Parameters

• **T**

The type of value `x`.

## Parameters

### x

[`Maybe`](/api/type-aliases/maybe/)\<`T`\>

The value to check.

## Returns

`x is Just<T>`

`false` if `x` is [Nothing](/api/api/type-aliases/nothing/), `true` otherwise.

## See

[isNothing](../../../../../../api/functions/isnothing)

## Defined in

[src/guard/is-just/is-just.ts:31](https://github.com/skyleague/axioms/blob/75fb1c5c977f1940e84e5cdcef2be336d1fd81da/src/guard/is-just/is-just.ts#L31)
