---
editUrl: false
next: false
prev: false
title: "fromEntries"
---

> **fromEntries**\<`T`\>(`entries`): `{ [K in T[number] as K[0]]: K[1] }`

Returns an object created by key-value entries for properties and methods.

### Example
```ts
fromEntries([["foo", "bar"]])
// => {foo: "bar"}

fromEntries([])
// => {}
```

### Alternatives
- [ECMAScript Object.fromEntries](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries)
- [Lodash - fromPairs](https://lodash.com/docs/4.17.15#fromPairs)

## Type Parameters

• **T** *extends* readonly readonly [`PropertyKey`, `unknown`][]

## Parameters

### entries

`T`

## Returns

`{ [K in T[number] as K[0]]: K[1] }`

The constructed object.

## Defined in

[src/object/from-entries/from-entries.ts:22](https://github.com/skyleague/axioms/blob/75fb1c5c977f1940e84e5cdcef2be336d1fd81da/src/object/from-entries/from-entries.ts#L22)
