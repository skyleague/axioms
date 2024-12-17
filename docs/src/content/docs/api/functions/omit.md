---
editUrl: false
next: false
prev: false
title: "omit"
---

> **omit**\<`T`, `K`\>(`obj`, `keys`): `Simplify`\<`Except`\<`T`, `K`, \{ `requireExactProps`: `true`; \}\>\>

It takes an object and an array of keys, and returns a new object with those keys excluded.

### Example
```ts
omit({foo: "bar", bar: "foo"}, ["foo"])
// => {bar: "foo"}

omit({foo: "bar", bar: "foo"}, [])
// => {foo: "bar", bar: "foo"}
```

### Alternatives
- [Lodash - omit](https://lodash.com/docs/4.17.15#omit)

## Type Parameters

• **T** *extends* `object` \| `ArrayLike`\<`unknown`\>

• **K** *extends* `string` \| `number` \| `symbol`

## Parameters

### obj

`T`

The object to take the properties from.

### keys

readonly `K`[]

The keys to omit on the object.

## Returns

`Simplify`\<`Except`\<`T`, `K`, \{ `requireExactProps`: `true`; \}\>\>

The constructed object.

## Defined in

[src/object/omit/omit.ts:68](https://github.com/skyleague/axioms/blob/75fb1c5c977f1940e84e5cdcef2be336d1fd81da/src/object/omit/omit.ts#L68)
