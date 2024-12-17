---
editUrl: false
next: false
prev: false
title: "isPromise"
---

> **isPromise**\<`T`\>(`x`): `x is Promise<T>`

Checks if `x` is a `Promise`.

### Example
```ts
isPromise(Promise.resolve(1))
// => true

isPromise("foo")
// => false
```

## Type Parameters

• **T**

## Parameters

### x

`unknown`

The value to check.

## Returns

`x is Promise<T>`

`true` if `x` is a `Promise`, `false` otherwise.

## Defined in

[src/guard/is-promise/is-promise.ts:19](https://github.com/skyleague/axioms/blob/75fb1c5c977f1940e84e5cdcef2be336d1fd81da/src/guard/is-promise/is-promise.ts#L19)
