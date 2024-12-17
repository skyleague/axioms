---
editUrl: false
next: false
prev: false
title: "primitive"
---

## Call Signature

> **primitive**(`context`): [`Dependent`](/api/interfaces/dependent/)\<`Primitive`\>

It returns an arbitrary that generates primitives.

### Example
```ts
random(primitive())
// => null

random(primitive())
// => Symbol(4EM)
```

### Parameters

#### context

[`MaybePartial`](/api/type-aliases/maybepartial/)\<[`PrimitiveGenerator`](/api/interfaces/primitivegenerator/)\> & `object`

### Returns

[`Dependent`](/api/interfaces/dependent/)\<`Primitive`\>

A primitive arbitrary.

### Defined in

[src/random/types/complex/complex.ts:119](https://github.com/skyleague/axioms/blob/75fb1c5c977f1940e84e5cdcef2be336d1fd81da/src/random/types/complex/complex.ts#L119)

## Call Signature

> **primitive**(`context`?): [`Dependent`](/api/interfaces/dependent/)\<[`Maybe`](/api/type-aliases/maybe/)\<`Primitive`\>\>

It returns an arbitrary that generates primitives.

### Example
```ts
random(primitive())
// => null

random(primitive())
// => Symbol(4EM)
```

### Parameters

#### context?

[`MaybePartial`](/api/type-aliases/maybepartial/)\<[`PrimitiveGenerator`](/api/interfaces/primitivegenerator/)\>

### Returns

[`Dependent`](/api/interfaces/dependent/)\<[`Maybe`](/api/type-aliases/maybe/)\<`Primitive`\>\>

A primitive arbitrary.

### Defined in

[src/random/types/complex/complex.ts:120](https://github.com/skyleague/axioms/blob/75fb1c5c977f1940e84e5cdcef2be336d1fd81da/src/random/types/complex/complex.ts#L120)
