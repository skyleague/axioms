---
editUrl: false
next: false
prev: false
title: "subdomain"
---

> **subdomain**(): [`Dependent`](/api/interfaces/dependent/)\<`string`\>

It returns an arbitrary that generates valid subdomains.

### Example
```ts
random(domain())
// => "ntcc"
```

## Returns

[`Dependent`](/api/interfaces/dependent/)\<`string`\>

A subdomain arbitrary.

## Defined in

[src/random/types/domain/domain.ts:40](https://github.com/skyleague/axioms/blob/75fb1c5c977f1940e84e5cdcef2be336d1fd81da/src/random/types/domain/domain.ts#L40)
