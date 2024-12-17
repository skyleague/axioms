---
editUrl: false
next: false
prev: false
title: "pickBy"
---

> **pickBy**\<`T`, `Predicate`\>(`obj`, `predicate`): `Partial`\<`T`\>

Create a new object with all the properties for which the predicate hold true.

### Example
```ts
pickBy({foo: 1, bar: "foo"}, ([, v]) => isNumber(v))
// => {foo: 1}
```

### Alternatives
- [Lodash - pickBy](https://lodash.com/docs/4.17.15#pickBy)

## Type Parameters

• **T** *extends* `object` \| `ArrayLike`\<`unknown`\>

• **Predicate** *extends* (`__namedParameters`) => `boolean`

## Parameters

### obj

`T`

The object to take the properties from.

### predicate

`Predicate`

The function that must hold true for the property to be included.

## Returns

`Partial`\<`T`\>

The constructed object.

## Defined in

[src/object/pick/pick.ts:21](https://github.com/skyleague/axioms/blob/75fb1c5c977f1940e84e5cdcef2be336d1fd81da/src/object/pick/pick.ts#L21)
