export function weightedChoice<T>(choices: readonly [number, T][]): (pick?: number) => T {
    let totalSum = 0
    const cummulatedWeights: number[] = []
    for (let i = 0; i !== choices.length; ++i) {
        totalSum += choices[i]![0]
        cummulatedWeights.push(totalSum)
    }

    return (pick: number = Math.random()) => {
        const selected = pick * totalSum
        for (let i = 0; i !== cummulatedWeights.length; ++i) {
            if (selected < cummulatedWeights[i]!) {
                return choices[i]![1]
            }
        }
        return choices[0]![1]
    }
}
