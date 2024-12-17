---
editUrl: false
next: false
prev: false
title: "uri"
---

> **uri**(): [`Dependent`](/api/interfaces/dependent/)\<`string`\>

It returns an arbitrary that generates valid uris according to https://datatracker.ietf.org/doc/html/rfc3986

### Example
```ts
random(uri())
// => "https://example.com:8080/abc/def"
```

## Returns

[`Dependent`](/api/interfaces/dependent/)\<`string`\>

An email arbitrary.

## Defined in

[src/random/types/uri/uri.ts:23](https://github.com/skyleague/axioms/blob/75fb1c5c977f1940e84e5cdcef2be336d1fd81da/src/random/types/uri/uri.ts#L23)
