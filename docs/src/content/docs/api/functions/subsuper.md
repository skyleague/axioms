---
editUrl: false
next: false
prev: false
title: "subsuper"
---

> **subsuper**\<`T`\>(`arbitrary`, `constraints`): [`Dependent`](/api/interfaces/dependent/)\<[`T`[], `T`[], `T`[]]\>

It generates a pair of sets, and returns the first set, the union of the two sets, and the
difference between the union and the first set

### Example
```ts
random(subsuper(integer({ min: 0, max: 100 })))
// => [[1, 2], [1, 2, 4, 5], [4, 5]]
```

## Type Parameters

• **T**

## Parameters

### arbitrary

[`Arbitrary`](/api/interfaces/arbitrary/)\<`T`\>

The arbitrary to generate a set of.

### constraints

[`MaybePartial`](/api/type-aliases/maybepartial/)\<`SubsuperGenerator`\<`T`\>\> = `{}`

The constraints to generate the set with.

## Returns

[`Dependent`](/api/interfaces/dependent/)\<[`T`[], `T`[], `T`[]]\>

An arbitrary that is randomly chosen from the weighted list.

## Defined in

[src/random/types/set/set.ts:114](https://github.com/skyleague/axioms/blob/75fb1c5c977f1940e84e5cdcef2be336d1fd81da/src/random/types/set/set.ts#L114)
