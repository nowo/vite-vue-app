declare module 'element-plus/dist/locale/zh-cn.mjs';
declare module 'element-plus/dist/locale/en.mjs';

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

// type CoTableColumnProperty<T> = keyof T | `${keyof T}Header` | 'operate' | 'operateHeader' | ''

interface CoTableHeader<T> extends CoTableColumnCtx<T> {
    property: keyof T | 'operate' | ''
    // property: CoTableColumnProperty<T>
    label: string
    slot?: boolean
    slotHeader?: boolean
}

type CoTableColumnProperty<T> = CoTableHeader<T>['property'] | `${keyof T}Header` | 'operateHeader'

// table 数据格式公共类型
declare interface CoTableType<T = object> {
    data: T[]
    // tableHeader: ({
    //     property: CoTableColumnProperty<T>
    //     label: string
    //     slot?: boolean
    //     // [key: string]: any
    // } extends CoTableColumnCtx<T>)[]
    tableHeader: CoTableHeader<T>[]
    pagination: {
        total: number
        page: number
        page_size: number
        page_sizes: number[]
    }
    loading?: boolean
}
