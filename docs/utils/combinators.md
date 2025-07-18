A very useful construct in writing complex error handling is the `Try` monad. In Axioms we simply define it as the union of a type with `Error`. If the value becomes an `Error` in itself, we accept that it collapses to a `Failure`. (Most functions will do this for us anyway). We explicitly don't try to define the type of the `Failure`, and just use the javascript standard library here:

```ts
type Success<T> = T
type Failure = Error
type Try<T> = Failure | Success<T>
```

This definition will start to make a lot of sense when we give you an example.

#### JSON parsing

At the heart of the Try concept we define `mapTry` that will take a `Try<T>` value and map the given function when the value is a Success. If the function call fails for whatever reason, we'll return a Failure instead.

```ts
function handleRequest(str: string): { status: number; body: string } {
    const parsed = mapTry(str, JSON.parse) // Failure,  {<value>}
    const response = mapTry(parsed, (request) => handle(request)) // Failure, {<response>}
    return transformTry(
        response,
        (success) => ({
            status: 200,
            body: JSON.stringify(success),
        }),
        (failure) => ({#
            status: 500,
            body: failure.message,
        })
    )
}
```