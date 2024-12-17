---
editUrl: false
next: false
prev: false
title: "asyncForAll"
---

> **asyncForAll**\<`T`\>(`arbitrary`, `predicate`, `__namedParameters`): `Promise`\<`void`\>

## Type Parameters

• **T** *extends* `unknown`

## Parameters

### arbitrary

`T`

### predicate

(`x`, `context`) => `Promise`\<`boolean` \| `void`\>

### \_\_namedParameters

`Partial`\<[`ForallOptions`](/api/interfaces/foralloptions/)\<`TypeOfArbitrary`\<`AsArbitrary`\<`T`\>\>\>\> = `{}`

## Returns

`Promise`\<`void`\>

## Defined in

[src/random/arbitrary/forall/forall.ts:124](https://github.com/skyleague/axioms/blob/75fb1c5c977f1940e84e5cdcef2be336d1fd81da/src/random/arbitrary/forall/forall.ts#L124)
