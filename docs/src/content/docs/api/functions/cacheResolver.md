---
editUrl: false
next: false
prev: false
title: "cacheResolver"
---

> **cacheResolver**\<`Fn`\>(): `Resolver`\<`Fn`\>

Caches the value until it is explicitly cleared.

### Example
```ts
let i = 0
const mem = memoize(() => i++, cacheResolver())
mem()
// => 0

mem()
// => 0

mem.clear()
mem()
// => 1
```

## Type Parameters

• **Fn** *extends* () => `unknown`

## Returns

`Resolver`\<`Fn`\>

The cache function resolver.

## Defined in

[src/algorithm/memoize/resolver.ts:95](https://github.com/skyleague/axioms/blob/75fb1c5c977f1940e84e5cdcef2be336d1fd81da/src/algorithm/memoize/resolver.ts#L95)
