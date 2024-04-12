/**
 * Creates a limit function that allows you to schedule promises that execute
 * with a maximum concurrency.
 *
 * ### Example
 * ```ts
 * const limit = parallelLimit(2)
 * const tasks = [
 *   limit(async () => {
 *       await sleep(100)
 *       return 1
 *   }),
 *   limit(() => 2),
 *   limit(() => 3),
 * ]
 * await Promise.all(tasks)
 * // => [1, 2, 3]
 * ```
 *
 * ### Alternatives
 * - [p-limit](https://github.com/sindresorhus/p-limit)
 *
 * @param concurrency - The concurrency limit, constraint to a minimum of 1.
 *
 * @returns A limit function.
 *
 * @group Async
 */
export function parallelLimit(maxConcurrency: number) {
    const concurrency = Math.max(maxConcurrency, 1)
    let activeCount = 0
    const queue: (() => Promise<unknown>)[] = []

    function next() {
        --activeCount
        void queue.shift()?.()
    }
    /**
     * The task function.
     */
    return <T>(task: () => Promise<T> | T): Promise<T> =>
        new Promise<T>((resolve, reject) => {
            async function execute() {
                ++activeCount

                try {
                    resolve(await task())
                } catch (err) {
                    reject(err)
                } finally {
                    next()
                }
            }

            if (activeCount < concurrency) {
                void execute()
            } else {
                queue.push(execute)
            }
        })
}
