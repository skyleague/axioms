---
editUrl: false
next: false
prev: false
title: "natural"
---

> **natural**(`constraints`): [`Integrated`](/api/interfaces/integrated/)\<[`NaturalConstraints`](/api/interfaces/naturalconstraints/), `number`\>

It returns an arbitrary that generates natural numbers between 0 and 2^31.

### Example
```ts
random(natural())
// => 123
```

## Parameters

### constraints

[`MaybePartial`](/api/type-aliases/maybepartial/)\<[`NaturalConstraints`](/api/interfaces/naturalconstraints/)\> = `{}`

The constraints used to generate arbitrary values.

## Returns

[`Integrated`](/api/interfaces/integrated/)\<[`NaturalConstraints`](/api/interfaces/naturalconstraints/), `number`\>

An arbitrary that generates natural numbers.

## Defined in

[src/random/types/natural/natural.ts:35](https://github.com/skyleague/axioms/blob/75fb1c5c977f1940e84e5cdcef2be336d1fd81da/src/random/types/natural/natural.ts#L35)
