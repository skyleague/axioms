---
editUrl: false
next: false
prev: false
title: "pattern"
---

> **pattern**\<`S`\>(`patternStr`): [`Dependent`](/api/interfaces/dependent/)\<`string`\>

Generates a string based on a pattern string.

### Example
```ts
random(pattern('A#*a'))
// => e.g. 'B5xq'
```

The pattern string can contain the following characters:
- `*`: any alphanumeric character
- `#`: any digit (0-9)
- `A`: any uppercase or lowercase alphabetical character
- `a`: any lowercase alphabetical character
- `i`: any alphabetical character (uppercase or lowercase)

## Type Parameters

• **S** *extends* `string`

## Parameters

### patternStr

`PatternString`\<`S`, `S`\>

The pattern string to generate the string from.

## Returns

[`Dependent`](/api/interfaces/dependent/)\<`string`\>

A `Dependent<string>` that generates a string based on the pattern string.

## Defined in

[src/random/types/pattern/pattern.ts:36](https://github.com/skyleague/axioms/blob/75fb1c5c977f1940e84e5cdcef2be336d1fd81da/src/random/types/pattern/pattern.ts#L36)
