export function parallelLimit(concurrency: number) {
    if (concurrency < 1 || !Number.isSafeInteger(concurrency)) {
        console.warn(`Invalid concurrency: ${concurrency}. Reverting to concurrency = 1`)
    }
    let activeCount = 0
    const queue: Array<() => Promise<unknown>> = []

    function next() {
        --activeCount
        void queue.shift()?.()
    }

    return <T>(task: () => Promise<T> | T): Promise<T> =>
        new Promise<T>((resolve, reject) => {
            async function execute() {
                ++activeCount

                try {
                    resolve(await task())
                } catch (err) {
                    reject(err)
                } finally {
                    void next()
                }
            }

            if (activeCount < concurrency) {
                void execute()
            } else {
                queue.push(execute)
            }
        })
}
