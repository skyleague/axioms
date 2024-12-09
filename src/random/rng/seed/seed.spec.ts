import { expect, it } from 'vitest'
import { seeder2, splitmix64 } from './seed.js'

it('produces valid seeds', () => {
    expect(seeder2(42n)).toMatchInlineSnapshot(`
      [
        13679457532755275413n,
        2949826092126892291n,
      ]
    `)
    expect(seeder2(43n)).toMatchInlineSnapshot(`
      [
        13432527470776545160n,
        11303639812522640203n,
      ]
    `)
    expect(splitmix64(1234567n).take(5).toArray()).toEqual([
        6457827717110365317n,
        3203168211198807973n,
        9817491932198370423n,
        4593380528125082431n,
        16408922859458223821n,
    ])
})
