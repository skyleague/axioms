---
editUrl: false
next: false
prev: false
title: "forAll"
---

> **forAll**\<`T`\>(`arbitrary`, `predicate`, `__namedParameters`): `void`

## Type Parameters

• **T** *extends* `unknown`

## Parameters

### arbitrary

`T`

### predicate

(`x`, `context`) => `boolean` \| `void`

### \_\_namedParameters

`Partial`\<[`ForallOptions`](/api/interfaces/foralloptions/)\<`TypeOfArbitrary`\<`AsArbitrary`\<`T`\>\>\>\> = `{}`

## Returns

`void`

## Defined in

[src/random/arbitrary/forall/forall.ts:83](https://github.com/skyleague/axioms/blob/75fb1c5c977f1940e84e5cdcef2be336d1fd81da/src/random/arbitrary/forall/forall.ts#L83)
