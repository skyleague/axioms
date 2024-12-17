---
editUrl: false
next: false
prev: false
title: "whenLefts"
---

> **whenLefts**\<`Xs`, `T`\>(`xs`, `f`): `ArgLefts`\<`Xs`\> *extends* `never`[] ? [`Right`](/api/interfaces/right/)\<`ArgRights`\<`Xs`\>\[`number`\]\> : `ArgRights`\<`Xs`\>\[`number`\] *extends* `never`[] ? `T` : [`Right`](/api/interfaces/right/)\<`ArgRights`\<`Xs`\>\[`number`\]\> \| `T`

`whenLefts` takes an array of `Either`s and a function that takes the left values of the `Either`s
and returns a value. If any of the `Either`s are `Right`s, then the first `Right` is returned.
Otherwise, the function is called with the left values and its return value is returned.

### Example
```ts
whenLefts([{ left: 'foo' }, { left: 'bar' }], ([x0, x1]) => `${x0}${x1}`)
// => "foobar"

whenLefts([{ right: 'bar' }, { left: 'fooz' }], ([x0, x1]) => `${x0}${x1}`)
// => { right: "bar" }
```

## Type Parameters

• **Xs** *extends* [`Either`](/api/type-aliases/either/)\<`unknown`, `unknown`\>[]

• **T**

The mapped type.

## Parameters

### xs

readonly [`Xs`]

The either values.

### f

(`rs`) => `T`

The map function.

## Returns

`ArgLefts`\<`Xs`\> *extends* `never`[] ? [`Right`](/api/interfaces/right/)\<`ArgRights`\<`Xs`\>\[`number`\]\> : `ArgRights`\<`Xs`\>\[`number`\] *extends* `never`[] ? `T` : [`Right`](/api/interfaces/right/)\<`ArgRights`\<`Xs`\>\[`number`\]\> \| `T`

The mapped value if right.

## Defined in

[src/data/either/either.ts:320](https://github.com/skyleague/axioms/blob/75fb1c5c977f1940e84e5cdcef2be336d1fd81da/src/data/either/either.ts#L320)
