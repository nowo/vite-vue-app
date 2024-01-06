<template>
    <div class="1overflow-hidden 1h-80vh">
        <CoTable v-model:data="tableData" @pagination="onHandleCurrentChange">
            <el-button type="success">
                新增
            </el-button>
            <template #company_idHeader>
                111
            </template>
            <template #status="{ scopes }">
                <el-tag v-if="scopes.row.status === 1" type="success">
                    启用
                </el-tag>
                <el-tag v-else type="info">
                    禁用
                </el-tag>
            </template>
            <template #operate="{ scopes }">
                <el-button size="small" link type="primary" @click="onOpenDialog('edit', scopes.row)">
                    修改
                </el-button>
                <el-button size="small" link type="primary" @click="onDel(scopes)">
                    删除
                </el-button>
            </template>
        </CoTable>
    </div>
</template>

<script lang="ts" setup>
// import { CoTable } from '#build/components'

definePageMeta({
    title: '测试页面',
})

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

}
const tableData = reactive<CoTableType<TableDataItem>>({
    data: [],
    // config: {
    tableHeader: [
        { property: 'id', label: 'id', width: 140 },
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
})

const initDefaultData = async () => {
    // 获取员工分类

}

const allData = Array.from({ length: 50 }).map((item) => {
    const data: TableDataItem = {
        id: new Date().getTime(),
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
// 打开新增、修改
const onOpenDialog = (type: any, row?: TableDataItem) => {

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
