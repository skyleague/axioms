---
editUrl: false
next: false
prev: false
title: "whenJusts"
---

> **whenJusts**\<`Xs`, `M`\>(`xs`, `f`): `ArgJust`\<`Xs`\> *extends* `never`[] ? [`Nothing`](/api/type-aliases/nothing/) : [[`Nothing`](/api/type-aliases/nothing/)] *extends* [`Xs`\[`number`\]] ? [`Nothing`](/api/type-aliases/nothing/) \| `M` : `M`

`whenJusts` takes a tuple of `Maybe`s and a function that takes the values of the `Just`s and
returns a `Maybe` of the result of the function.

### Example
```ts
whenJusts([{ right: 'foo' }, { right: 'bar' }], ([x0, x1]) => `${x0}${x1}`)
// => "foobar"

whenJusts([{ left: 'bar' }, { right: 'fooz' }], ([x0, x1]) => `${x0}${x1}`)
// => { left: "bar" }
```

## Type Parameters

• **Xs** *extends* `unknown`[]

The maybe types.

• **M** *extends* `unknown`

The mapped type.

## Parameters

### xs

readonly [`Xs`]

The maybe values.

### f

(`x`) => `M`

The map function.

## Returns

`ArgJust`\<`Xs`\> *extends* `never`[] ? [`Nothing`](/api/type-aliases/nothing/) : [[`Nothing`](/api/type-aliases/nothing/)] *extends* [`Xs`\[`number`\]] ? [`Nothing`](/api/type-aliases/nothing/) \| `M` : `M`

The mapped value if just.

## Defined in

[src/data/maybe/maybe.ts:205](https://github.com/skyleague/axioms/blob/75fb1c5c977f1940e84e5cdcef2be336d1fd81da/src/data/maybe/maybe.ts#L205)
