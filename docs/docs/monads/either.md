---
sidebar_position: 3
---

# Either

Usually, error handling is done using the `try`, `catch`, and `throw` primitives. We've all experienced how these primitives can make writing deterministic code harder than it needs to be since it decouples the error handling from the context in which the error was initially thrown.

Luckily, functional programming has given us better ways to deal with error handling. And some of these methods are more widespread in their use. One such method is the `Either` type.


## Definition
We define the `Either` type as:
```ts
type Either<Left, Right> = 
  | { left: Left } 
  | { right: Right } 
```

The `Either` type is a container for one of two values. It is similar to the `Maybe` type in that it represents a value that may have one of two states: `Left` or `Right`. However, unlike the Maybe type, which represents an arbitrary value, the Either type has two distinct arbitrary values; Left and Right. 

The `Either` data structure is useful when you need to distinguish between success and failure, and you want to differentiate through data rather than through code. Typically a `Left` value indicates failure, while a `Right` value indicates success. But this is not mandated by the data structure; it is just a convention.

Instead of defining the `Either` type as a true monad but rather simply as a discriminated union, we obtain simplicity.

## Error Handling
The true power of the `Either` monad comes from its ability to force correct error handling. There's no simple `get` method to get the value from the object; you *explicitly* need to choose either `left` or `right`.
