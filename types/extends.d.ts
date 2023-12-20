/**
 * 该文件主要用作对某些库数据类型的扩展
 */

import type { PrismaClient } from '@prisma/client'
import 'vue-router'

import type { GlobalComponents } from '@vue/runtime-core'
import type { RouteRecordRaw } from 'vue-router'
import type { TableColumnCtx, TableInstance } from 'element-plus'

declare global {
    type ComponentInstance = {
        [Property in keyof GlobalComponents]: InstanceType<GlobalComponents[Property]>
    }
    interface RouteRecordItem extends RouteRecordRaw {

    }
    type RouteRecordCustom = RouteRecordRaw

    type CoTableColumnCtx<T> = Partial<TableColumnCtx<T>>

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
