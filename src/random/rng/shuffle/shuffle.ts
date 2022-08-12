export function shuffle<T>(xs: readonly T[], random: () => number = Math.random): T[] {
    const axs = [...xs]
    for (let i = xs.length - 1; i > 0; i--) {
        const j = Math.floor(random() * (i + 1))
        const temp = axs[i]
        axs[i] = axs[j]
        axs[j] = temp
    }
    return axs
}
