import { collect } from '../../../array'
import type { Traversable } from '../../../type'

export function shuffle<T>(xs: Traversable<T>, random: () => number = Math.random): T[] {
    const axs = collect(xs)
    for (let i = axs.length - 1; i > 0; i--) {
        const j = Math.floor(random() * (i + 1))
        const temp = axs[i]
        axs[i] = axs[j]
        axs[j] = temp
    }
    return axs
}
