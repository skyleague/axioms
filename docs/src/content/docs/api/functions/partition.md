---
editUrl: false
next: false
prev: false
title: "partition"
---

## Call Signature

> **partition**\<`U`, `T`\>(`xs`, `by`): `Partition`\<`U`, `T`\>

Partitions a Iterable into disjoint arrays of results.
The first array of the result contains the items that match the predicate.
The second array of the result contains the items that didn't match the predicate.

### Example
```ts
partition([1, 'a'], isString)
// => [['a'], [1]]
```

### Alternatives
- [Lodash - partition](https://lodash.com/docs/4.17.15#partition)

### Type Parameters

• **U**

The element type of the input.

• **T**

The element type for the first partition.

### Parameters

#### xs

`Iterable`\<`U`, `any`, `any`\>

The values to partition.

#### by

(`item`, `index`) => `item is T`

### Returns

`Partition`\<`U`, `T`\>

The partitions.

### Defined in

[src/iterator/partition/partition.ts:26](https://github.com/skyleague/axioms/blob/75fb1c5c977f1940e84e5cdcef2be336d1fd81da/src/iterator/partition/partition.ts#L26)

## Call Signature

> **partition**\<`T`\>(`xs`, `by`): [`T`[], `T`[]]

Partitions a Iterable into disjoint arrays of results.
The first array of the result contains the items that match the predicate.
The second array of the result contains the items that didn't match the predicate.

### Example
```ts
partition([1, 'a'], isString)
// => [['a'], [1]]
```

### Alternatives
- [Lodash - partition](https://lodash.com/docs/4.17.15#partition)

### Type Parameters

• **T**

The element type for the first partition.

### Parameters

#### xs

`Iterable`\<`T`, `any`, `any`\>

The values to partition.

#### by

(`item`, `index`) => `boolean`

### Returns

[`T`[], `T`[]]

The partitions.

### Defined in

[src/iterator/partition/partition.ts:27](https://github.com/skyleague/axioms/blob/75fb1c5c977f1940e84e5cdcef2be336d1fd81da/src/iterator/partition/partition.ts#L27)
