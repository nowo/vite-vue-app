import type { TableColumnCtx, TableInstance } from 'element-plus'
import { ref } from 'vue'
import { wait } from '@/utils/common'

/**
 * element-plus table组件合计方法
 * @param param 原有element-plus合计计算方法返回的参数
 * @param param.columns 原有element-plus合计计算方法返回的参数
 * @param param.data 原有element-plus合计计算方法返回的参数
 * @param option 合计的数据选项，需要合计的字段、保留小数位数、合计文字显示等等
 * @returns string[]
 */
export const useTableSummaries = <T = any>(param: {
    columns: TableColumnCtx<T>[]
    data: T[]
}, option: TableSummaryContent<T>) => {
    const { columns } = param
    const data = ref(param.data)
    const sums: string[] = []
    const num = option.countText?.[0] ?? 0
    const countText = option.countText?.[1] ?? '合计'
    columns.forEach((column, index) => {
        if (index === num) return sums[index] = countText

        const textArr = Object.keys(option.data)
        const key = column.property as keyof T
        if (textArr.includes(key as string)) {
            let count = 0
            if (option.data[key]?.text) {
                return sums[index] = option.data[key]?.text || ''
            } else if (option.data[key]?.value || Number(option.data[key]?.value) === 0) {
                count = Number(option.data[key]?.value) ?? 0
            } else {
                const values = data.value.map(item => Number(item[key]))
                count = values.reduce((prev, curr) => {
                    const value = Number(curr)
                    return Number.isNaN(value) ? prev : prev + curr
                }, 0)
            }
            let num = option.precision ?? 2 // 默认保留两位小数
            if (typeof (option.data[key]?.precision) === 'number') num = option.data[key]?.precision ?? 0

            return sums[index] = `${count.toFixed(num)}`
        }
        return sums[index] = ''
    })
    return sums
}

/**
 * element-plus table组件缓存滚动位置不对的情况
 * @param tableRef table组件对象
 * @returns string[]
 */
export const useTableScrollbarLoad = async (tableRef?: TableInstance) => {
    if (!tableRef) return
    // const scrollBarRef = tableRef?.scrollBarRef
    // console.log(scrollBarRef)
    // scrollBarRef.handleScroll()
    // scrollBarRef.wrapRef.scrollLeft
    // scrollBarRef.update()
    // tableRef.value?.doLayout()

    function getTranslateValue(translateString: string) {
        const reg = /[1-9][0-9]*\.?[0-9]*/g
        const matchArr = translateString.match(reg)
        if (!matchArr?.[0]) return 0

        return Number(matchArr?.[0]) * 0.01
    }

    await wait(150)
    nextTick(() => {
        const scrollbarDom = tableRef.$el.querySelector('.el-table__body-wrapper>.el-scrollbar')
        // console.log('scrollbarDom :>> ', scrollbarDom);
        // console.log('scrollbarDom.children :>> ', scrollbarDom.children);
        const vertical = Array.from(scrollbarDom.children as HTMLDivElement[]).find(item => item.className.includes('el-scrollbar__bar') && item.className.includes('is-vertical'))
        const horizontal = Array.from(scrollbarDom.children as HTMLDivElement[]).find(item => item.className.includes('el-scrollbar__bar') && item.className.includes('is-horizontal'))

        // console.log('vertical :>> ', vertical);
        // console.log('horizontal :>> ', horizontal);
        if (!vertical || !horizontal) return

        // console.log(vertical?.querySelector('.el-scrollbar__thumb'))
        const y = vertical?.querySelector<HTMLDivElement>('.el-scrollbar__thumb')?.style?.transform
        const translateY = getTranslateValue(y || '')
        // * 0.01
        // console.log(translateY)
        const numY = translateY ? vertical?.offsetHeight / translateY : 0
        // console.log(numY)

        const x = horizontal?.querySelector<HTMLDivElement>('.el-scrollbar__thumb')?.style?.transform
        // console.log('x :>> ', x);
        const translateX = getTranslateValue(x || '')
        // console.log('translateX :>> ', translateX);
        // * 0.01
        const numX = horizontal.offsetWidth * translateX
        // console.log({
        //     left: numX,
        //     top: numY
        // })
        tableRef.scrollTo({
            left: numX,
            top: numY,
        })
    })
}
