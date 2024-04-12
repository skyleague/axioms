import { Nothing } from '../../../type/maybe/index.js'
import type { Maybe } from '../../../type/maybe/maybe.js'
import type { RelaxedPartial } from '../../../type/partial/index.js'
import type { JsonValue, Primitive } from '../../../types.js'
import type { ArbitrarySize } from '../../arbitrary/arbitrary/size.js'
import type { Dependent } from '../../arbitrary/dependent/index.js'
import { array } from '../array/index.js'
import { boolean } from '../boolean/index.js'
import { float } from '../float/index.js'
import { memoizeArbitrary } from '../helper/helper.js'
import { constant } from '../helper/index.js'
import { integer } from '../integer/index.js'
import { oneOf } from '../one-of/index.js'
import { record } from '../record/index.js'
import { string, utf16, utf16Surrogate } from '../string/index.js'
import { symbol } from '../symbol/index.js'

/**
 * Describes how json values are allowed to be generated.
 *
 * @group Arbitrary
 */
export interface JsonGenerator {
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
    size?: ArbitrarySize
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
export function json(constraints: RelaxedPartial<JsonGenerator> = {}): Dependent<JsonValue> {
    const { utf = false, type = 'object', size } = constraints
    const arbs = [
        ...(type === 'value' ? [boolean(), utf ? utf16({ size }) : string({ size }), integer(), float(), constant(null)] : []),
        ...[
            ...(type !== 'array'
                ? [
                      record([string({ size }), memoizeArbitrary(() => json({ utf, type: 'value', size }))], {
                          minLength: 0,
                          size,
                      }),
                  ]
                : []),
            ...(type !== 'object'
                ? [
                      array(
                          memoizeArbitrary(() => json({ utf, type: 'value', size })),
                          { minLength: 0, maxLength: 5, size },
                      ),
                  ]
                : []),
        ],
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
export function primitive(context: RelaxedPartial<PrimitiveGenerator> & { nothing: false }): Dependent<Primitive>
export function primitive(context?: RelaxedPartial<PrimitiveGenerator>): Dependent<Maybe<Primitive>>
export function primitive(context: RelaxedPartial<PrimitiveGenerator> = {}): Dependent<Maybe<Primitive>> {
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
        ...(generateNothing ? [constant(Nothing)] : []),
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
    size: ArbitrarySize
}

export type UnknownType = Maybe<Primitive> | Maybe<Primitive>[] | { [k: string]: UnknownType }

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
    context: RelaxedPartial<UnknownGenerator> & { nothing: false },
): Dependent<boolean | number | string | null | undefined>
export function unknown(
    context?: RelaxedPartial<UnknownGenerator>,
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
        size,
    } = context
    return oneOf(
        ...(generateInteger ? [integer()] : []),
        ...(generateFloat ? [float()] : []),
        ...(generateBoolean ? [boolean()] : []),
        ...(generateString ? [utf16Surrogate({ size })] : []),
        ...(generateNull ? [constant(null)] : []),
        ...(generateUndefined ? [constant(undefined)] : []),
        ...(generateNothing ? [constant(Nothing)] : []),
        ...(generateArray && maxDepth > 0
            ? [array(unknown({ maxDepth: maxDepth - 1, size }), { minLength: 0, maxLength: 5, size })]
            : []),
        ...(generateObject && maxDepth > 0
            ? [record([string(), unknown({ maxDepth: maxDepth - 1, size })], { minLength: 0, maxLength: 5, size })]
            : []),
    )
}

// #endregion
