/**
 * 该文件主要用作对某些库数据类型的扩展
 */

import type { PrismaClient } from '@prisma/client'
import 'vue-router'

import type { GlobalComponents } from '@vue/runtime-core'
import type { RouteRecordRaw } from 'vue-router'
import type { FormItemProps, TableColumnCtx } from 'element-plus'

declare global {
    type ComponentInstance = {
        [Property in keyof GlobalComponents]: InstanceType<GlobalComponents[Property]>
    }
    interface RouteRecordItem extends RouteRecordRaw {

    }
    type RouteRecordCustom = RouteRecordRaw

    type CoTableColumnCtx<T> = Partial<TableColumnCtx<T>>

    type CoSearchDataColumnItem<T = string> = Partial<FormItemProps> & {
        prop: keyof T
    }

}

// 扩展 RouteMeta 接口
declare module 'vue-router' {
    interface RouteMeta {
        title?: string  // 页面标题、名称

        isHide?: boolean    // 是否隐藏
        isKeepAlive?: boolean   // 是否使用组件缓存
        isAffix?: boolean   // 是否固定菜单
        isLink?: boolean    // 是否使用外链
        linkUrl?: string    // 外链地址
        isIframe?: boolean  // 是否使用iframe嵌入
        roles?: string[]
        icon?: string   // 菜单图标

        isDynamic?: boolean // 是否使用的动态路由
        isDynamicPath?: string // 动态路径
        
        id?: number // 数据表对应id主键字段
    }
}

declare module 'h3' {
    interface H3EventContext {
        prisma: PrismaClient
        user?: UserOptionItem
    }
}

// declare module '@next-auth/core' {
//     interface Session {
//         user?: User
//         token?: string
//     }
//     interface User {
//         id: number
//         username: string
//     }
// }

export { }
