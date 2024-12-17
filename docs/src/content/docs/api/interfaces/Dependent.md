---
editUrl: false
next: false
prev: false
title: "Dependent"
---

## Extends

- [`Arbitrary`](/api/interfaces/arbitrary/)\<`T`\>

## Type Parameters

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

[src/random/arbitrary/dependent/dependent.ts:18](https://github.com/skyleague/axioms/blob/75fb1c5c977f1940e84e5cdcef2be336d1fd81da/src/random/arbitrary/dependent/dependent.ts#L18)

***

### constant()

> **constant**: (`isConstant`?) => [`Dependent`](/api/interfaces/dependent/)\<`T`\>

#### Parameters

##### isConstant?

`boolean`

#### Returns

[`Dependent`](/api/interfaces/dependent/)\<`T`\>

#### Defined in

[src/random/arbitrary/dependent/dependent.ts:19](https://github.com/skyleague/axioms/blob/75fb1c5c977f1940e84e5cdcef2be336d1fd81da/src/random/arbitrary/dependent/dependent.ts#L19)

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

[src/random/arbitrary/dependent/dependent.ts:17](https://github.com/skyleague/axioms/blob/75fb1c5c977f1940e84e5cdcef2be336d1fd81da/src/random/arbitrary/dependent/dependent.ts#L17)

***

### random()

> **random**: (`context`?) => `T`

#### Parameters

##### context?

[`ArbitraryContext`](/api/interfaces/arbitrarycontext/)

#### Returns

`T`

#### Defined in

[src/random/arbitrary/dependent/dependent.ts:13](https://github.com/skyleague/axioms/blob/75fb1c5c977f1940e84e5cdcef2be336d1fd81da/src/random/arbitrary/dependent/dependent.ts#L13)

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

> **value**: (`context`) => [`Tree`](/api/interfaces/tree/)\<`T`\>

#### Parameters

##### context

[`ArbitraryContext`](/api/interfaces/arbitrarycontext/)

#### Returns

[`Tree`](/api/interfaces/tree/)\<`T`\>

#### Inherited from

[`Arbitrary`](/api/interfaces/arbitrary/).[`value`](/api/interfaces/arbitrary/#value)

#### Defined in

[src/random/arbitrary/arbitrary/arbitrary.ts:9](https://github.com/skyleague/axioms/blob/75fb1c5c977f1940e84e5cdcef2be336d1fd81da/src/random/arbitrary/arbitrary/arbitrary.ts#L9)

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

[src/random/arbitrary/dependent/dependent.ts:14](https://github.com/skyleague/axioms/blob/75fb1c5c977f1940e84e5cdcef2be336d1fd81da/src/random/arbitrary/dependent/dependent.ts#L14)

#### Call Signature

> **filter**(`f`): [`Dependent`](/api/interfaces/dependent/)\<`T`\>

##### Parameters

###### f

(`x`, `context`) => `boolean`

##### Returns

[`Dependent`](/api/interfaces/dependent/)\<`T`\>

##### Defined in

[src/random/arbitrary/dependent/dependent.ts:15](https://github.com/skyleague/axioms/blob/75fb1c5c977f1940e84e5cdcef2be336d1fd81da/src/random/arbitrary/dependent/dependent.ts#L15)

***

### sample()

> **sample**(`context`): `T`

#### Parameters

##### context

[`ArbitraryContext`](/api/interfaces/arbitrarycontext/)

#### Returns

`T`

#### Defined in

[src/random/arbitrary/dependent/dependent.ts:12](https://github.com/skyleague/axioms/blob/75fb1c5c977f1940e84e5cdcef2be336d1fd81da/src/random/arbitrary/dependent/dependent.ts#L12)
