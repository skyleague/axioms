---
editUrl: false
next: false
prev: false
title: "queue"
---

> **queue**\<`T`\>(`initialize`): [`QueueGenerator`](/api/interfaces/queuegenerator/)\<`T`\>

Creates a generator that acts as a LIFO queue.

### Example
```ts
collect(queue([1,2,3]))
// => [1, 2, 3]
```

:::caution[Alpha]
This API should not be used in production and may be trimmed from a public release.
:::

## Type Parameters

• **T**

The element type.

## Parameters

### initialize

`Iterable`\<`T`, `any`, `any`\> = `[]`

The initial values to fill the queue.

## Returns

[`QueueGenerator`](/api/interfaces/queuegenerator/)\<`T`\>

The queue generator.

## Defined in

[src/generator/queue/queue.ts:33](https://github.com/skyleague/axioms/blob/75fb1c5c977f1940e84e5cdcef2be336d1fd81da/src/generator/queue/queue.ts#L33)
