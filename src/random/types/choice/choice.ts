import { sum } from '../../../array'

export function weightedChoice<T>(choices: readonly [number, T][]): (pick?: number) => T {
    const totalSum = sum(choices.map((c) => c[0]))

    return (pick: number = Math.random()) => {
        const threshold = pick * totalSum
        let total = 0
        for (let i = 0; i < choices.length - 1; ++i) {
            total += choices[i][0]
            if (total >= threshold) {
                return choices[i][1]
            }
        }
        return choices[choices.length - 1][1]
    }
}
