---
editUrl: false
next: false
prev: false
title: "asArray"
---

> **asArray**\<`T`\>(`x`): `T`[]

Returns `x` as array if it is not an array type.

### Example
```ts
asArray(1)
// => [1]

asArray([2, 3, 4])
// => [2, 3, 4]
```

### Alternatives
- [Lodash - castArray](https://lodash.com/docs/#castArray)

## Type Parameters

• **T**

The value type.

## Parameters

### x

The value to cast.

`T` | `T`[]

## Returns

`T`[]

`x` interpreted as array.

## Defined in

[src/guard/as-array/as-array.ts:25](https://github.com/skyleague/axioms/blob/75fb1c5c977f1940e84e5cdcef2be336d1fd81da/src/guard/as-array/as-array.ts#L25)
