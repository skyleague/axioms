---
editUrl: false
next: false
prev: false
title: "entriesOf"
---

> **entriesOf**\<`T`\>(`obj`): `T` *extends* `UnknownArray` ? [`string`, `ArrayValues`\<`T`\>][] : `{ [K in keyof T]: [K, T[K]] }`\[keyof `T`\][]

Returns an array of key/values of the enumerable properties of an object.

### Example
```ts
entriesOf({foo: "bar"})
// => [["foo", "bar"]]

entriesOf({})
// => []
```

### Alternatives
- [ECMAScript Object.entries](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries)
- [Lodash - toPairs](https://lodash.com/docs/4.17.15#toPairs)

## Type Parameters

• **T** *extends* `object` \| `ArrayLike`\<`unknown`\>

## Parameters

### obj

`T`

The object to get the entries from.

## Returns

`T` *extends* `UnknownArray` ? [`string`, `ArrayValues`\<`T`\>][] : `{ [K in keyof T]: [K, T[K]] }`\[keyof `T`\][]

The array with key/values.

## Defined in

[src/object/entries-of/entries-of.ts:24](https://github.com/skyleague/axioms/blob/75fb1c5c977f1940e84e5cdcef2be336d1fd81da/src/object/entries-of/entries-of.ts#L24)
