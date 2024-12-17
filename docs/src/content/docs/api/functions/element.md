---
editUrl: false
next: false
prev: false
title: "element"
---

> **element**\<`T`\>(`elements`): [`Dependent`](/api/interfaces/dependent/)\<`T` *extends* `string` ? `string` : `T`\[`number`\]\>

It returns an arbitrary that takes a random element from the array.

### Example
```ts
random(element("abc"))
// => "b"

random(element("abc"))
// => "c"

random(element([1, 2, 3]))
// => 3
```

## Type Parameters

• **T** *extends* `string` \| `unknown`[]

## Parameters

### elements

`T` *extends* `string` ? `string` : `T`

## Returns

[`Dependent`](/api/interfaces/dependent/)\<`T` *extends* `string` ? `string` : `T`\[`number`\]\>

An arbitrary.

## Defined in

[src/random/types/element/element.ts:23](https://github.com/skyleague/axioms/blob/75fb1c5c977f1940e84e5cdcef2be336d1fd81da/src/random/types/element/element.ts#L23)
