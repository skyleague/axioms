---
editUrl: false
next: false
prev: false
title: "asMaybe"
---

> **asMaybe**\<`T`, `N`\>(`x`, `nothingValue`?): [`N`] *extends* [`T`] ? `IsEqual`\<`T`, `N`\> *extends* `true` ? [`Nothing`](/api/type-aliases/nothing/) : [`Maybe`](/api/type-aliases/maybe/)\<`Exclude`\<`T`, `N`\>\> : `Exclude`\<`T`, `N`\>

Creates a Maybe from the given value.

### Example
```ts
asMaybe("foobar")
// => "foobar"

asMaybe("foobar", "foobar")
// => Nothing

asMaybe("foobar", "barfoo")
// => "foobar"
```

## Type Parameters

• **T**

The Maybe type.

• **N** = `undefined`

## Parameters

### x

`T`

The value to unpack.

### nothingValue?

`N`

The value to use as Nothing.

## Returns

[`N`] *extends* [`T`] ? `IsEqual`\<`T`, `N`\> *extends* `true` ? [`Nothing`](/api/type-aliases/nothing/) : [`Maybe`](/api/type-aliases/maybe/)\<`Exclude`\<`T`, `N`\>\> : `Exclude`\<`T`, `N`\>

The maybe value.

## Defined in

[src/data/maybe/maybe.ts:326](https://github.com/skyleague/axioms/blob/75fb1c5c977f1940e84e5cdcef2be336d1fd81da/src/data/maybe/maybe.ts#L326)
