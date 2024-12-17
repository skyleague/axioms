---
editUrl: false
next: false
prev: false
title: "symbol"
---

> **symbol**(): [`Dependent`](/api/interfaces/dependent/)\<`symbol`\>

It returns an arbitrary that generates a symbol.

### Example
```ts
random(symbol())
// => Symbol(enMgMCe)

random(symbol())
// => Symbol(wmDI78Hci)
```

## Returns

[`Dependent`](/api/interfaces/dependent/)\<`symbol`\>

A symbol arbitrary.

## Defined in

[src/random/types/symbol/symbol.ts:22](https://github.com/skyleague/axioms/blob/75fb1c5c977f1940e84e5cdcef2be336d1fd81da/src/random/types/symbol/symbol.ts#L22)
