---
editUrl: false
next: false
prev: false
title: "constant"
---

> **constant**\<`T`\>(`x`): [`Dependent`](/api/interfaces/dependent/)\<`T`\>

It takes a constant value and creates an arbitrary out of it.

### Example
```ts
random(constant("foobar"))
// => "foobar"

random(constant(1))
// => 1
```

## Type Parameters

• **T**

## Parameters

### x

`T`

The constant to make arbitrary.

## Returns

[`Dependent`](/api/interfaces/dependent/)\<`T`\>

A constant arbitrary.

## Defined in

[src/random/types/helper/helper.ts:99](https://github.com/skyleague/axioms/blob/75fb1c5c977f1940e84e5cdcef2be336d1fd81da/src/random/types/helper/helper.ts#L99)
