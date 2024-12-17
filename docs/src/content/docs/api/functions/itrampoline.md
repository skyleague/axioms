---
editUrl: false
next: false
prev: false
title: "itrampoline"
---

> **itrampoline**\<`T`, `R`\>(`f`): (...`args`) => `Generator`\<`R`, `R`, `unknown`\>

## Type Parameters

• **T** *extends* readonly `unknown`[]

• **R**

## Parameters

### f

(...`args`) => [`RecurrentGenerator`](/api/type-aliases/recurrentgenerator/)\<`R`\>

## Returns

`Function`

### Parameters

#### args

...[`...T[]`]

### Returns

`Generator`\<`R`, `R`, `unknown`\>

## Defined in

[src/util/trampoline/trampoline.ts:4](https://github.com/skyleague/axioms/blob/75fb1c5c977f1940e84e5cdcef2be336d1fd81da/src/util/trampoline/trampoline.ts#L4)
