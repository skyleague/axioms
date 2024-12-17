---
editUrl: false
next: false
prev: false
title: "object"
---

> **object**\<`T`\>(`properties`): [`Dependent`](/api/interfaces/dependent/)\<`{ [K in keyof T]: T[K] extends { value: any } ? Value : never }`\>

It takes an object of arbitraries and returns an arbitrary of an object of values.

### Example
```ts
random(object({foo: integer()}))
// => {foo: 921604357}

random(object({foo: integer()}))
// => {foo: 511147728}
```

## Type Parameters

• **T** *extends* `Record`\<`PropertyKey`, [`Arbitrary`](/api/interfaces/arbitrary/)\<`unknown`\>\>

## Parameters

### properties

`T`

The properties of the arbitrary.

## Returns

[`Dependent`](/api/interfaces/dependent/)\<`{ [K in keyof T]: T[K] extends { value: any } ? Value : never }`\>

An object with the same keys as the input object, but with the values being the return
         value of the value function of the input object.

## Defined in

[src/random/types/object/object.ts:27](https://github.com/skyleague/axioms/blob/75fb1c5c977f1940e84e5cdcef2be336d1fd81da/src/random/types/object/object.ts#L27)
