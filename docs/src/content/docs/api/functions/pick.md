---
editUrl: false
next: false
prev: false
title: "pick"
---

> **pick**\<`T`, `K`\>(`obj`, `keys`): `Simplify`\<`Pick`\<`T`, `K`\>\>

It takes an object and an array of keys, and returns a new object with only those keys.

### Example
```ts
pick({foo: "bar", bar: "foo"}, ["foo"])
// => {foo: "bar"}

pick({foo: "bar", bar: "foo"}, [])
// => {}
```

### Alternatives
- [Lodash - pick](https://lodash.com/docs/4.17.15#pick)

## Type Parameters

• **T** *extends* `object` \| `ArrayLike`\<`unknown`\>

• **K** *extends* `string` \| `number` \| `symbol`

## Parameters

### obj

`T`

The object to take the properties from.

### keys

readonly `K`[]

The keys to select on the object.

## Returns

`Simplify`\<`Pick`\<`T`, `K`\>\>

The constructed object.

## Defined in

[src/object/pick/pick.ts:51](https://github.com/skyleague/axioms/blob/75fb1c5c977f1940e84e5cdcef2be336d1fd81da/src/object/pick/pick.ts#L51)
