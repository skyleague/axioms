---
editUrl: false
next: false
prev: false
title: "mapRights"
---

> **mapRights**\<`Xs`, `T`\>(`xs`, `f`): `ArgRights`\<`Xs`\> *extends* `never`[] ? [`Left`](/api/interfaces/left/)\<`ArgLefts`\<`Xs`\>\[`number`\]\> : `ArgLefts`\<`Xs`\>\[`number`\] *extends* `never`[] ? [`Right`](/api/interfaces/right/)\<`T`\> : [`Left`](/api/interfaces/left/)\<`ArgLefts`\<`Xs`\>\[`number`\]\> \| [`Right`](/api/interfaces/right/)\<`T`\>

`mapRights` takes a tuple of `Either`s and a function that takes the right values of the `Either`s
and returns a new `Either` that is either the left value of the first `Either` in the tuple or the
result of the function

### Example
```ts
mapRights([{ right: 'foo' }, { right: 'bar' }], ([x0, x1]) => `${x0}${x1}`)
// => { right: "foobar" }

mapRights([{ left: 'bar' }, { right: 'fooz' }], ([x0, x1]) => `${x0}${x1}`)
// => { left: "bar" }
```

## Type Parameters

• **Xs** *extends* [`Either`](/api/type-aliases/either/)\<`unknown`, `unknown`\>[]

• **T**

The mapped type.

## Parameters

### xs

readonly [`Xs`]

The either values to map.

### f

(`rs`) => `T`

The map function.

## Returns

`ArgRights`\<`Xs`\> *extends* `never`[] ? [`Left`](/api/interfaces/left/)\<`ArgLefts`\<`Xs`\>\[`number`\]\> : `ArgLefts`\<`Xs`\>\[`number`\] *extends* `never`[] ? [`Right`](/api/interfaces/right/)\<`T`\> : [`Left`](/api/interfaces/left/)\<`ArgLefts`\<`Xs`\>\[`number`\]\> \| [`Right`](/api/interfaces/right/)\<`T`\>

The mapped either object.

## Defined in

[src/data/either/either.ts:107](https://github.com/skyleague/axioms/blob/75fb1c5c977f1940e84e5cdcef2be336d1fd81da/src/data/either/either.ts#L107)
