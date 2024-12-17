---
editUrl: false
next: false
prev: false
title: "Mulberry32Generator"
---

## Extends

- `Generator`\<`number`, `number`\>.[`RandomGenerator`](/api/interfaces/randomgenerator/)

## Properties

### \[toStringTag\]

> `readonly` **\[toStringTag\]**: `string`

#### Inherited from

`Generator.[toStringTag]`

#### Defined in

node\_modules/typescript/lib/lib.esnext.iterator.d.ts:134

## Methods

### \[dispose\]()

#### Call Signature

> **\[dispose\]**(): `void`

##### Returns

`void`

##### Inherited from

`Generator.[dispose]`

##### Defined in

node\_modules/typescript/lib/lib.esnext.disposable.d.ts:36

#### Call Signature

> **\[dispose\]**(): `void`

##### Returns

`void`

##### Inherited from

`Generator.[dispose]`

##### Defined in

node\_modules/@types/node/compatibility/disposable.d.ts:11

***

### \[iterator\]()

> **\[iterator\]**(): `Generator`\<`number`, `number`, `any`\>

#### Returns

`Generator`\<`number`, `number`, `any`\>

#### Inherited from

`Generator.[iterator]`

#### Defined in

node\_modules/typescript/lib/lib.es2015.generator.d.ts:26

***

### clone()

> **clone**(): [`RandomGenerator`](/api/interfaces/randomgenerator/)

#### Returns

[`RandomGenerator`](/api/interfaces/randomgenerator/)

#### Inherited from

[`RandomGenerator`](/api/interfaces/randomgenerator/).[`clone`](/api/interfaces/randomgenerator/#clone)

#### Defined in

[src/random/rng/random/random.ts:4](https://github.com/skyleague/axioms/blob/75fb1c5c977f1940e84e5cdcef2be336d1fd81da/src/random/rng/random/random.ts#L4)

***

### drop()

> **drop**(`count`): `IteratorObject`\<`number`, `undefined`, `unknown`\>

Creates an iterator whose values are the values from this iterator after skipping the provided count.

#### Parameters

##### count

`number`

The number of values to drop.

#### Returns

`IteratorObject`\<`number`, `undefined`, `unknown`\>

#### Inherited from

`Generator.drop`

#### Defined in

node\_modules/typescript/lib/lib.esnext.iterator.d.ts:74

***

### every()

> **every**(`predicate`): `boolean`

Determines whether all the members of this iterator satisfy the specified test.

#### Parameters

##### predicate

(`value`, `index`) => `unknown`

A function that accepts up to two arguments. The every method calls
the predicate function for each element in this iterator until the predicate returns
false, or until the end of this iterator.

#### Returns

`boolean`

#### Inherited from

`Generator.every`

#### Defined in

node\_modules/typescript/lib/lib.esnext.iterator.d.ts:122

***

### filter()

#### Call Signature

> **filter**\<`S`\>(`predicate`): `IteratorObject`\<`S`, `undefined`, `unknown`\>

Creates an iterator whose values are those from this iterator for which the provided predicate returns true.

##### Type Parameters

• **S** *extends* `number`

##### Parameters

###### predicate

(`value`, `index`) => `value is S`

A function that accepts up to two arguments to be used to test values from the underlying iterator.

##### Returns

`IteratorObject`\<`S`, `undefined`, `unknown`\>

##### Inherited from

`Generator.filter`

##### Defined in

node\_modules/typescript/lib/lib.esnext.iterator.d.ts:56

#### Call Signature

> **filter**(`predicate`): `IteratorObject`\<`number`, `undefined`, `unknown`\>

Creates an iterator whose values are those from this iterator for which the provided predicate returns true.

##### Parameters

###### predicate

(`value`, `index`) => `unknown`

A function that accepts up to two arguments to be used to test values from the underlying iterator.

##### Returns

`IteratorObject`\<`number`, `undefined`, `unknown`\>

##### Inherited from

`Generator.filter`

##### Defined in

node\_modules/typescript/lib/lib.esnext.iterator.d.ts:62

***

### find()

#### Call Signature

> **find**\<`S`\>(`predicate`): `undefined` \| `S`

Returns the value of the first element in this iterator where predicate is true, and undefined
otherwise.

##### Type Parameters

• **S** *extends* `number`

##### Parameters

###### predicate

(`value`, `index`) => `value is S`

find calls predicate once for each element of this iterator, in
order, until it finds one where predicate returns true. If such an element is found, find
immediately returns that element value. Otherwise, find returns undefined.

##### Returns

`undefined` \| `S`

##### Inherited from

`Generator.find`

##### Defined in

node\_modules/typescript/lib/lib.esnext.iterator.d.ts:131

#### Call Signature

> **find**(`predicate`): `undefined` \| `number`

##### Parameters

###### predicate

(`value`, `index`) => `unknown`

##### Returns

`undefined` \| `number`

##### Inherited from

`Generator.find`

##### Defined in

node\_modules/typescript/lib/lib.esnext.iterator.d.ts:132

***

### flatMap()

> **flatMap**\<`U`\>(`callback`): `IteratorObject`\<`U`, `undefined`, `unknown`\>

Creates an iterator whose values are the result of applying the callback to the values from this iterator and then flattening the resulting iterators or iterables.

#### Type Parameters

• **U**

#### Parameters

##### callback

(`value`, `index`) => `Iterator`\<`U`, `unknown`, `undefined`\> \| `Iterable`\<`U`, `unknown`, `undefined`\>

A function that accepts up to two arguments to be used to transform values from the underlying iterator into new iterators or iterables to be flattened into the result.

#### Returns

`IteratorObject`\<`U`, `undefined`, `unknown`\>

#### Inherited from

`Generator.flatMap`

#### Defined in

node\_modules/typescript/lib/lib.esnext.iterator.d.ts:80

***

### forEach()

> **forEach**(`callbackfn`): `void`

Performs the specified action for each element in the iterator.

#### Parameters

##### callbackfn

(`value`, `index`) => `void`

A function that accepts up to two arguments. forEach calls the callbackfn function one time for each element in the iterator.

#### Returns

`void`

#### Inherited from

`Generator.forEach`

#### Defined in

node\_modules/typescript/lib/lib.esnext.iterator.d.ts:106

***

### jump()

> **jump**(): `void`

#### Returns

`void`

#### Inherited from

[`RandomGenerator`](/api/interfaces/randomgenerator/).[`jump`](/api/interfaces/randomgenerator/#jump)

#### Defined in

[src/random/rng/random/random.ts:2](https://github.com/skyleague/axioms/blob/75fb1c5c977f1940e84e5cdcef2be336d1fd81da/src/random/rng/random/random.ts#L2)

***

### map()

> **map**\<`U`\>(`callbackfn`): `IteratorObject`\<`U`, `undefined`, `unknown`\>

Creates an iterator whose values are the result of applying the callback to the values from this iterator.

#### Type Parameters

• **U**

#### Parameters

##### callbackfn

(`value`, `index`) => `U`

A function that accepts up to two arguments to be used to transform values from the underlying iterator.

#### Returns

`IteratorObject`\<`U`, `undefined`, `unknown`\>

#### Inherited from

`Generator.map`

#### Defined in

node\_modules/typescript/lib/lib.esnext.iterator.d.ts:50

***

### next()

> **next**(...`__namedParameters`): `IteratorResult`\<`number`, `number`\>

#### Parameters

##### \_\_namedParameters

[] | [`any`]

#### Returns

`IteratorResult`\<`number`, `number`\>

#### Inherited from

`Generator.next`

#### Defined in

node\_modules/typescript/lib/lib.es2015.generator.d.ts:23

***

### reduce()

#### Call Signature

> **reduce**(`callbackfn`): `number`

Calls the specified callback function for all the elements in this iterator. The return value of the callback function is the accumulated result, and is provided as an argument in the next call to the callback function.

##### Parameters

###### callbackfn

(`previousValue`, `currentValue`, `currentIndex`) => `number`

A function that accepts up to three arguments. The reduce method calls the callbackfn function one time for each element in the iterator.

##### Returns

`number`

##### Inherited from

`Generator.reduce`

##### Defined in

node\_modules/typescript/lib/lib.esnext.iterator.d.ts:87

#### Call Signature

> **reduce**(`callbackfn`, `initialValue`): `number`

##### Parameters

###### callbackfn

(`previousValue`, `currentValue`, `currentIndex`) => `number`

###### initialValue

`number`

##### Returns

`number`

##### Inherited from

`Generator.reduce`

##### Defined in

node\_modules/typescript/lib/lib.esnext.iterator.d.ts:88

#### Call Signature

> **reduce**\<`U`\>(`callbackfn`, `initialValue`): `U`

Calls the specified callback function for all the elements in this iterator. The return value of the callback function is the accumulated result, and is provided as an argument in the next call to the callback function.

##### Type Parameters

• **U**

##### Parameters

###### callbackfn

(`previousValue`, `currentValue`, `currentIndex`) => `U`

A function that accepts up to three arguments. The reduce method calls the callbackfn function one time for each element in the iterator.

###### initialValue

`U`

If initialValue is specified, it is used as the initial value to start the accumulation. The first call to the callbackfn function provides this value as an argument instead of a value from the iterator.

##### Returns

`U`

##### Inherited from

`Generator.reduce`

##### Defined in

node\_modules/typescript/lib/lib.esnext.iterator.d.ts:95

***

### return()

> **return**(`value`): `IteratorResult`\<`number`, `number`\>

#### Parameters

##### value

`number`

#### Returns

`IteratorResult`\<`number`, `number`\>

#### Inherited from

`Generator.return`

#### Defined in

node\_modules/typescript/lib/lib.es2015.generator.d.ts:24

***

### sample()

> **sample**(): `number`

#### Returns

`number`

#### Inherited from

[`RandomGenerator`](/api/interfaces/randomgenerator/).[`sample`](/api/interfaces/randomgenerator/#sample)

#### Defined in

[src/random/rng/random/random.ts:3](https://github.com/skyleague/axioms/blob/75fb1c5c977f1940e84e5cdcef2be336d1fd81da/src/random/rng/random/random.ts#L3)

***

### some()

> **some**(`predicate`): `boolean`

Determines whether the specified callback function returns true for any element of this iterator.

#### Parameters

##### predicate

(`value`, `index`) => `unknown`

A function that accepts up to two arguments. The some method calls
the predicate function for each element in this iterator until the predicate returns a value
true, or until the end of the iterator.

#### Returns

`boolean`

#### Inherited from

`Generator.some`

#### Defined in

node\_modules/typescript/lib/lib.esnext.iterator.d.ts:114

***

### take()

> **take**(`limit`): `IteratorObject`\<`number`, `undefined`, `unknown`\>

Creates an iterator whose values are the values from this iterator, stopping once the provided limit is reached.

#### Parameters

##### limit

`number`

The maximum number of values to yield.

#### Returns

`IteratorObject`\<`number`, `undefined`, `unknown`\>

#### Inherited from

`Generator.take`

#### Defined in

node\_modules/typescript/lib/lib.esnext.iterator.d.ts:68

***

### throw()

> **throw**(`e`): `IteratorResult`\<`number`, `number`\>

#### Parameters

##### e

`any`

#### Returns

`IteratorResult`\<`number`, `number`\>

#### Inherited from

`Generator.throw`

#### Defined in

node\_modules/typescript/lib/lib.es2015.generator.d.ts:25

***

### toArray()

> **toArray**(): `number`[]

Creates a new array from the values yielded by this iterator.

#### Returns

`number`[]

#### Inherited from

`Generator.toArray`

#### Defined in

node\_modules/typescript/lib/lib.esnext.iterator.d.ts:100
