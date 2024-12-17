---
editUrl: false
next: false
prev: false
title: "defer"
---

> **defer**\<`T`, `Err`\>(): [`Deferred`](/api/interfaces/deferred/)\<`T`, `Err`\>

Creates a Deferred Promise that can be resolved or rejected elsewhere in the code.

:::caution[Deprecated]
Use `Promise.withResolvers()` instead.
:::

## Type Parameters

• **T**

• **Err** = `Error`

## Returns

[`Deferred`](/api/interfaces/deferred/)\<`T`, `Err`\>

## Defined in

[src/async/\_deprecated/defer/defer.ts:15](https://github.com/skyleague/axioms/blob/75fb1c5c977f1940e84e5cdcef2be336d1fd81da/src/async/_deprecated/defer/defer.ts#L15)
