---
editUrl: false
next: false
prev: false
title: "record"
---

> **record**\<`T`, `K`\>(`keyValue`, `context`): [`Dependent`](/api/interfaces/dependent/)\<`Record`\<`string`, `T`\>\>

It returns an arbitrary that generates a dictionary (string key) value.

### Example
```ts
random(dict())
// => {"&o(l%": ""}
```

## Type Parameters

• **T**

• **K** *extends* `PropertyKey`

## Parameters

### keyValue

The arbitraries to use for key/value.

[`Arbitrary`](/api/interfaces/arbitrary/)\<`T`\> | [[`Arbitrary`](/api/interfaces/arbitrary/)\<`K`\>, [`Arbitrary`](/api/interfaces/arbitrary/)\<`T`\>]

### context

[`MaybePartial`](/api/type-aliases/maybepartial/)\<[`RecordGenerator`](/api/interfaces/recordgenerator/)\> = `{}`

## Returns

[`Dependent`](/api/interfaces/dependent/)\<`Record`\<`string`, `T`\>\>

A dictionary arbitrary.

## Defined in

[src/random/types/record/record.ts:30](https://github.com/skyleague/axioms/blob/75fb1c5c977f1940e84e5cdcef2be336d1fd81da/src/random/types/record/record.ts#L30)
