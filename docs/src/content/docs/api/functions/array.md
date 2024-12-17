---
editUrl: false
next: false
prev: false
title: "array"
---

> **array**\<`T`, `Min`\>(`arbitrary`, `constraints`): [`Dependent`](/api/interfaces/dependent/)\<`ArrayOf`\<`T`, `Min`\>\>

It generates an array of arbitrary values, with a length between `minLength` and `maxLength`, and
with unique items if `uniqueItems` is true.

### Example
```ts
random(array(integer()))
// => [1, 3, 4]
```

## Type Parameters

• **T**

• **Min** *extends* `number` = `number`

## Parameters

### arbitrary

[`Arbitrary`](/api/interfaces/arbitrary/)\<`T`\>

The arbitraries to create an array of.

### constraints

[`MaybePartial`](/api/type-aliases/maybepartial/)\<[`ArrayGenerator`](/api/interfaces/arraygenerator/)\<`T`, `Min`\>\> = `{}`

MaybePartial<ArrayGenerator<T>>

## Returns

[`Dependent`](/api/interfaces/dependent/)\<`ArrayOf`\<`T`, `Min`\>\>

An arbitrary that generates a record of all the properties of the given arbitraries.

## Defined in

[src/random/types/array/array.ts:54](https://github.com/skyleague/axioms/blob/75fb1c5c977f1940e84e5cdcef2be336d1fd81da/src/random/types/array/array.ts#L54)
