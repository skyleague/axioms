// #region json

import type { Json } from '../../../type/json'
import { Nothing } from '../../../type/maybe'
import type { RelaxedPartial } from '../../../type/partial'
import type { Dependent } from '../../arbitrary/dependent'
import { array } from '../array'
import { boolean } from '../boolean'
import { dict } from '../dict'
import { float } from '../float'
import { constant } from '../helper'
import { integer } from '../integer'
import { oneOf } from '../one-of'
import { string, utf16, utf16surrogate } from '../string'
import { symbol } from '../symbol'

export interface JsonGenerator {
    maxDepth: number
    utf: boolean
    object: boolean
}

export function json(context: RelaxedPartial<JsonGenerator> = {}): Dependent<Json> {
    const { maxDepth = 3, utf = false, object = false } = context
    const arbs = [
        ...(!object ? [utf ? utf16() : string(), integer(), float(), boolean(), constant(null)] : []),
        ...(maxDepth > 0
            ? [dict([string(), json({ maxDepth: maxDepth - 1, utf })]), array(json({ maxDepth: maxDepth - 1, utf }))]
            : []),
    ]
    return oneOf(...arbs)
}

// #endregion

// #region primitive

export interface PrimitiveGenerator {
    integer: boolean
    float: boolean
    boolean: boolean
    string: boolean
    symbol: boolean
    null: boolean
    undefined: boolean
    nothing: boolean
}

export type PrimitiveType = Nothing | boolean | number | string | symbol | null | undefined

export function primitive(
    context: RelaxedPartial<PrimitiveGenerator> & { nothing: false }
): Dependent<boolean | number | string | null | undefined>
export function primitive(
    context?: RelaxedPartial<PrimitiveGenerator>
): Dependent<Nothing | boolean | number | string | null | undefined>
export function primitive(context: RelaxedPartial<PrimitiveGenerator> = {}): Dependent<PrimitiveType | PrimitiveType[]> {
    const {
        integer: generateInteger = true,
        float: generateFloat = true,
        boolean: generateBoolean = true,
        string: generateString = true,
        symbol: generateSymbol = true,
        null: generateNull = true,
        undefined: generateUndefined = true,
        nothing: generateNothing = true,
    } = context
    return oneOf(
        ...(generateInteger ? [integer()] : []),
        ...(generateFloat ? [float()] : []),
        ...(generateBoolean ? [boolean()] : []),
        ...(generateString ? [utf16surrogate()] : []),
        ...(generateSymbol ? [symbol()] : []),
        ...(generateNull ? [constant(null)] : []),
        ...(generateUndefined ? [constant(undefined)] : []),
        ...(generateNothing ? [constant(Nothing)] : [])
    )
}

// #endregion

// #region unknown

export type UnknownGenerator = PrimitiveGenerator & {
    array: boolean
    object: boolean
    maxDepth: number
}

export type UnknownType = PrimitiveType | PrimitiveType[] | { [k: string]: UnknownType }

export function unknown(
    context: RelaxedPartial<UnknownGenerator> & { nothing: false }
): Dependent<boolean | number | string | null | undefined>
export function unknown(
    context?: RelaxedPartial<UnknownGenerator>
): Dependent<Nothing | boolean | number | string | null | undefined>
export function unknown(context: RelaxedPartial<UnknownGenerator> = {}): Dependent<UnknownType> {
    const {
        integer: generateInteger = true,
        float: generateFloat = true,
        boolean: generateBoolean = true,
        string: generateString = true,
        null: generateNull = true,
        undefined: generateUndefined = true,
        nothing: generateNothing = true,
        array: generateArray = true,
        object: generateObject = true,
        maxDepth = 1,
    } = context
    return oneOf(
        ...(generateInteger ? [integer()] : []),
        ...(generateFloat ? [float()] : []),
        ...(generateBoolean ? [boolean()] : []),
        ...(generateString ? [utf16surrogate()] : []),
        ...(generateNull ? [constant(null)] : []),
        ...(generateUndefined ? [constant(undefined)] : []),
        ...(generateNothing ? [constant(Nothing)] : []),
        ...(generateArray && maxDepth > 0 ? [array(unknown({ maxDepth: maxDepth - 1 }))] : []),
        ...(generateObject && maxDepth > 0 ? [dict([string(), unknown({ maxDepth: maxDepth - 1 })])] : [])
    )
}

// #endregion
