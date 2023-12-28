<template>
    <CoFormTool :data="searchData" inline @search="onSearch" @reset="onSearch">
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
    </CoFormTool>
    <CoFormToolDemo :data="searchData" inline @search="onSearch" @reset="onSearch">
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
</template>

<script lang="ts" setup>
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
const searchData = reactive<SearchDataType<FormSearchData>>({
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
        { column: { label: '订货编号', prop: 'product_sn' }, placeholder: '请输入订货编号', width: '120' },
        { column: { label: '商品名称', prop: 'name' }, placeholder: '请输入商品名称或型号', width: '200' },
        { column: { label: '商品分类', prop: 'category_id' }, placeholder: '请选择商品分类', width: '180', slot: true },
        { column: { label: '商品品牌', prop: 'brand_id' }, placeholder: '请选择商品品牌', width: '180', slot: true },
        { column: { label: '商品类型', prop: 'type_id' }, placeholder: '请选择商品类型', width: '130', slot: true },
        { column: { label: '商品属性', prop: 'goods_attr' }, placeholder: '请输入商品属性值', width: '160' },
        { column: { label: '供应商', prop: 'supplier_id' }, placeholder: '', width: '200', slot: true },

        { column: { label: '是否使用', prop: 'is_use' }, slot: true, width: '85' },
        { column: { label: '是否停用', prop: 'is_stop' }, slot: true, width: '85' },
    ],
    hideBtn: false,
    // showAll: true,

})

// 搜索
const onSearch = () => {
    console.log('searchData.data :>> ', searchData.data)
}

// 重置
const onReset = () => {

}
</script>

<style lang="scss" scoped>
</style>
