---
editUrl: false
next: false
prev: false
title: "keysOf"
---

> **keysOf**\<`T`\>(`obj`): `KeysOf`\<`T`\>

Returns the names of the enumerable string properties and methods of an object.

### Example
```ts
keysOf({foo: "bar"})
// => ["foo"]

keysOf({})
// => []
```

### Alternatives
- [ECMAScript Object.keys](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys)
- [Lodash - keys](https://lodash.com/docs/4.17.15#keys)

## Type Parameters

• **T** *extends* `object` \| `ArrayLike`\<`unknown`\>

## Parameters

### obj

`T`

The object to get the keys from.

## Returns

`KeysOf`\<`T`\>

The keys as an array.

## Defined in

[src/object/keys-of/keys-of.ts:26](https://github.com/skyleague/axioms/blob/75fb1c5c977f1940e84e5cdcef2be336d1fd81da/src/object/keys-of/keys-of.ts#L26)
