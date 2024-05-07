import { describe, expect, it } from 'vitest'
import { collect } from '../../../array/index.js'
import { repeat } from '../../../generator/index.js'
import { take } from '../../../iterator/index.js'
import { arbitraryContext } from '../../arbitrary/context/context.js'
import { xoroshiro128plus } from '../../rng/index.js'
import { ipv4, ipv6 } from './ip.js'

describe('ipv4', () => {
    it('random sample', () => {
        const ctx = arbitraryContext({ rng: xoroshiro128plus(1638968569864n) })
        const aint = ipv4()
        expect(
            collect(
                take(
                    repeat(() => aint.sample(ctx)),
                    10,
                ),
            ),
        ).toMatchInlineSnapshot(`
        [
          "140.69.120.9",
          "206.9.20.100",
          "46.38.68.188",
          "31.251.34.176",
          "122.167.224.240",
          "246.111.142.117",
          "85.47.185.191",
          "65.251.237.85",
          "117.213.50.232",
          "95.98.40.63",
        ]
      `)
    })

    it('random sample - xl', () => {
        const ctx = arbitraryContext({ rng: xoroshiro128plus(1638968569864n), size: 'xl' as const })
        const aint = ipv4()
        expect(
            collect(
                take(
                    repeat(() => aint.sample(ctx)),
                    10,
                ),
            ),
        ).toMatchInlineSnapshot(`
        [
          "140.69.120.9",
          "206.9.20.100",
          "46.38.68.188",
          "31.251.34.176",
          "122.167.224.240",
          "246.111.142.117",
          "85.47.185.191",
          "65.251.237.85",
          "117.213.50.232",
          "95.98.40.63",
        ]
      `)
    })
})

describe('ipv4', () => {
    it('random sample', () => {
        const ctx = arbitraryContext({ rng: xoroshiro128plus(1638968569864n) })
        const aint = ipv6()
        expect(
            collect(
                take(
                    repeat(() => aint.sample(ctx)),
                    10,
                ),
            ),
        ).toMatchInlineSnapshot(`
        [
          "70c0:6224:1f2b:aeff:8752:b4fe:7d3e:6238",
          "c7c5:a419:1b87:fbab:969f:4d05:ee02:678f",
          "eb1c:e36c:bac0:7e69:6870:0a25:e2ee:b18e",
          "926a:3bd1:0a1e:feb1:5bf2:9b25:015a:7366",
          "2946:f7ba:3638:2219:1a0d:4108:90bb:1daf",
          "2e07:a121:9222:8420:300f:f88c:3f42:8272",
          "f849:7e59:f2de:6258:5e0d:2fee:de0a:6a23",
          "a14b:1241:016b:9eaa:3be5:63b1:096b:84e4",
          "f75d:c062:a2ad:4ee2:252f:73b0:1b47:cef4",
          "9a43:158e:5c01:28e2:679b:3347:c8a8:ed62",
        ]
      `)
    })

    it('random sample - xl', () => {
        const ctx = arbitraryContext({ rng: xoroshiro128plus(1638968569864n), size: 'xl' as const })
        const aint = ipv6()
        expect(
            collect(
                take(
                    repeat(() => aint.sample(ctx)),
                    10,
                ),
            ),
        ).toMatchInlineSnapshot(`
        [
          "70c0:6224:1f2b:aeff:8752:b4fe:7d3e:6238",
          "c7c5:a419:1b87:fbab:969f:4d05:ee02:678f",
          "eb1c:e36c:bac0:7e69:6870:0a25:e2ee:b18e",
          "926a:3bd1:0a1e:feb1:5bf2:9b25:015a:7366",
          "2946:f7ba:3638:2219:1a0d:4108:90bb:1daf",
          "2e07:a121:9222:8420:300f:f88c:3f42:8272",
          "f849:7e59:f2de:6258:5e0d:2fee:de0a:6a23",
          "a14b:1241:016b:9eaa:3be5:63b1:096b:84e4",
          "f75d:c062:a2ad:4ee2:252f:73b0:1b47:cef4",
          "9a43:158e:5c01:28e2:679b:3347:c8a8:ed62",
        ]
      `)
    })
})
