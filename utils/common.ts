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

/**
 * 数据深拷贝方法
 * @param data 原数据
 * @returns 拷贝后的新数据
 */
export const deepClone = <T = any>(data: T): T => {
    let newObj: any
    // 先使用原生自带的深拷贝，出错了就使用自己自定义的方法
    try {
        newObj = structuredClone(data)
    } catch (err) {
        try {
            newObj = Array.isArray(data) ? [] : {}
        } catch (error) {
            newObj = {}
        }
        for (const attr in data) {
            if (data[attr] && typeof data[attr] === 'object') {
                newObj[attr] = deepClone(data[attr])
            } else {
                newObj[attr] = data[attr]
            }
        }
    }
    return newObj
}
