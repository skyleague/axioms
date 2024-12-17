---
editUrl: false
next: false
prev: false
title: "unknown"
---

## Call Signature

> **unknown**(`context`): [`Dependent`](/api/interfaces/dependent/)\<`boolean` \| `number` \| `string` \| `null` \| `undefined`\>

It returns an arbitrary that generates unknown values.

### Example
```ts
random(unknown())
// => [false, false, 123]

random(unknown())
// => ""
```

### Parameters

#### context

[`MaybePartial`](/api/type-aliases/maybepartial/)\<[`UnknownGenerator`](/api/type-aliases/unknowngenerator/)\> & `object`

### Returns

[`Dependent`](/api/interfaces/dependent/)\<`boolean` \| `number` \| `string` \| `null` \| `undefined`\>

An unknown arbitrary.

### Defined in

[src/random/types/complex/complex.ts:178](https://github.com/skyleague/axioms/blob/75fb1c5c977f1940e84e5cdcef2be336d1fd81da/src/random/types/complex/complex.ts#L178)

## Call Signature

> **unknown**(`context`?): [`Dependent`](/api/interfaces/dependent/)\<[`Nothing`](/api/type-aliases/nothing/) \| `boolean` \| `number` \| `string` \| `null` \| `undefined`\>

It returns an arbitrary that generates unknown values.

### Example
```ts
random(unknown())
// => [false, false, 123]

random(unknown())
// => ""
```

### Parameters

#### context?

[`MaybePartial`](/api/type-aliases/maybepartial/)\<[`UnknownGenerator`](/api/type-aliases/unknowngenerator/)\>

### Returns

[`Dependent`](/api/interfaces/dependent/)\<[`Nothing`](/api/type-aliases/nothing/) \| `boolean` \| `number` \| `string` \| `null` \| `undefined`\>

An unknown arbitrary.

### Defined in

[src/random/types/complex/complex.ts:181](https://github.com/skyleague/axioms/blob/75fb1c5c977f1940e84e5cdcef2be336d1fd81da/src/random/types/complex/complex.ts#L181)
