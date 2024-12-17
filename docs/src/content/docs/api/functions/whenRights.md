---
editUrl: false
next: false
prev: false
title: "whenRights"
---

> **whenRights**\<`Xs`, `T`\>(`xs`, `f`): `ArgRights`\<`Xs`\> *extends* `never`[] ? [`Left`](/api/interfaces/left/)\<`ArgLefts`\<`Xs`\>\[`number`\]\> : `ArgLefts`\<`Xs`\>\[`number`\] *extends* `never`[] ? `T` : [`Left`](/api/interfaces/left/)\<`ArgLefts`\<`Xs`\>\[`number`\]\> \| `T`

`whenRights` takes an array of `Either`s and a function that takes the `right`s of the `Either`s as
arguments and returns a `Left` if any of the `Either`s are `Left`s or the result of the function if
all of the `Either`s are `Right`s.

### Example
```ts
whenRights([{ right: 'foo' }, { right: 'bar' }], ([x0, x1]) => ({right: `${x0}${x1}`}))
// => { right: "foobar"}

whenRights([{ left: 'bar' }, { right: 'fooz' }], ([x0, x1]) => ({right: `${x0}${x1}`}))
// => { left: "bar" }
```

## Type Parameters

• **Xs** *extends* [`Either`](/api/type-aliases/either/)\<`unknown`, `unknown`\>[]

• **T** *extends* [`Either`](/api/type-aliases/either/)\<`unknown`, `unknown`\>

The mapped type.

## Parameters

### xs

readonly [`Xs`]

The either values.

### f

(`rs`) => `T`

The map function.

## Returns

`ArgRights`\<`Xs`\> *extends* `never`[] ? [`Left`](/api/interfaces/left/)\<`ArgLefts`\<`Xs`\>\[`number`\]\> : `ArgLefts`\<`Xs`\>\[`number`\] *extends* `never`[] ? `T` : [`Left`](/api/interfaces/left/)\<`ArgLefts`\<`Xs`\>\[`number`\]\> \| `T`

The mapped value if right.

## Defined in

[src/data/either/either.ts:175](https://github.com/skyleague/axioms/blob/75fb1c5c977f1940e84e5cdcef2be336d1fd81da/src/data/either/either.ts#L175)
