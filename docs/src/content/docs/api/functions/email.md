---
editUrl: false
next: false
prev: false
title: "email"
---

> **email**(): [`Dependent`](/api/interfaces/dependent/)\<`string`\>

It returns an arbitrary that generates valid email addresses according to https://datatracker.ietf.org/doc/html/rfc5322

### Example
```ts
random(email())
// => "xt8x57fyxl3r.pq11p"
```

## Returns

[`Dependent`](/api/interfaces/dependent/)\<`string`\>

An email arbitrary.

## Defined in

[src/random/types/email/email.ts:20](https://github.com/skyleague/axioms/blob/75fb1c5c977f1940e84e5cdcef2be336d1fd81da/src/random/types/email/email.ts#L20)
