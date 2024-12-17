---
editUrl: false
next: false
prev: false
title: "set"
---

> **set**\<`T`, `Min`\>(`arbitrary`, `constraints`): [`Dependent`](/api/interfaces/dependent/)\<`SetOf`\<`T`, `Min`\>\>

Generate an array of values where each value is unique.

### Example
```ts
random(set(integer()))
// => [1, 2, 3]
```

## Type Parameters

• **T**

• **Min** *extends* `number` = `number`

## Parameters

### arbitrary

[`Arbitrary`](/api/interfaces/arbitrary/)\<`T`\>

The arbitrary to generate a set of.

### constraints

[`MaybePartial`](/api/type-aliases/maybepartial/)\<`SetGenerator`\<`T`, `Min`\>\> = `{}`

The constraints to generate the set with.

## Returns

[`Dependent`](/api/interfaces/dependent/)\<`SetOf`\<`T`, `Min`\>\>

An arbitrary that is randomly chosen from the weighted list.

## Defined in

[src/random/types/set/set.ts:53](https://github.com/skyleague/axioms/blob/75fb1c5c977f1940e84e5cdcef2be336d1fd81da/src/random/types/set/set.ts#L53)
