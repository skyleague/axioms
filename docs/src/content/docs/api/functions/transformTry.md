---
editUrl: false
next: false
prev: false
title: "transformTry"
---

> **transformTry**\<`T`, `U`\>(`x`, `s`, `f`): `TryPromise`\<`U`\> *extends* `Promise`\<[`Try`](/api/type-aliases/try/)\<`_P`\>\> ? `Promise`\<[`Try`](/api/type-aliases/try/)\<`_P`\>\> : `TryPromise`\<`U`\> *extends* [`Try`](/api/type-aliases/try/)\<`_V`\> ? [`Try`](/api/type-aliases/try/)\<`_V`\> : [`Try`](/api/type-aliases/try/)\<`TryPromise`\<`U`\>\>

This transform takes a function for either a `Success` or a `Failure` value. Depending
on the state of the `Try`, it will apply the correct transformation and give back the result.

Any thrown exceptions during the transformation will be caught and set as `Failure` value.

### Example
```ts
transformTry("foobar", s => `${s}${s}`, f => `failure`)
// => "foobarfoobar"

transformTry(new Error("foobar"), s => `${s}${s}`, f => `failure`)
// => "failure"
```

## Type Parameters

• **T** *extends* `unknown`

The input type.

• **U**

The transformed type.

## Parameters

### x

`T`

The `Try` to transform.

### s

(`e`) => `TryPromise`\<`U`\>

The success transform.

### f

(`e`) => `TryPromise`\<`U`\>

The failure transform.

## Returns

`TryPromise`\<`U`\> *extends* `Promise`\<[`Try`](/api/type-aliases/try/)\<`_P`\>\> ? `Promise`\<[`Try`](/api/type-aliases/try/)\<`_P`\>\> : `TryPromise`\<`U`\> *extends* [`Try`](/api/type-aliases/try/)\<`_V`\> ? [`Try`](/api/type-aliases/try/)\<`_V`\> : [`Try`](/api/type-aliases/try/)\<`TryPromise`\<`U`\>\>

The transformed `Try`.

## Defined in

[src/data/try/try.ts:121](https://github.com/skyleague/axioms/blob/75fb1c5c977f1940e84e5cdcef2be336d1fd81da/src/data/try/try.ts#L121)
