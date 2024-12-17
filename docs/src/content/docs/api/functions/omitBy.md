---
editUrl: false
next: false
prev: false
title: "omitBy"
---

> **omitBy**\<`T`, `Predicate`\>(`obj`, `predicate`): `Partial`\<`T`\>

Create a new object with all the properties excluded for which the predicate hold true.

### Example
```ts
omitBy({foo: 1, bar: "foo"}, ([, v]) => isNumber(v))
// => {bar: "foo"}
```

### Alternatives
- [Lodash - omitBy](https://lodash.com/docs/4.17.15#omitBy)

## Type Parameters

• **T** *extends* `object` \| `ArrayLike`\<`unknown`\>

• **Predicate** *extends* (`__namedParameters`) => `boolean`

## Parameters

### obj

`T`

The object to take the properties from.

### predicate

`Predicate`

The function that must hold true for the property to be excluded.

## Returns

`Partial`\<`T`\>

The constructed object.

## Defined in

[src/object/omit/omit.ts:38](https://github.com/skyleague/axioms/blob/75fb1c5c977f1940e84e5cdcef2be336d1fd81da/src/object/omit/omit.ts#L38)
