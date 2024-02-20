/**
 * 从树形数据中取得对应的项， 传入需要遍历的数组，需要匹配的id(根据id取得对应的那一项)
 * @param data 数组数据，平级或树形数组皆可
 * @param val 键值id的值，（唯一）
 * @param key id 默认（唯一不重复的键值）
 * @param children 子类
 * @returns {T} 对应的项
 * @example
 * ```js|ts
 * let list = [
 *     {
 *         name: 'option1', id: 1,
 *         children: [
 *             { name: 'option1.1', id: 3 }
 *         ]
 *     },
 *     { name: 'option2', id: 2 }
 * ]
 * findNodeItem(list, 3, 'id', 'children') // { name: 'option1.1', id: 3 }
 * ```
 *
 */
export function findTreeNodeItem<T = any>(data: Array<T>, val: T[keyof T], key = 'id' as keyof T, children = 'children' as keyof T): T | undefined {
    let temp: any = ''
    const forFn = function (arr: any[], id: T[keyof T]) {
        for (let i = 0; i < arr.length; i++) {
            if (temp) break // 已经拿到值了,就退出循环

            const item = arr[i]
            // 找到值对应的那一项，赋值
            if (item[key] === val) temp = item
            // 有子类，子类继续循环
            if (item[children]) forFn(item[children], id)
        }
    }
    forFn(data, val)
    return temp
}

/**
 * 树形json数据数组转平级普通数组
 * @param classifyList 嵌套数组
 * @param id 关联的键值，默认id
 * @param key 上级所属的键值，默认pid
 * @param children 嵌套数组的子类，子类的键值，默认children
 * @returns any[]
 * ```js|ts
 * let list = [
 *     {
 *         name: 'option1', id: 1,
 *         children: [
 *             { name: 'option1.1', id: 3 }
 *         ]
 *     },
 *     { name: 'option2', id: 2 }
 * ]
 * transformTreeToArrayList(list, 'id', 'pid', 'children') // [{ name: 'option1', id: 1, pid: 0, children: [{ name: 'option1.1', id: 3 }] }, { name: 'option1.1', id: 3, pid: 1 }, { name: 'option2', id: 2 }]
 * ```
 */
export function transformTreeToArrayList<T = any>(classifyList: Array<T>, id = 'id' as keyof T, key = 'pid', children = 'children' as keyof T): T[] {
    const temp: any[] = []
    const forFn = function (arr: string | any[], val = 0) {
        for (let i = 0; i < arr.length; i++) {
            const item = arr[i]
            if (val) item[key] = val
            temp.push(item)

            if (item[children]) forFn(item[children], item[id])
        }
    }
    forFn(classifyList)
    return temp
}

/**
 * @function 将普通的数组转换为父子结构（一级数组->多级数组）
 * @param sNodes 普通的数组（需要转换成父子结构的数组）
 * @param child 子类的字段名，默认为children
 * @param id 数组项唯一的id字段名，默认为id
 * @param pid 归属于哪个id的字段名（父id字段名），默认为pid
 * @returns Array
 * @example
 * ```js|ts
 * const list = [
 *     { name: 'option1', id: 1 },
 *     { name: 'option1.1', id: 3, pid: 1 },
 *     { name: 'option2', id: 2 },
 * ]
 * transformArrayToTreeList(list, 'children', 'id', 'pid') // [{ name: 'option1', id: 1, children: [{ name: 'option1.1', id: 3, pid: 1 }] }, { name: 'option2', id: 2 }]
 * ```
 */
export function transformArrayToTreeList<T = any>(sNodes: T[], child = 'children' as keyof T, id = 'id' as keyof T, pid = 'pid' as keyof T) { // 将普通的数组转换为父子结构
    // var id = "id";    //id字段名
    // var pid = "pid";  //父id字段名

    const r = []
    const tmpMap: any = {}
    for (let i = 0; i < sNodes.length; i++) {
        // 判断原先数组有没有这个字段
        if (sNodes[i][child]) {
            throw new Error(`数组中存在${String(child)}字段，换一个参数`)
        }
        tmpMap[sNodes[i][id]] = sNodes[i]
    }
    for (let i = 0; i < sNodes.length; i++) {
        const p = tmpMap[sNodes[i][pid]] // 得到会在子类的项

        if (p && sNodes[i][id] !== sNodes[i][pid]) {
            // 判断是否有child数组,没有就给个空数组（也就是刚开始的时候）
            p[child] = p[child] ? p[child] : []
            p[child].push(sNodes[i]) // 追加到当前项
        } else {
            r.push(sNodes[i])
        }
    }
    return r
}
