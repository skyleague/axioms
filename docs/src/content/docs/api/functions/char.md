---
editUrl: false
next: false
prev: false
title: "char"
---

> **char**(`options`): [`Dependent`](/api/interfaces/dependent/)\<`string`\>

Generate a character arbitrary.

### Example
```ts
random(char())
// => "-"
```

## Parameters

### options

`Partial`\<[`CharGenerator`](/api/interfaces/chargenerator/)\> = `{}`

Describe how the character must be generated.

## Returns

[`Dependent`](/api/interfaces/dependent/)\<`string`\>

An arbitrary character.

## Defined in

[src/random/types/char/char.ts:56](https://github.com/skyleague/axioms/blob/75fb1c5c977f1940e84e5cdcef2be336d1fd81da/src/random/types/char/char.ts#L56)
