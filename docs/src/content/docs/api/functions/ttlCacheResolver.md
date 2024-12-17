---
editUrl: false
next: false
prev: false
title: "ttlCacheResolver"
---

> **ttlCacheResolver**\<`Fn`\>(`ttl`): `Resolver`\<`Fn`\>

Caches the value until the value expires.

### Example
```ts
let i = 0
const mem = memoize(() => i++, ttlCacheResolver(1000))
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

## Parameters

### ttl

`number`

## Returns

`Resolver`\<`Fn`\>

The cache function resolver.

## Params

ttl - The time to live in milliseconds.

## Defined in

[src/algorithm/memoize/resolver.ts:45](https://github.com/skyleague/axioms/blob/75fb1c5c977f1940e84e5cdcef2be336d1fd81da/src/algorithm/memoize/resolver.ts#L45)
