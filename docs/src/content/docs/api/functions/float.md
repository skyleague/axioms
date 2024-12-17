---
editUrl: false
next: false
prev: false
title: "float"
---

> **float**(`constraints`): [`Integrated`](/api/interfaces/integrated/)\<`FloatConstraints`, `number`\>

It returns an arbitrary that generates a random floating point number between -2,147,483,648 and
2,147,483,647.

### Example
```ts
random(float())
// => 3.158

random(float())
// => 552579827.575685
```

## Parameters

### constraints

[`MaybePartial`](/api/type-aliases/maybepartial/)\<[`FloatGenerator`](/api/interfaces/floatgenerator/)\> = `{}`

The constraints used to generate arbitrary values.

## Returns

[`Integrated`](/api/interfaces/integrated/)\<`FloatConstraints`, `number`\>

An arbitrary that generates a random float between -2^31 and 2^31

## Defined in

[src/random/types/float/float.ts:66](https://github.com/skyleague/axioms/blob/75fb1c5c977f1940e84e5cdcef2be336d1fd81da/src/random/types/float/float.ts#L66)
