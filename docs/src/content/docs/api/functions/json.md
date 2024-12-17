---
editUrl: false
next: false
prev: false
title: "json"
---

> **json**(`constraints`): [`Dependent`](/api/interfaces/dependent/)\<`JsonValue`\>

It returns an arbitrary that generates valid json.

### Example
```ts
random(json())
// => {}

random(json())
// => {"i|": false}

random(json({type: 'array'}))
// => [false]
```

## Parameters

### constraints

[`MaybePartial`](/api/type-aliases/maybepartial/)\<[`JsonGenerator`](/api/interfaces/jsongenerator/)\> = `{}`

## Returns

[`Dependent`](/api/interfaces/dependent/)\<`JsonValue`\>

A json arbitrary.

## Defined in

[src/random/types/complex/complex.ts:57](https://github.com/skyleague/axioms/blob/75fb1c5c977f1940e84e5cdcef2be336d1fd81da/src/random/types/complex/complex.ts#L57)
