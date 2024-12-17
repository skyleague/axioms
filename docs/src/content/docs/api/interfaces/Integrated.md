---
editUrl: false
next: false
prev: false
title: "Integrated"
---

## Extends

- [`Arbitrary`](/api/interfaces/arbitrary/)\<`T`\>

## Type Parameters

• **C**

• **T**

## Properties

### chain()

> **chain**: \<`U`\>(`f`) => [`Dependent`](/api/interfaces/dependent/)\<`U`\>

#### Type Parameters

• **U**

#### Parameters

##### f

(`x`, `context`) => [`Arbitrary`](/api/interfaces/arbitrary/)\<`U`\>

#### Returns

[`Dependent`](/api/interfaces/dependent/)\<`U`\>

#### Defined in

[src/random/arbitrary/integrated/integrated.ts:22](https://github.com/skyleague/axioms/blob/75fb1c5c977f1940e84e5cdcef2be336d1fd81da/src/random/arbitrary/integrated/integrated.ts#L22)

***

### constant()

> **constant**: (`isConstant`?) => [`Dependent`](/api/interfaces/dependent/)\<`T`\>

#### Parameters

##### isConstant?

`boolean`

#### Returns

[`Dependent`](/api/interfaces/dependent/)\<`T`\>

#### Defined in

[src/random/arbitrary/integrated/integrated.ts:23](https://github.com/skyleague/axioms/blob/75fb1c5c977f1940e84e5cdcef2be336d1fd81da/src/random/arbitrary/integrated/integrated.ts#L23)

***

### constraints

> **constraints**: `C`

#### Defined in

[src/random/arbitrary/integrated/integrated.ts:14](https://github.com/skyleague/axioms/blob/75fb1c5c977f1940e84e5cdcef2be336d1fd81da/src/random/arbitrary/integrated/integrated.ts#L14)

***

### map()

> **map**: \<`U`\>(`f`) => [`Dependent`](/api/interfaces/dependent/)\<`U`\>

#### Type Parameters

• **U**

#### Parameters

##### f

(`x`, `context`) => `U`

#### Returns

[`Dependent`](/api/interfaces/dependent/)\<`U`\>

#### Defined in

[src/random/arbitrary/integrated/integrated.ts:21](https://github.com/skyleague/axioms/blob/75fb1c5c977f1940e84e5cdcef2be336d1fd81da/src/random/arbitrary/integrated/integrated.ts#L21)

***

### random()

> **random**: (`context`?) => `T`

#### Parameters

##### context?

[`ArbitraryContext`](/api/interfaces/arbitrarycontext/)

#### Returns

`T`

#### Defined in

[src/random/arbitrary/integrated/integrated.ts:17](https://github.com/skyleague/axioms/blob/75fb1c5c977f1940e84e5cdcef2be336d1fd81da/src/random/arbitrary/integrated/integrated.ts#L17)

***

### sample()

> **sample**: (`context`) => `T`

#### Parameters

##### context

[`ArbitraryContext`](/api/interfaces/arbitrarycontext/)

#### Returns

`T`

#### Defined in

[src/random/arbitrary/integrated/integrated.ts:15](https://github.com/skyleague/axioms/blob/75fb1c5c977f1940e84e5cdcef2be336d1fd81da/src/random/arbitrary/integrated/integrated.ts#L15)

***

### shrink()

> **shrink**: (`x`) => [`Tree`](/api/interfaces/tree/)\<`T`\>

#### Parameters

##### x

`T`

#### Returns

[`Tree`](/api/interfaces/tree/)\<`T`\>

#### Defined in

[src/random/arbitrary/integrated/integrated.ts:18](https://github.com/skyleague/axioms/blob/75fb1c5c977f1940e84e5cdcef2be336d1fd81da/src/random/arbitrary/integrated/integrated.ts#L18)

***

### supremumCardinality()?

> `optional` **supremumCardinality**: (`context`) => `number`

#### Parameters

##### context

`ArbitrarySizeContext`

#### Returns

`number`

#### Inherited from

[`Arbitrary`](/api/interfaces/arbitrary/).[`supremumCardinality`](/api/interfaces/arbitrary/#supremumcardinality)

#### Defined in

[src/random/arbitrary/arbitrary/arbitrary.ts:10](https://github.com/skyleague/axioms/blob/75fb1c5c977f1940e84e5cdcef2be336d1fd81da/src/random/arbitrary/arbitrary/arbitrary.ts#L10)

***

### value()

> **value**: (`context`, `x`?) => [`Tree`](/api/interfaces/tree/)\<`T`\>

#### Parameters

##### context

[`ArbitraryContext`](/api/interfaces/arbitrarycontext/)

##### x?

`T`

#### Returns

[`Tree`](/api/interfaces/tree/)\<`T`\>

#### Overrides

[`Arbitrary`](/api/interfaces/arbitrary/).[`value`](/api/interfaces/arbitrary/#value)

#### Defined in

[src/random/arbitrary/integrated/integrated.ts:16](https://github.com/skyleague/axioms/blob/75fb1c5c977f1940e84e5cdcef2be336d1fd81da/src/random/arbitrary/integrated/integrated.ts#L16)

## Methods

### filter()

#### Call Signature

> **filter**\<`S`\>(`f`): [`Dependent`](/api/interfaces/dependent/)\<`S`\>

##### Type Parameters

• **S**

##### Parameters

###### f

(`x`, `context`) => `x is S`

##### Returns

[`Dependent`](/api/interfaces/dependent/)\<`S`\>

##### Defined in

[src/random/arbitrary/integrated/integrated.ts:19](https://github.com/skyleague/axioms/blob/75fb1c5c977f1940e84e5cdcef2be336d1fd81da/src/random/arbitrary/integrated/integrated.ts#L19)

#### Call Signature

> **filter**(`f`): [`Dependent`](/api/interfaces/dependent/)\<`T`\>

##### Parameters

###### f

(`x`, `context`) => `boolean`

##### Returns

[`Dependent`](/api/interfaces/dependent/)\<`T`\>

##### Defined in

[src/random/arbitrary/integrated/integrated.ts:20](https://github.com/skyleague/axioms/blob/75fb1c5c977f1940e84e5cdcef2be336d1fd81da/src/random/arbitrary/integrated/integrated.ts#L20)
