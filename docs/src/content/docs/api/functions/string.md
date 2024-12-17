---
editUrl: false
next: false
prev: false
title: "string"
---

> **string**(`context`): [`Dependent`](/api/interfaces/dependent/)\<`string`\>

Generate a string arbitrary.
q
### Example
```ts
random(string())
// => "-abc"
```

## Parameters

### context

[`MaybePartial`](/api/type-aliases/maybepartial/)\<[`StringConstraints`](/api/interfaces/stringconstraints/)\> = `{}`

## Returns

[`Dependent`](/api/interfaces/dependent/)\<`string`\>

An arbitrary string.

## Defined in

[src/random/types/string/string.ts:87](https://github.com/skyleague/axioms/blob/75fb1c5c977f1940e84e5cdcef2be336d1fd81da/src/random/types/string/string.ts#L87)
