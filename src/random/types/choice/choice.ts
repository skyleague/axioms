export function weightedChoice<T>(choices: readonly [number, T][]): (pick?: number) => T {
    let totalSum = 0
    const cummulatedWeights: number[] = []
    for (const choice of choices) {
        totalSum += choice[0]
        cummulatedWeights.push(totalSum)
    }

    return (pick: number = Math.random()) => {
        const selected = pick * totalSum
        for (let i = 0; i !== cummulatedWeights.length; ++i) {
            // biome-ignore lint/style/noNonNullAssertion: The array is guaranteed to have a value at this index
            if (selected < cummulatedWeights[i]!) {
                // biome-ignore lint/style/noNonNullAssertion: The array is guaranteed to have a value at this index
                return choices[i]![1]
            }
        }
        // biome-ignore lint/style/noNonNullAssertion: The array is guaranteed to have a value at this index
        return choices[0]![1]
    }
}
