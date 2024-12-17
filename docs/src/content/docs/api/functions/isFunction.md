---
editUrl: false
next: false
prev: false
title: "isFunction"
---

> **isFunction**\<`T`\>(`f`): `f is T`

Checks if `f` is classified as Function.

### Example
```ts
isFunction(() => true))
// => true

isFunction("foobar")
// => false
```

### Alternatives
- [Lodash - isFunction]https://lodash.com/docs/#isError)

## Type Parameters

• **T** *extends* `Function`

## Parameters

### f

`unknown`

## Returns

`f is T`

`true` if `x` is a Function, `false` otherwise.

## Defined in

[src/guard/is-function/is-function.ts:23](https://github.com/skyleague/axioms/blob/75fb1c5c977f1940e84e5cdcef2be336d1fd81da/src/guard/is-function/is-function.ts#L23)
