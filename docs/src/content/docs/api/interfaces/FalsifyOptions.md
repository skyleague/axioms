---
editUrl: false
next: false
prev: false
title: "FalsifyOptions"
---

## Type Parameters

• **T**

## Properties

### counterExample

> **counterExample**: `undefined` \| `T`

#### Defined in

[src/random/arbitrary/falsify/falsify.ts:50](https://github.com/skyleague/axioms/blob/75fb1c5c977f1940e84e5cdcef2be336d1fd81da/src/random/arbitrary/falsify/falsify.ts#L50)

***

### maxDepth

> **maxDepth**: `number`

#### Defined in

[src/random/arbitrary/falsify/falsify.ts:49](https://github.com/skyleague/axioms/blob/75fb1c5c977f1940e84e5cdcef2be336d1fd81da/src/random/arbitrary/falsify/falsify.ts#L49)

***

### predicate()

> **predicate**: (`x`) => [`Try`](/api/type-aliases/try/)\<`true`\>

#### Parameters

##### x

`T`

#### Returns

[`Try`](/api/type-aliases/try/)\<`true`\>

#### Defined in

[src/random/arbitrary/falsify/falsify.ts:48](https://github.com/skyleague/axioms/blob/75fb1c5c977f1940e84e5cdcef2be336d1fd81da/src/random/arbitrary/falsify/falsify.ts#L48)

***

### tests

> **tests**: `number`

#### Defined in

[src/random/arbitrary/falsify/falsify.ts:52](https://github.com/skyleague/axioms/blob/75fb1c5c977f1940e84e5cdcef2be336d1fd81da/src/random/arbitrary/falsify/falsify.ts#L52)

***

### timeout

> **timeout**: `number` \| `false`

#### Defined in

[src/random/arbitrary/falsify/falsify.ts:51](https://github.com/skyleague/axioms/blob/75fb1c5c977f1940e84e5cdcef2be336d1fd81da/src/random/arbitrary/falsify/falsify.ts#L51)

***

### values()

> **values**: () => `Iterator`\<[`Try`](/api/type-aliases/try/)\<[`Tree`](/api/interfaces/tree/)\<`T`\>\>, `any`, `any`\>

#### Returns

`Iterator`\<[`Try`](/api/type-aliases/try/)\<[`Tree`](/api/interfaces/tree/)\<`T`\>\>, `any`, `any`\>

#### Defined in

[src/random/arbitrary/falsify/falsify.ts:47](https://github.com/skyleague/axioms/blob/75fb1c5c977f1940e84e5cdcef2be336d1fd81da/src/random/arbitrary/falsify/falsify.ts#L47)
