import { getProp } from './get-prop.js'

import { Nothing, enumerate, forAll, isObject, string, tuple, unknown } from '../../index.js'
import { record } from '../../random/types/record/record.js'

import { it, expect, assertType } from 'vitest'

it('retrieves simple paths', () => {
    const obj = {
        a: {
            b: {
                c: 5,
            },
        },
    }
    const c = getProp(obj, 'a.b.c')
    expect(c).toEqual(5)
    assertType<number>(c)

    const d = getProp(obj, 'a.b.d')
    expect(d).toEqual(Nothing)
})

it('returns undefined for non-existent properties', () => {
    forAll(tuple(unknown(), string()), ([obj, path]) => {
        const [first] = path.split('.')
        if (isObject(obj) && first !== undefined) {
            // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
            delete obj[first]
        }
        expect(getProp(obj, path)).toEqual(Nothing)
    })
})

it('returns the correct value for existing properties', () => {
    forAll(tuple(record(unknown()), string(), unknown()), ([obj, path, value]) => {
        const pathArr = path.split('.')
        let current = obj as any
        for (const [i, key] of enumerate(pathArr)) {
            if (i === pathArr.length - 1) {
                current[key] = value
            } else {
                current[key] = {}
            }
            current = current[key]
        }
        expect(getProp(obj, path)).toEqual(value)
    })
})
