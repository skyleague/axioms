---
editUrl: false
next: false
prev: false
title: "stack"
---

> **stack**\<`T`\>(`initialize`): [`StackGenerator`](/api/interfaces/stackgenerator/)\<`T`\>

Creates a generator that acts as a FIFO stack.

### Example
```ts
collect(stack([1,2,3]))
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

[`StackGenerator`](/api/interfaces/stackgenerator/)\<`T`\>

The queue generator.

## Defined in

[src/generator/stack/stack.ts:35](https://github.com/skyleague/axioms/blob/75fb1c5c977f1940e84e5cdcef2be336d1fd81da/src/generator/stack/stack.ts#L35)
