<template>
    <div class="h-80vh flex flex-col">
        <CoFormTool :data="searchData" inline @search="onSearch" @reset="onReset">
            <el-button type="success" @click="onOpenDialog('add')">
                <!-- <el-icon>
                    <ele-FolderAdd />
                </el-icon> -->
                <i class="i-ep-folder-add" />
                新增菜单
            </el-button>
        </CoFormTool>
        <div class="flex-1 overflow-hidden">
            <Splitpanes>
                <Pane min-size="20" :size="25">
                    <ul class="w-100% flex flex-col gap-2 rounded bg-gray-500/5 p-4">
                        <li v-for="item in allRoutes" :key="item.path"
                            :class="filterPath.includes(item.path) ? 'no-drag' : ''" class="drag-item flex justify-between"
                            draggable="true" @dragstart="onDragstart">
                            <div class="flex-1 overflow-hidden">
                                <b>{{ item.meta.title }}</b>
                                <p>{{ item.path }}</p>
                            </div>
                            <span>已添加</span>
                        </li>
                    </ul>
                </Pane>
                <Pane ref="putRef" min-size="35" :size="75" class="relative">
                    <CoTable ref="listRef" v-model:data="tableData" class="table-box" :row-class-name="setRowClassName"
                        row-key="id" :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
                        @pagination="onHandleCurrentChange" @row-click="rowClick">
                        <template #id="{ row }">
                            <div class="flex items-center">
                                <i class="i-ic:baseline-format-list-bulleted drag-icon block" />{{ row.id }}
                            </div>
                        </template>
                        <!-- <template #title="{ scopes }">
                    <span class="inline-block w14px text-center">
                        <SvgIcon :name="scopes.row.icon || ''" />
                    </span>
                    <span class="ml10px">{{ scopes.row.title }}</span>
                </template>
                <template #menu_type="{ scopes }">
                    <el-tag v-if="scopes.row.menu_type === 1" type="success" size="small">
                        菜单
                    </el-tag>
                    <el-tag v-else type="warning" size="small">
                        按钮
                    </el-tag>
                </template> -->
                        <template #operate="{ row }">
                            <el-button size="small" link type="primary" @click.stop="onOpenDialog('add', row)">
                                新增
                            </el-button>
                            <el-button size="small" link type="primary" @click.stop="onOpenDialog('edit', row)">
                                修改
                            </el-button>
                            <!-- <el-button size="small" link type="primary" @click.stop="onDelete(row)">
                        删除
                    </el-button> -->
                        </template>
                    </CoTable>
                    <div class="drag-mask" :class="{ dragging: isOverDropZone }">
                        <!-- <i class="color-primary i-ep-upload-filled text-48px" /> -->
                        <span class="mb10px">拖放至这里新增或修改</span>
                    </div>
                </Pane>
            </Splitpanes>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { Pane, Splitpanes } from 'splitpanes'
import 'splitpanes/dist/splitpanes.css'
import { VueDraggable } from 'vue-draggable-plus'
import type { RouteRecordNormalized, RouteRecordRaw } from '#vue-router'

import { deepClone } from '@/utils/common'

definePageMeta({
    title: '菜单页面',
})
const router = useRouter()

const allRoutes = router.getRoutes()
console.log(allRoutes)

const authRoutes = ref<RouteRecordRaw[]>([])

const listRef = ref<ComponentInstance['CoTable']>()
const putRef = ref<HTMLDivElement>() // 拖拽存放区域

const { isOverDropZone } = useDropZone(putRef, {
    // dataTypes: ['image/jpeg'],
    onDrop: (files: File[] | null, e: DragEvent) => {
        console.log('a,e :>> ', files, e)
    },
})

// form表单数据类型
interface FormSearchData {
    name: string
}
const searchData = reactive<SearchDataType<FormSearchData>>({
    data: {
        name: '',
    },
    config: [
        { column: { label: '菜单名称', prop: 'name' }, placeholder: '请输入菜单名称', width: '200' },
    ],
    hideBtn: false,
    // showAll: true,

})

interface TableDataItem {
    'id': number // 管理员ID            2
    'account': string // 账户           admin
    'password': string // 密码              c050817f677dffa315ca7fcc93086f1c
    'phone': string // 手机号           15919477650
    'name': string // 姓名              张三
    'last_login_time': string // 最后登录时间       2022-06-11 02:03:52
    'group_name': string // 最后登录IP         127.0.0.1
    'role_id': number // 角色ID             1
    'status': 0 | 1 // 状态 0禁用 1开启
    'company_id': number // 所属公司ID          1
    'role_name': string // 角色名称             超级管理员
    'company_name': string // 所属公司名             北碚区丰庆仪器经营部
    children?: TableDataItem[] //

}
const tableData = reactive<CoTableType<TableDataItem>>({
    data: [],
    // config: {
    tableHeader: [
        { property: 'id', label: 'id', minWidth: 140 },
        { property: 'account', label: '登录账号', minWidth: 120 },

        { property: 'name', label: '员工名称', minWidth: 150 },
        { property: 'group_name', label: '员工分类', minWidth: 150 },
        { property: 'role_name', label: '关联角色', width: 130 },
        { property: 'company_name', label: '所属公司最后登录时间最后登录时间最后登录时间最后登录时间最后登录时间', minWidth: 130 },
        { property: 'phone', label: '手机号', width: 120 },
        { property: 'last_login_time', label: '最后登录时间', width: 155, other: { isHide: true } },
        { property: 'status', label: '员工状态', width: 85, align: 'center', other: { isShow: false } },
        { property: 'operate', label: '操作', width: 110, fixed: 'right', align: 'center', other: { isHide: true } },
    ],
    pagination: {
        page: 1, // 当前页面
        page_size: 20, // 每页显示的数量
        page_sizes: [20, 50, 100, 200, 500],
        total: 0,
    },
    // },
    isTool: true,
})

const filterPath = computed(() => filterRoutesPath())

const filterRoutesPath = () => {
    const list: string[] = []
    function forFn(routes: RouteRecordRaw[]) {
        routes.forEach((item) => {
            filterPath.value.push(item.path)
            if (item.children?.length) forFn(item.children)
        })
    }
    forFn(authRoutes.value)
    return list
}

// 拖拽开始
const onDragstart = () => {

}

function clone(element: RouteRecordRaw) {
    const len = Date.now()
    const { cloned } = useCloned(element, { manual: true })
    if (!cloned.value.meta) cloned.value.meta = {}
    cloned.value.meta.id = len
    return cloned.value
}

const onCloned = (e: any) => {
    console.log(e)
}

const allData = Array.from({ length: 40 }).map((item) => {
    const data: TableDataItem = {
        id: Math.floor(Math.random() * 1000000000000),
        account: 'admin',
        name: `张三_${Math.floor(Math.random() * 1000)}`,
        company_name: '工游记科技有限公司',
        phone: `17786${Math.floor(Math.random() * 1000000)}`,
        group_name: `组_${Math.floor(Math.random() * 100)}`,
        password: '',
        last_login_time: '',
        role_id: 0,
        status: 0,
        company_id: 0,
        role_name: '',
    }
    const dat = JSON.parse(JSON.stringify(data))
    dat.id = `${dat.id}+${Math.floor(Math.random() * 10000)}`
    data.children = [dat]
    return data
})

// 初始化表格数据
const initTableData = async () => {
    tableData.pagination.total = allData.length

    const end = tableData.pagination.page * tableData.pagination.page_size
    tableData.data = allData.slice(end - tableData.pagination.page_size, end)

    // tableData.data = res.data.list
    // tableData.pagination.total = res.data.total || 0
}

// 添加class
const setRowClassName = ({ row }: { row: TableDataItem }) => {
    return ''
    // return row.is_hide ? 'row-info-bg' : ''
}

// 当前行点击
const rowClick = (row: TableDataItem) => {
    listRef.value?.tableRef?.toggleRowExpansion(row)
}
// 打开新增、修改
const onOpenDialog = (type: any, row?: TableDataItem) => {

}

// 搜索
const onSearch = () => {
    initTableData()
}
// 重置
const onReset = () => {
    initTableData()
}

// 分页改变
const onHandleCurrentChange = () => {
    initTableData()
}

onBeforeMount(() => {
    initTableData()
})
</script>

<style lang="scss" scoped>
.drag-item {
    padding: 4px;
    border-radius: 4px;
    font-size: 12px;

    &:active {
        background-color: var(--el-color-primary-light-7);
        /* 改变背景色为红色 */
        opacity: 0.5;
        /* 降低不透明度 */
    }
}

.drag-mask {
    width: 100%;
    height: 100%;
    // background-color: var(--el-color-primary-light-7);
    position: absolute;
    top: 0;
    left: 0;
    // z-index: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    --color: rgb(from var(--el-color-primary-light-7) r g b / 50%);
    background-color: var(--color);
    font-size: 16px;
    letter-spacing: 1px;
    opacity: 0;
    z-index: -1;
    transition: all 0.3s;

    &.dragging {
        opacity: 1;
        z-index: 1;
    }
}
</style>
