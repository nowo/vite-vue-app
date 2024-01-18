<template>
    <div>
        <CoFormTool :data="searchData" inline @search="onSearch" @reset="onSearch">
            <template #category_id="{ row }">
                <el-select v-model="row.category_id" filterable placeholder="请选择" clearable>
                    <el-option v-for="item in defData.brandList" :key="item.id" :label="item.name" :value="item.id" />
                </el-select>
            </template>
            <!-- <template #brand_id="{ row }">
            <el-select v-model="row.brand_id" filterable placeholder="请选择" clearable>
                <el-option v-for="item in defData.brandList" :key="item.id" :label="item.name" :value="item.id" />
            </el-select>
        </template>
        <template #type_id="{ row }">
            <el-select v-model="row.type_id" filterable placeholder="请选择" clearable>
                <el-option v-for="item in defData.typeList" :key="item.id" :label="item.name" :value="item.id" />
            </el-select>
        </template> -->
            <template #goods_attr="{ row }">
                供应商选择{{ row }}
            </template>
        </CoFormTool>
        <!-- <ClientOnly>
            <CoFormToolDemo :data="searchDataDemo" inline @search="onSearch" @reset="onSearch">
                <template #category_id="{ row }">
                    <el-select v-model="row.brand_id" filterable placeholder="请选择" clearable>
                        <el-option v-for="item in defData.brandList" :key="item.id" :label="item.name" :value="item.id" />
                    </el-select>
                </template>
                <template #brand_id="{ row }">
                    <el-select v-model="row.brand_id" filterable placeholder="请选择" clearable>
                        <el-option v-for="item in defData.brandList" :key="item.id" :label="item.name" :value="item.id" />
                    </el-select>
                </template>
                <template #type_id="{ row }">
                    <el-select v-model="row.type_id" filterable placeholder="请选择" clearable>
                        <el-option v-for="item in defData.typeList" :key="item.id" :label="item.name" :value="item.id" />
                    </el-select>
                </template>
                <template #supplier_id="{ row }">
                    供应商选择{{ row }}
                </template>
            </CoFormToolDemo>
        </ClientOnly> -->
    </div>
</template>

<script lang="ts" setup>
import type { TimePickerDefaultProps } from 'element-plus'

const defData = reactive({
    visible: false,
    typeList: [
        {
            id: 1,
            name: '名称',
        },
    ],
    brandList: [
        {
            id: 1,
            name: '百度',
        },
        {
            id: 2,
            name: '网易',
        },
    ],
})
const options = ref([
    {
        id: 1,
        name: '货物来往',
        children: [
            {
                id: 2,
                name: '工业科技',
            },
            {
                id: 3,
                name: '精密量仪',
            },
        ],
    },
    {
        id: 4,
        name: '资金来往',
        children: [
            {
                id: 5,
                name: '电子科技',
            },
            {
                id: 6,
                name: '光学仪器',
            },
        ],
    },
])

// form表单数据类型
interface FormSearchData {
    name: ''
    category_id: '' // 商品分类
    brand_id: '' // 商品品牌
    type_id: '' // 商品类型
    is_use: '' | number // 是否使用
    product_sn: '' // 订货编号
    goods_attr: '' // 商品属性值
    is_stop: '' | number // 是否禁用
    supplier_id: '' | number // 供应商id
}
// const searchDataDemo = reactive<CoFormToolProps<FormSearchData>>({
//     data: {
//         name: '',
//         category_id: '', // 商品分类
//         // brand_id: '', // 商品品牌
//         // type_id: '', // 商品类型
//         // is_use: '',
//         // product_sn: '', // 订货编号
//         goods_attr: '', // 商品属性值
//         // is_stop: '', // 是否禁用
//         // supplier_id: '', // 供应商id
//     },
//     config: [
//         // 
//         // { column: { label: '订货编号', prop: 'product_sn' }, type: 'text', props: { placeholder: '请输入订货编号' }, width: '120', isHide: true },
//         { column: { label: '商品名称', prop: 'name' }, type: 'text', props: { placeholder: '请输入商品名称或型号' }, width: '200', isHide: true },
//         { column: { label: '商品分类', prop: 'category_id' }, type: 'text', props: { placeholder: '请选择商品分类' }, width: '180' },
//         // { column: { label: '商品品牌', prop: 'brand_id' }, type: 'text', props: { placeholder: '请选择商品品牌' }, width: '180' },
//         // { column: { label: '商品类型', prop: 'type_id' }, type: 'text', props: { placeholder: '请选择商品类型' }, width: '130' },
//         { column: { label: '商品属性', prop: 'goods_attr' }, type: 'text', props: { placeholder: '请输入商品属性值' }, width: '160' },
//         // { column: { label: '时间选择', prop: 'supplier_id' }, type: 'timePicker', props: { placeholder: '' }, width: '200' },

//         // { column: { label: '级联选择器', prop: 'is_use' }, type: 'cascader', props: { options: options.value, props: { label: 'name', value: 'id', checkStrictly: true, emitPath: false } } },
//         // { column: { label: '日期选择', prop: 'is_stop' }, type: 'year', props: {} },
//     ],
//     hideBtn: false,
//     // showAll: true,

// })

const searchData = reactive<CoFormToolProps<FormSearchData>>({
    data: {
        name: '',
        category_id: '', // 商品分类
        brand_id: '', // 商品品牌
        type_id: '', // 商品类型
        is_use: '',
        product_sn: '', // 订货编号
        goods_attr: '', // 商品属性值
        is_stop: '', // 是否禁用
        supplier_id: '', // 供应商id
    },
    config: [
        { column: { label: '订货编号', prop: 'product_sn' }, placeholder: '请输入订货编号', width: '120', isHide: true },
        { column: { label: '商品名称', prop: 'name' }, placeholder: '请输入商品名称或型号', width: '200' },
        { column: { label: '商品分类', prop: 'category_id' }, placeholder: '请选择商品分类', width: '180' },
        { column: { label: '商品品牌', prop: 'brand_id' }, placeholder: '请选择商品品牌', width: '180' },
        { column: { label: '商品类型', prop: 'type_id' }, placeholder: '请选择商品类型', width: '130' },
        { column: { label: '商品属性', prop: 'goods_attr' }, placeholder: '请输入商品属性值', width: '160' },
        { column: { label: '供应商', prop: 'supplier_id' }, placeholder: '', width: '200' },

        { column: { label: '是否使用', prop: 'is_use' }, width: '85' },
        { column: { label: '是否停用', prop: 'is_stop' }, width: '85', isHide: true },
    ],
    hideBtn: false,
    // showAll: true,

})

// const tool: CoFormToolConfig<FormSearchData> = {
//     column: { prop: 'brand_id', label: 'Brand' },
//     type: 'cascader',
//     props: { size: 'small', unlinkPanels: true },
//     // props:{
//     //     placeholder: 'Select year',
//     // }
// }

// 搜索
const onSearch = () => {
    // console.log('searchData.data :>> ', tool)
}

// 重置
const onReset = () => {

}
</script>

<style lang="scss" scoped>
</style>
