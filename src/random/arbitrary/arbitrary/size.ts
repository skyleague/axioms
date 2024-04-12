import type { ArbitraryContext } from '../context/context.js'

export type RelativeSize = (typeof relativeSize)[number]

export const absoluteSize = ['xs', 's', 'm', 'l', 'xl'] as const

export type AbsoluteSize = (typeof absoluteSize)[number]
export const relativeSize = ['-4', '-3', '-2', '-1', '=', '+1', '+2', '+3', '+4'] as const

export type ArbitrarySize = RelativeSize | AbsoluteSize | 'max' | undefined

export function fromMinLength({ minLength, size }: { minLength: number; size: AbsoluteSize }): number {
    return {
        xs: Math.floor(1.2 * minLength) + 1,
        s: Math.ceil(1.6 * minLength + 10),
        m: 10 * minLength + 100,
        l: 100 * minLength + 1000,
        xl: 1000 * minLength + 10000,
    }[size]
}

export function fromRelativeSize(size: AbsoluteSize | RelativeSize, defSize: AbsoluteSize): AbsoluteSize {
    const defaultIndex = absoluteSize.indexOf(defSize)

    if (relativeSize.includes(size as RelativeSize)) {
        const relativeIndex = relativeSize.indexOf(size as RelativeSize) - 4
        const newIndex = defaultIndex + relativeIndex
        // biome-ignore lint/style/noNonNullAssertion: The index is bounded by the length of absoluteSize
        return absoluteSize[Math.max(0, Math.min(absoluteSize.length - 1, newIndex))]!
    }
    return size as AbsoluteSize
}

const defaultSizeSupremum = false
export function maxLengthArbitrary({
    context,
    size,
    minLength,
    maxLength,
    supremum = 2147483647,
}: {
    context: ArbitraryContext
    size?: ArbitrarySize | undefined
    minLength: number
    maxLength?: number | undefined
    supremum?: number
}): number {
    const definedSize = size ?? (maxLength !== undefined && defaultSizeSupremum ? 'max' : context.size)
    if (definedSize === 'max') {
        return maxLength ?? supremum
    }
    const finalSize = fromRelativeSize(definedSize, context.size)
    const maxBasedOnSize = fromMinLength({ minLength, size: finalSize })
    return Math.min(maxBasedOnSize, maxLength ?? supremum)
}

export function depthArbitrary({
    depth,
    context,
    maxDepth,
}: {
    context: ArbitraryContext
    depth?: ArbitrarySize
    maxDepth?: number
}): number {
    const definedSize = depth ?? (maxDepth !== undefined && defaultSizeSupremum ? 'max' : context.depth)
    if (definedSize === 'max') {
        return 0
    }
    const size = fromRelativeSize(definedSize, context.size)
    return {
        xs: 1,
        s: 1 / 2,
        m: 1 / 4,
        l: 1 / 8,
        xl: 1 / 16,
    }[size]
}
