---
editUrl: false
next: false
prev: false
title: "domain"
---

> **domain**(): [`Dependent`](/api/interfaces/dependent/)\<`string`\>

It returns an arbitrary that generates valid domains according to https://www.ietf.org/rfc/rfc1034.txt

### Example
```ts
random(domain())
// => "xt8x57fyxl3r.pq11p"
```

## Returns

[`Dependent`](/api/interfaces/dependent/)\<`string`\>

A domain arbitrary.

## Defined in

[src/random/types/domain/domain.ts:20](https://github.com/skyleague/axioms/blob/75fb1c5c977f1940e84e5cdcef2be336d1fd81da/src/random/types/domain/domain.ts#L20)
