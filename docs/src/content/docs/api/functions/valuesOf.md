---
editUrl: false
next: false
prev: false
title: "valuesOf"
---

> **valuesOf**\<`T`\>(`obj`): `ValuesOf`\<`T`\>

Returns an array of values of the enumerable properties of an object.

### Example
```ts
valuesOf({foo: "bar"})
// => ["bar"]

valuesOf({})
// => []
```

### Alternatives
- [ECMAScript Object.values](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/values)
- [Lodash - values](https://lodash.com/docs/4.17.15#values)

## Type Parameters

• **T** *extends* `object` \| `ArrayLike`\<`unknown`\>

## Parameters

### obj

`T`

The object to get the values from.

## Returns

`ValuesOf`\<`T`\>

The values as an array.

## Defined in

[src/object/values-of/values-of.ts:26](https://github.com/skyleague/axioms/blob/75fb1c5c977f1940e84e5cdcef2be336d1fd81da/src/object/values-of/values-of.ts#L26)
