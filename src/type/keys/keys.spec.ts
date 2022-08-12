import type { RequireKeys } from '.'

test('RequireKeys is distributive on union types', () => {
    type U = { a?: string; x: string } | { a?: string; y: string } | { z: string }
    type RU = RequireKeys<U, 'a'>

    {
        // @ts-expect-error Not allowed to get 'a', since 'a' isn't in every part of the union
        type _A = U['a']
    }
    {
        // property 'a' is in every part of the union
        const a = 'a' as unknown as RU['a']
        // property 'a' is no longer optional
        const _str: string = a
    }

    {
        // @ts-expect-error Not allowed to get 'x', since RU is still a union
        type _X = RU['x']
        // @ts-expect-error Not allowed to get 'y', since RU is still a union
        type _Y = RU['y']

        // @ts-expect-error Not allowed to get 'z', since RU doesn't contain any element with 'z'
        type _Z = RU['z']
    }
    {
        type _X = Extract<RU, { x: any }>['x']
        type _Y = Extract<RU, { y: any }>['y']

        type _Z = Extract<RU, { z: any }>
        // @ts-expect-error String is not assignable to never
        const _z: _Z = { z: 'wut' }
    }
    {
        const _z: U = { z: 'yay' }
    }
})
