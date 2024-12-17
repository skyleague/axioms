---
editUrl: false
next: false
prev: false
title: "mulberry32"
---

> **mulberry32**(`seed`): [`Mulberry32Generator`](/api/interfaces/mulberry32generator/)

A mulberry32 implementation to generate values between 0 and 1.

### Example
```ts
sha256('hello world')
// => "b94d27b9934d3e08a52e52d7da7dabfac484efe37a5380ee9088f7ace2efcde9"
```

## Parameters

### seed

`number`

The seed for the random number generator.

## Returns

[`Mulberry32Generator`](/api/interfaces/mulberry32generator/)

A generator function that returns a random number between 0 and 1.

## Defined in

[src/random/rng/mulberry32/mulberry32.ts:19](https://github.com/skyleague/axioms/blob/75fb1c5c977f1940e84e5cdcef2be336d1fd81da/src/random/rng/mulberry32/mulberry32.ts#L19)
