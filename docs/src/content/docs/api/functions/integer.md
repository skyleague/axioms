---
editUrl: false
next: false
prev: false
title: "integer"
---

> **integer**(`constraints`): [`Integrated`](/api/interfaces/integrated/)\<`IntegerConstraints`, `number`\>

It returns an arbitrary that generates integers between -2^31 and 2^31.

### Example
```ts
random(integer())
// => 123
```

## Parameters

### constraints

[`MaybePartial`](/api/type-aliases/maybepartial/)\<[`IntegerGenerator`](/api/interfaces/integergenerator/)\> = `{}`

The constraints used to generate arbitrary values.

## Returns

[`Integrated`](/api/interfaces/integrated/)\<`IntegerConstraints`, `number`\>

An arbitrary that generates integers.

## Defined in

[src/random/types/integer/integer.ts:98](https://github.com/skyleague/axioms/blob/75fb1c5c977f1940e84e5cdcef2be336d1fd81da/src/random/types/integer/integer.ts#L98)
