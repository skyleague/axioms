---
sidebar_position: 2
---

# Maybe
The maybe type is used to represent a value that may exist or not. It is often used instead of throwing an error or returning undefined data. 


The Nothing type represents the absence of a value. It is often used to represent the result of an operation which returns something or throws an error like undefined and null. It is a value that is not anything at all. 


```ts
type Just<T> = T

const Nothing = Symbol.for("Nothing")
type Nothing = typeof Nothing

type Maybe<T> = Nothing | Just<T>
```


## Why not `undefined` or `null`?
In the case of `null` or `undefined`, which has the same semantic meaning as `Nothing`, it is typically used to represent errors like “Operation failed”. 

With `Nothing`, we have introduced a third way of expressing this logic. The reason for this is simple, although not very satisfying. Due to historical reasons, both `null` and `undefined` has gotten use as value next to their semantics of meaning nothing,

### Null
Null is an allowed value in a json type, meaning that it can be communicated with other services. This allows for expression of logic through data, something which some libraries make use of.

### Undefined
Undefined is a bit more complex. An object type can have a key-value pair that is not present in the object at all - meaning the value is `undefined`. Or, the actual value on the key is present, but is set to `undefined`. For example:
```ts
const omittedKey = {}
const hasKey = { foo: undefined }
```
Both objects here have the value `undefined` for key `foo`, although morphologically they look very different.

### Nothing
We define the `Nothing` type as a symbol. This removes the possibility to communicate it over json directly as it won't serialize.

```ts
JSON.stringify({ 
    nothing: Nothing,
    undefined: undefined, 
    null: null 
})
// => "{ null: null }"
```