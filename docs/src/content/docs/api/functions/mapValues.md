---
editUrl: false
next: false
prev: false
title: "mapValues"
---

> **mapValues**\<`T`, `Mapper`\>(`obj`, `mapper`): `{ [K in keyof T]: Mapper extends (v: T[K], k: K) => infer O ? O : never }`

Returns an object with same keys, where the original values are converted using a mapper.

### Example
```ts
mapValues({ foo: 0, bar: 2 }, (x) => x + 1)
// => { foo: 1, bar: 3 }
```

### Alternatives
- [Lodash - mapValues](https://lodash.com/docs/4.17.15#mapValues)

## Type Parameters

• **T** *extends* `object` \| `ArrayLike`\<`unknown`\>

• **Mapper** *extends* (`v`, `k`) => `unknown`

## Parameters

### obj

`T`

The object to map the values from.

### mapper

`Mapper`

## Returns

`{ [K in keyof T]: Mapper extends (v: T[K], k: K) => infer O ? O : never }`

The keys as an array.

## Defined in

[src/object/map-values/map-values.ts:21](https://github.com/skyleague/axioms/blob/75fb1c5c977f1940e84e5cdcef2be336d1fd81da/src/object/map-values/map-values.ts#L21)
