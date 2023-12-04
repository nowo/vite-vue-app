<template>
    <BaseBox>
        <CoFormTool :model="searchData" :inline="true" @submit.prevent="onSearch">
            <template #type="{ row }">
                <el-cascader v-model="row.type" :options="defData.classList"
                    :props="{ emitPath: false, value: 'id', label: 'group_name' }" placeholder="供应商分类" clearable
                    class="w100%" />
            </template>

            <el-button type="success" @click="onOpenDialog('add')">
                <el-icon>
                    <ele-FolderAdd />
                </el-icon>
                新增供应商
            </el-button>
        </CoFormTool>
        <div class="flex-1">
            <CoTable v-model:page="tableData.pagination" v-model:table-header="tableData.tableHeader" class="table-box"
                :data="tableData.data" scrollbar-always-on border @update:page="onHandleCurrentChange">
                <template #operate="{ scopes }">
                    <el-button size="small" link type="primary" @click="onOpenDialog('edit', scopes.row)">
                        修改
                    </el-button>
                    <el-button size="small" link type="primary" @click="onDel(scopes.row)">
                        删除
                    </el-button>
                </template>
            </CoTable>
        </div>
    </BaseBox>
</template>

<script lang="ts" setup>
import { onMounted, provide, reactive, ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'

const emits = defineEmits(['change'])

const PAGINATION = {
    page: 1,
}

// const useGroup = useGroupState()

const dialogRef = ref<InstanceType<any>>()

const defData = reactive({
    loading: false,
    tableData: [] as VendorApi_ListResponse['lists'],
    classList: [] as GroupApi_ListItem[],
})

// const searchData = reactive({
//     keyword: '',
//     type: '' as '' | number
// })

// form表单数据类型
interface FormSearchData {
    name: ''
    type: '' | number
}

const searchData = reactive<BaseFormToolType<FormSearchData>>({
    data: {
        name: '',
        type: '',
    },
    config: [
        { column: { label: '供应商名称', prop: 'name' }, placeholder: '请输入供应商名称', width: '180' },
        { column: { label: '供应商分类', prop: 'type' }, placeholder: '请输入收件人名称', width: '160', slot: true },

    ],
    hideBtn: false,
    // showAll: true,
    searchFunc: () => initTableData(),
})

type TableDataItem = any
const tableData = reactive<CoTableDataType<TableDataItem>>({
    data: [],
    tableHeader: [
        { property: 'supplier_id', label: 'id', width: 80 },
        { property: 'supplier_name', label: '供应商名称', minWidth: 200 },
        { property: 'group_name', label: '供应商分类', width: 170 },
        { property: 'contact', label: '联系人', width: 130 },
        { property: 'phone', label: '联系电话', width: 150 },
        { property: 'addr', label: '联系地址', minWidth: 150 },
        { property: 'operate', label: '操作', width: 100, slot: true, align: 'center', showOverflowTooltip: false },
        // { property: 'market_price', label: '市场价', width: 85, align: 'center' },
    ],
    pagination: {
        ...PAGINATION,
        // page: /^[1-9][0-9]*$/.test(page.value) ? Number(page.value) : 1,
    },
})

const initDefaultData = async () => {
    // 获取供应商分类
    // const GROUP_TYPE = 'supplier'
    // defData.classList = useGroup[GROUP_TYPE]?.state ? useGroup[GROUP_TYPE].groupData : await useGroup.setGroupData(GROUP_TYPE)
}

// 初始化表格数据
const initTableData = async () => {
    const data: VendorApi_List = {
        keyword: searchData.data.name?.trim() ?? '',
        page: tableData.pagination.page,
        page_size: tableData.pagination.page_size,
        is_paging: 1,
        group_id: searchData.type ?? '',
    }
    if (!data.keyword) delete data.keyword
    if (!data.group_id) delete data.group_id

    const res = await ApiSupplier.getList(data)
    if (res.code !== 200) return ElMessage.error(res.msg)

    tableData.data = res.data.lists
    tableData.pagination.total = res.data.total || 0
}

// 打开修改客户弹窗
const onOpenDialog = (type: DialogOperate, row?: TableDataItem) => {
    dialogRef.value?.openDialog(type, row)
}
// 删除客户
const onDel = (row: TableDataItem) => {
    ElMessageBox.confirm(`此操作将永久删除该条内容，是否继续?`, '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning',
        buttonSize: 'default',
    }).then(async () => {
        const res = await ApiSupplier.del({ supplier_id: row.supplier_id })
        if (res.code !== 200) return ElMessage.error(res.msg)

        ElMessage.success('删除成功')
        initTableData() // 重新加载列表
    }).catch(() => { })
}

// 查询
const onSearch = () => {
    initTableData()
}

// 分页改变
const onHandleCurrentChange = () => {
    initTableData()
}

// 函数注入
provide('reloadTable', initTableData)

// 页面加载时
onMounted(async () => {
    initDefaultData()
    initTableData()
})
</script>
