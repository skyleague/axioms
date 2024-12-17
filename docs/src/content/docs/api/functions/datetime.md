---
editUrl: false
next: false
prev: false
title: "datetime"
---

> **datetime**(`context`): [`Dependent`](/api/interfaces/dependent/)\<`Date`\>

It returns an arbitrary that generates a datetime value of type Date.

### Example
```ts
random(datetime())
// => new Date("1991-01-18T15:33:11.000Z")

random(datetime({precision: 'days'}))
// => new Date("1991-01-17T23:00:00.000Z")
```

## Parameters

### context

[`MaybePartial`](/api/type-aliases/maybepartial/)\<[`DatetimeGenerator`](/api/interfaces/datetimegenerator/)\> = `{}`

## Returns

[`Dependent`](/api/interfaces/dependent/)\<`Date`\>

An arbitrary that generates a datetime value.

## Defined in

[src/random/types/date/date.ts:81](https://github.com/skyleague/axioms/blob/75fb1c5c977f1940e84e5cdcef2be336d1fd81da/src/random/types/date/date.ts#L81)
