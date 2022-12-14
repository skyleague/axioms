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
import { string, utf16, utf16Surrogate } from '../string'
import { symbol } from '../symbol'

/**
 * Describes how json values are allowed to be generated.
 *
 * @group Arbitrary
 */
export interface JsonGenerator {
    /**
     * The maximum nesting allowed in array/object.
     */
    maxDepth: number
    /**
     * Controls whether strings should be generated with utf16.
     */
    utf: boolean
    /**
     * Determines the type of json values:
     * * object - generates a json object (default)
     * * array - generates a json array
     * * value - generates a primitive/object/array value
     */
    type: 'array' | 'object' | 'value'
}

/**
 * It returns an arbitrary that generates valid json.
 *
 * ### Example
 * ```ts
 * random(json())
 * // => {}
 *
 * random(json())
 * // => {"i|": false}
 *
 * random(json({type: 'array'}))
 * // => [false]
 * ```
 *
 * @returns A json arbitrary.
 *
 * @group Arbitrary
 */
export function json(constraints: RelaxedPartial<JsonGenerator> = {}): Dependent<Json> {
    const { maxDepth = 2, utf = false, type = 'object' } = constraints
    const arbs = [
        ...(type === 'value' ? [utf ? utf16() : string(), integer(), float(), boolean(), constant(null)] : []),
        ...(maxDepth > 0
            ? [
                  ...(type !== 'array' ? [dict([string(), json({ maxDepth: maxDepth - 1, utf, type: 'value' })])] : []),
                  ...(type !== 'object' ? [array(json({ maxDepth: maxDepth - 1, utf, type: 'value' }))] : []),
              ]
            : []),
    ]
    return oneOf(...arbs)
}

// #endregion

// #region primitive

/**
 * Describes how primitive values are allowed to be generated.
 *
 * @group Arbitrary
 */
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

/**
 * It returns an arbitrary that generates primitives.
 *
 * ### Example
 * ```ts
 * random(primitive())
 * // => null
 *
 * random(primitive())
 * // => Symbol(4EM)
 * ```
 *
 * @returns A primitive arbitrary.
 *
 * @group Arbitrary
 */
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
        nothing: generateNothing = false,
    } = context
    return oneOf(
        ...(generateInteger ? [integer()] : []),
        ...(generateFloat ? [float()] : []),
        ...(generateBoolean ? [boolean()] : []),
        ...(generateString ? [utf16Surrogate()] : []),
        ...(generateSymbol ? [symbol()] : []),
        ...(generateNull ? [constant(null)] : []),
        ...(generateUndefined ? [constant(undefined)] : []),
        ...(generateNothing ? [constant(Nothing)] : [])
    )
}

// #endregion

// #region unknown

/**
 * Describes how unknown values are allowed to be generated.
 *
 * @group Arbitrary
 */
export type UnknownGenerator = PrimitiveGenerator & {
    array: boolean
    object: boolean
    maxDepth: number
}

export type UnknownType = PrimitiveType | PrimitiveType[] | { [k: string]: UnknownType }

/**
 * It returns an arbitrary that generates unknown values.
 *
 * ### Example
 * ```ts
 * random(unknown())
 * // => [false, false, 123]
 *
 * random(unknown())
 * // => ""
 * ```
 *
 * @returns An unknown arbitrary.
 *
 * @group Arbitrary
 */
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
        nothing: generateNothing = false,
        array: generateArray = true,
        object: generateObject = true,
        maxDepth = 1,
    } = context
    return oneOf(
        ...(generateInteger ? [integer()] : []),
        ...(generateFloat ? [float()] : []),
        ...(generateBoolean ? [boolean()] : []),
        ...(generateString ? [utf16Surrogate()] : []),
        ...(generateNull ? [constant(null)] : []),
        ...(generateUndefined ? [constant(undefined)] : []),
        ...(generateNothing ? [constant(Nothing)] : []),
        ...(generateArray && maxDepth > 0 ? [array(unknown({ maxDepth: maxDepth - 1 }))] : []),
        ...(generateObject && maxDepth > 0 ? [dict([string(), unknown({ maxDepth: maxDepth - 1 })])] : [])
    )
}

// #endregion
