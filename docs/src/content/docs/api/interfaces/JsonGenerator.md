---
editUrl: false
next: false
prev: false
title: "JsonGenerator"
---

Describes how json values are allowed to be generated.

## Properties

### size?

> `optional` **size**: [`ArbitrarySize`](/api/type-aliases/arbitrarysize/)

#### Defined in

[src/random/types/complex/complex.ts:35](https://github.com/skyleague/axioms/blob/75fb1c5c977f1940e84e5cdcef2be336d1fd81da/src/random/types/complex/complex.ts#L35)

***

### type

> **type**: `"object"` \| `"value"` \| `"array"`

Determines the type of json values:
* object - generates a json object (default)
* array - generates a json array
* value - generates a primitive/object/array value

#### Defined in

[src/random/types/complex/complex.ts:34](https://github.com/skyleague/axioms/blob/75fb1c5c977f1940e84e5cdcef2be336d1fd81da/src/random/types/complex/complex.ts#L34)

***

### utf

> **utf**: `boolean`

Controls whether strings should be generated with utf16.

#### Defined in

[src/random/types/complex/complex.ts:27](https://github.com/skyleague/axioms/blob/75fb1c5c977f1940e84e5cdcef2be336d1fd81da/src/random/types/complex/complex.ts#L27)
