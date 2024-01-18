<template>
    <div>
        <VueDraggable v-model="tableData.data" class="h-80vh overflow-hidden" :animation="200"
            target=".el-table__body>tbody" handle=".drag-icon" group="g1" @end="onEnd">
            <CoTable ref="listRef" v-model:option="tableData" class="table-box" :row-class-name="setRowClassName" row-key="id"
                :tree-props="{ children: 'children', hasChildren: 'hasChildren' }" @pagination="onHandleCurrentChange"
                @row-click="rowClick">
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
        </VueDraggable>
    </div>
</template>

<script lang="ts" setup>
import { VueDraggable } from 'vue-draggable-plus'

definePageMeta({
    title: '测试页面',
})

const listRef = ref<ComponentInstance['CoTable']>()

const defData = reactive({
    loading: false,
    goodsRoleList: [
        { label: '是', value: 1 },
        { label: '否', value: 0 },
    ],
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
const tableData = reactive<CoTableProps<TableDataItem>>({
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

const initDefaultData = async () => {
    // 获取员工分类

}

const allData = Array.from({ length: 30 }).map((item) => {
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

const onEnd = (e: any) => {
    console.log('e :>> ', e)
    // e.p
}

// 删除员工
// const onDel = (row: TableDataItem) => {
const onDel = (row: any) => {
    console.log('row :>> ', row)
}

// 分页改变
const onHandleCurrentChange = () => {
    initTableData()
}

// 页面加载时
onMounted(async () => {
    await initDefaultData()
    initTableData()
})
</script>

<style lang="scss" scoped>
</style>
