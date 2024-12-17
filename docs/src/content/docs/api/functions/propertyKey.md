---
editUrl: false
next: false
prev: false
title: "propertyKey"
---

> **propertyKey**(`constraints`): [`Dependent`](/api/interfaces/dependent/)\<`PropertyKey`\>

It returns an arbitrary that generates an object property key.

### Example
```ts
random(propertyKey())
// => ""

random(propertyKey())
// => "MWxUWO93"
```

## Parameters

### constraints

[`MaybePartial`](/api/type-aliases/maybepartial/)\<[`PropertyKeyGenerator`](/api/interfaces/propertykeygenerator/)\> = `{}`

## Returns

[`Dependent`](/api/interfaces/dependent/)\<`PropertyKey`\>

An property key arbitrary.

## Defined in

[src/random/types/property-key/property-key.ts:37](https://github.com/skyleague/axioms/blob/75fb1c5c977f1940e84e5cdcef2be336d1fd81da/src/random/types/property-key/property-key.ts#L37)
