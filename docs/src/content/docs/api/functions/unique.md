---
editUrl: false
next: false
prev: false
title: "unique"
---

> **unique**\<`T`\>(`xs`, `eq`): `IteratorObject`\<`T`\>

Take the Iterable and remove all items that are duplicated. Duplications
are detected by applying the `eq` operator.

### Example
```ts
collect(unique([1, 2, 3]))
// => [1, 2, 3]

collect(unique([1, 2, 1, 2, 3]))
// => [1, 2, 3]

function* foobar() {
    yield 'foo'
    yield 'bar'
}
collect(unique(foobar()))
// => ["foo", "bar"]

collect(unique([]))
// => []
```

## Type Parameters

• **T**

The element type.

## Parameters

### xs

`Iterable`\<`T`, `any`, `any`\>

The Traversable to make unique.

### eq

(`a`, `b`) => `boolean`

## Returns

`IteratorObject`\<`T`\>

The unique values.

## Defined in

[src/iterator/unique/unique.ts:34](https://github.com/skyleague/axioms/blob/75fb1c5c977f1940e84e5cdcef2be336d1fd81da/src/iterator/unique/unique.ts#L34)
