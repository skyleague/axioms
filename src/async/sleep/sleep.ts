/**
 * Sleeps the cothread for the specified number of millisecond.
 *
 * ### Example
 * ```ts
 * await sleep(1_000)
 * // => sleeps for 1 second
 * ```
 *
 * @param ms - The amount of milliseconds to sleep.
 *
 * @returns A promise that resolves when the sleep has ended.
 *
 * @group Async
 */
export async function sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms))
}
