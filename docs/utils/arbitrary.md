The best way to get started with property testing is to get your hands dirty. We'll use some examples to show you how property testing can help you find bugs and simplify the process of writing tests!

#### Sorting Numbers

We've all been here before. You've gotten a list of numbers, and need to get it sorted in order. Luckily, you remember that there is a built in function to take care of this for you. And you start writing down the implementation:

```ts
function sort(xs: number[]): number[] {
    return xs.sort()
}
```

Looks good right? Normally we'd test this function by putting down some simple test:

```ts
test('sorts the numbers', () => {
    expect(sort([1, 2, 3])).toEqual([1, 2, 3])
})
```

Everything looks good! Let's try to test the same function with property testing. We first have to define the arbitrary we are going to use. Fortunately this one is easily defined as we only need to have an array of numbers: `array(integer())`.

With this arbitrary we can start testing the function on arbitrary numbers. The second part we need for property testing is to test a specific property of the function. For sorting this can easily be done by writing a function that checks if the output is actually sorted:

```ts
function isSorted(xs: number[]): boolean {
    for (let i = 1; i < xs.length; ++i) {
        if (xs[i - 1] > xs[i]) {
            return false
        }
    }
    return true
}
```

Now we can write the same test, but set it up as a property test. We use the `forAll` primitive, which automatically generates (by default) 100 tests for us with different characteristics, and when the test fails it is going to automatically find the smallest case that fails:

```ts
test('sorts the numbers', () => {
    forAll(array(integer()), (xs) => isSorted(sort(xs)))
})
```

If we run this test we are going to get this output:

``` 
    FalsifiedError: Counter example found after 8 tests (seed: 543856071451n) 
    Shrunk 127 time(s) 
    Counter example: 
     
    [ 10, 2 ] 
```

We're onto something! If we look at the documentation of the [Array.sort](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort) function, we'll see the following line:

> The default sort order is ascending, built upon converting the elements into strings, then comparing their sequences of UTF-16 code units values.

This means that it is lexicographically sorting the numbers. So our implemented `sort` will return `[10, 2]` instead of `[2, 10]`. We fix our sorting function with this new information:

```ts
function sort(xs: number[]): number[] {
    return xs.sort((a, z) => a - z)
}
```

And now the tests succeeds! With property testing we can test all the assumptions we'd normally put in writing the implementation in the first place - without us requiring any extra effort. It does however take some practice to get used to setting up tests this way.

#### Contains

As a nice comparison with the excellent [fast-check](https://github.com/dubzzz/fast-check#getting-started) library, we also include the string contains example:

```ts
describe('contains', () => {
    const contains = (text: string, pattern: string) => text.includes(pattern)

    test('should always contain itself', () => {
        forAll(string(), (text) => contains(text, text))
    })

    test('should always contain its substrings', () => {
        forAll(tuple(string(), string(), string()), ([a, b, c]) => {
            return contains(`${a}${b}${c}`, b)
        })
    })
})
```