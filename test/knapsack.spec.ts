import { sum } from '../src/array/index.js'
import { enumerate, range } from '../src/generator/index.js'

import { expect, it } from 'vitest'

it('knapsack', () => {
    const items: [string, number, number][] = [
        ['map', 9, 150],
        ['compass', 13, 35],
        ['water', 153, 200],
        ['sandwich', 50, 160],
        ['glucose', 15, 60],
        ['tin', 68, 45],
        ['banana', 27, 60],
        ['apple', 39, 40],
        ['cheese', 23, 30],
        ['beer', 52, 10],
        ['suntan cream', 11, 70],
        ['camera', 32, 30],
        ['t-shirt', 24, 15],
        ['trousers', 48, 10],
        ['umbrella', 73, 40],
        ['waterproof trousers', 42, 70],
        ['waterproof overclothes', 43, 75],
        ['note-case', 22, 80],
        ['sunglasses', 7, 20],
        ['towel', 18, 12],
        ['socks', 4, 50],
        ['book', 30, 10],
    ]

    function value(xs: [string, number, number][], maxWeight: number): number {
        return sum(xs.map((x) => x[1])) <= maxWeight ? sum(xs.map((x) => x[2])) : 0
    }

    function knapsack(its: [name: string, weight: number, value: number][], maxWeight: number) {
        const cache = Array.from(Array(maxWeight + 1), () => Array<number>(maxWeight + 1).fill(0))

        for (const [j, [, weight, val]] of enumerate(its)) {
            for (const w of range(1, maxWeight + 1)) {
                cache[j + 1]![w] = weight > w ? cache[j]![w]! : Math.max(cache[j]![w]!, cache[j]![w - weight]! + val)
            }
        }

        const result = []
        let w = maxWeight
        for (let j = its.length; j > 0; --j) {
            const added = cache[j]![w]! !== cache[j - 1]![w]!
            if (added) {
                const [, weight] = its[j - 1]!
                result.push(its[j - 1]!)
                w -= weight
            }
        }
        return result
    }

    const result = knapsack(items, 400)
    expect(result).toMatchInlineSnapshot(`
        [
          [
            "socks",
            4,
            50,
          ],
          [
            "sunglasses",
            7,
            20,
          ],
          [
            "note-case",
            22,
            80,
          ],
          [
            "waterproof overclothes",
            43,
            75,
          ],
          [
            "waterproof trousers",
            42,
            70,
          ],
          [
            "suntan cream",
            11,
            70,
          ],
          [
            "banana",
            27,
            60,
          ],
          [
            "glucose",
            15,
            60,
          ],
          [
            "sandwich",
            50,
            160,
          ],
          [
            "water",
            153,
            200,
          ],
          [
            "compass",
            13,
            35,
          ],
          [
            "map",
            9,
            150,
          ],
        ]
    `)
    expect(value(result, 400)).toMatchInlineSnapshot('1030')

    const greedy: [string, number, number][] = [
        ['sunscreen', 15, 2],
        ['gps', 25, 2],
        ['beer', 35, 3],
    ]
    expect(knapsack(greedy, 40)).toMatchInlineSnapshot(`
        [
          [
            "gps",
            25,
            2,
          ],
          [
            "sunscreen",
            15,
            2,
          ],
        ]
    `)
})
