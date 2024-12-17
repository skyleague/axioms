---
editUrl: false
next: false
prev: false
title: "isSuccess"
---

> **isSuccess**\<`T`\>(`x`): `x is Success<T>`

Checks if `x` is a [Success](../../../../../../api/type-aliases/success).

### Example
```ts
isSuccess("foobar")
// => true

isSuccess(new Error())
// => false
```

## Type Parameters

• **T**

## Parameters

### x

`T`

The value to check.

## Returns

`x is Success<T>`

`true` if `x` is a [Success](/api/api/type-aliases/success/), `false` otherwise.

## Defined in

[src/guard/is-success/is-success.ts:22](https://github.com/skyleague/axioms/blob/75fb1c5c977f1940e84e5cdcef2be336d1fd81da/src/guard/is-success/is-success.ts#L22)
