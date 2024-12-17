---
editUrl: false
next: false
prev: false
title: "ArrayGenerator"
---

Describes how arrays are allowed to be generated.

## Type Parameters

• **T**

• **Min** *extends* `number` = `number`

## Properties

### equals()?

> `optional` **equals**: (`a`, `b`) => `boolean`

Equality operator that is used to detect duplicate items.

#### Parameters

##### a

`T`

##### b

`T`

#### Returns

`boolean`

#### Defined in

[src/random/types/array/array.ts:35](https://github.com/skyleague/axioms/blob/75fb1c5c977f1940e84e5cdcef2be336d1fd81da/src/random/types/array/array.ts#L35)

***

### maxLength

> **maxLength**: `number`

The maximum length of array to generate.

#### Defined in

[src/random/types/array/array.ts:29](https://github.com/skyleague/axioms/blob/75fb1c5c977f1940e84e5cdcef2be336d1fd81da/src/random/types/array/array.ts#L29)

***

### minLength

> **minLength**: `Min`

The minimum length of array to generate.

#### Defined in

[src/random/types/array/array.ts:25](https://github.com/skyleague/axioms/blob/75fb1c5c977f1940e84e5cdcef2be336d1fd81da/src/random/types/array/array.ts#L25)

***

### size?

> `optional` **size**: [`ArbitrarySize`](/api/type-aliases/arbitrarysize/)

#### Defined in

[src/random/types/array/array.ts:31](https://github.com/skyleague/axioms/blob/75fb1c5c977f1940e84e5cdcef2be336d1fd81da/src/random/types/array/array.ts#L31)
