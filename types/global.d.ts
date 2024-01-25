declare module 'element-plus/dist/locale/zh-cn.mjs';
declare module 'element-plus/dist/locale/en.mjs';
declare module 'splitpanes';

// declare module "@auth/core/types" {
//     interface Session {
//         user?: User
//     }
//     interface User {
//         id: number;
//         username: string
//     }
// }

// export { }

interface ImportMetaEnv {
    VITE_APP_TITLE: string
    // 更多环境变量...
    VITE_APP_BASEURL: string
}

// CoSearchDataColumnValueType
type CoFormToolConfig<T> = {
    column: CoSearchDataColumnItem<T>

    // slot?: boolean
    // placeholder?: string
    width?: string
    isHide?: boolean
} & Partial<CoSearchDataColumnValueType>
// & Partial<{
//     type?: any
//     props?: any
// }>
// & Partial<CoSearchDataColumnValueType>

// search搜索项 数据格式公共类型
// declare interface CoFormToolProps<T> {
//     data: T
//     // config: {
//     //     [key in keyof T]: { label: string, slot?: boolean, placeholder: string, width: string }
//     // },
//     config: CoFormToolConfig<T>[]
//     // searchFunc?: () => void,     // 查询方法
//     hideBtn?: boolean
//     showAll?: boolean
// }

// search搜索项 数据格式公共类型
declare interface CoFormToolProps<T = Record<string, any>> {
    data: T
    // config: {
    //     [key in keyof T]: { label: string, slot?: boolean, placeholder: string, width: string }
    // },
    config: { column: CoSearchDataColumnItem<T>, placeholder?: string, width?: string, isHide?: boolean }[]
    // searchFunc?: () => void,     // 查询方法
    hideBtn?: boolean
    showAll?: boolean
}

// type CoTableColumnProperty<T> = keyof T | `${keyof T}Header` | 'operate' | 'operateHeader' | ''

interface CoTableHeader<T> extends CoTableColumnCtx<T> {
    property: keyof T | 'operate' | ''
    // property: CoTableColumnProperty<T>
    label: string
    other?: {
        // slot?: boolean
        // slotHeader?: boolean
        isHide?: boolean // 是否隐藏项
        isShow?: boolean // 是否显示字段
    }

}

type CoTableColumnPropertyHeader<T> = `${keyof T}Header` | 'operateHeader'

type CoTableColumnProperty<T> = CoTableHeader<T>['property']

// table 数据格式公共类型
declare interface CoTableProps<T> {
    data: T[]
    // tableHeader: ({
    //     property: CoTableColumnProperty<T>
    //     label: string
    //     slot?: boolean
    //     // [key: string]: any
    // } extends CoTableColumnCtx<T>)[]

    tableHeader: CoTableHeader<T>[]
    pagination: { // 分页
        total: number
        page: number
        page_size: number
        page_sizes: number[]
    }
    isTool?: boolean // 是否显示配置栏
    loading?: boolean // loading
}
