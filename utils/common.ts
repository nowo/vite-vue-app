/**
 * waitUtil方法
 * @param ms 需要等待的时间，毫秒级
 * @returns {Promise} wait
 * @example
 * ```js
 * // 等待1秒后，再往后面运行
 * await wait(1000)
 * ```
 */
export const wait = (ms: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, ms)
    })
}
