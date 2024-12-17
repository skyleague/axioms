---
editUrl: false
next: false
prev: false
title: "concat"
---

## Call Signature

> **concat**\<`T`, `U`\>(`xs1`, `xs2`): `IteratorObject`\<`T` \| `U`, `void`\>

Creates a generator that concatenates the given Traversables to each other
in the given order.

### Example
```ts
collect(concat([1, 2], [3, 4], [5]))
// => [1, 2, 3, 4, 5]
```

### Alternatives
- [ECMAScript - Array.concat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/concat)
- [Lodash - concat](https://lodash.com/docs/4.17.15#concat)

### Type Parameters

• **T**

The element type.

• **U**

### Parameters

#### xs1

`Iterable`\<`T`, `any`, `any`\>

#### xs2

`Iterable`\<`U`, `any`, `any`\>

### Returns

`IteratorObject`\<`T` \| `U`, `void`\>

A concatenation generator.

### Defined in

[src/iterator/concat/concat.ts:23](https://github.com/skyleague/axioms/blob/75fb1c5c977f1940e84e5cdcef2be336d1fd81da/src/iterator/concat/concat.ts#L23)

## Call Signature

> **concat**\<`T`, `U`, `V`\>(`xs1`, `xs2`, `xs3`): `IteratorObject`\<`T` \| `U` \| `V`, `void`\>

Creates a generator that concatenates the given Traversables to each other
in the given order.

### Example
```ts
collect(concat([1, 2], [3, 4], [5]))
// => [1, 2, 3, 4, 5]
```

### Alternatives
- [ECMAScript - Array.concat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/concat)
- [Lodash - concat](https://lodash.com/docs/4.17.15#concat)

### Type Parameters

• **T**

The element type.

• **U**

• **V**

### Parameters

#### xs1

`Iterable`\<`T`, `any`, `any`\>

#### xs2

`Iterable`\<`U`, `any`, `any`\>

#### xs3

`Iterable`\<`V`, `any`, `any`\>

### Returns

`IteratorObject`\<`T` \| `U` \| `V`, `void`\>

A concatenation generator.

### Defined in

[src/iterator/concat/concat.ts:24](https://github.com/skyleague/axioms/blob/75fb1c5c977f1940e84e5cdcef2be336d1fd81da/src/iterator/concat/concat.ts#L24)

## Call Signature

> **concat**\<`T`\>(...`xs`): `IteratorObject`\<`T`, `void`\>

Creates a generator that concatenates the given Traversables to each other
in the given order.

### Example
```ts
collect(concat([1, 2], [3, 4], [5]))
// => [1, 2, 3, 4, 5]
```

### Alternatives
- [ECMAScript - Array.concat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/concat)
- [Lodash - concat](https://lodash.com/docs/4.17.15#concat)

### Type Parameters

• **T**

The element type.

### Parameters

#### xs

...`Iterable`\<`T`, `any`, `any`\>[]

The Iterables to concatenate.

### Returns

`IteratorObject`\<`T`, `void`\>

A concatenation generator.

### Defined in

[src/iterator/concat/concat.ts:25](https://github.com/skyleague/axioms/blob/75fb1c5c977f1940e84e5cdcef2be336d1fd81da/src/iterator/concat/concat.ts#L25)
