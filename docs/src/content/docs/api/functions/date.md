---
editUrl: false
next: false
prev: false
title: "date"
---

> **date**(`constraints`): [`Dependent`](/api/interfaces/dependent/)\<`string`\>

It returns an arbitrary that generates an ISO08501 date value.

### Example
```ts
random(date())
// => "1991-01-18"
```

## Parameters

### constraints

[`MaybePartial`](/api/type-aliases/maybepartial/)\<[`DateGenerator`](/api/interfaces/dategenerator/)\> = `{}`

The constraints.

## Returns

[`Dependent`](/api/interfaces/dependent/)\<`string`\>

An arbitrary that generates an ISO08501 date value.

## Defined in

[src/random/types/date/date.ts:121](https://github.com/skyleague/axioms/blob/75fb1c5c977f1940e84e5cdcef2be336d1fd81da/src/random/types/date/date.ts#L121)
