---
editUrl: false
next: false
prev: false
title: "mapLefts"
---

> **mapLefts**\<`Xs`, `T`\>(`xs`, `f`): `ArgLefts`\<`Xs`\> *extends* `never`[] ? [`Right`](/api/interfaces/right/)\<`ArgRights`\<`Xs`\>\[`number`\]\> : `ArgRights`\<`Xs`\>\[`number`\] *extends* `never`[] ? [`Left`](/api/interfaces/left/)\<`T`\> : [`Left`](/api/interfaces/left/)\<`T`\> \| [`Right`](/api/interfaces/right/)\<`ArgRights`\<`Xs`\>\[`number`\]\>

`mapLefts` takes a tuple of `Either`s and a function that takes the left values of the `Either`s and
returns a new `Either` with the left value being the result of the function and the right value
being the right value of the first `Either` in the tuple.

### Example
```ts
mapLefts([{ left: 'foo' }, { left: 'bar' }], ([x0, x1]) => `${x0}${x1}`)
// => { left: "foobar" }

mapLefts([{ right: 'bar' }, { left: 'fooz' }], ([x0, x1]) => `${x0}${x1}`)
// => { right: "bar" }
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

(`ls`) => `T`

The map function.

## Returns

`ArgLefts`\<`Xs`\> *extends* `never`[] ? [`Right`](/api/interfaces/right/)\<`ArgRights`\<`Xs`\>\[`number`\]\> : `ArgRights`\<`Xs`\>\[`number`\] *extends* `never`[] ? [`Left`](/api/interfaces/left/)\<`T`\> : [`Left`](/api/interfaces/left/)\<`T`\> \| [`Right`](/api/interfaces/right/)\<`ArgRights`\<`Xs`\>\[`number`\]\>

The mapped either object.

## Defined in

[src/data/either/either.ts:251](https://github.com/skyleague/axioms/blob/75fb1c5c977f1940e84e5cdcef2be336d1fd81da/src/data/either/either.ts#L251)
