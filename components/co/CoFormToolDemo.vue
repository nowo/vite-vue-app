<template>
    <el-form v-if="searchData.config.length" ref="formRef" v-bind="$attrs" :model="searchData.data">
        <!-- :ref="setItemRef" -->
        <!-- :ref="(el: FormItemInstance | any) => { if (el) formItemRef[index] = el }" -->
        <el-form-item v-for="(item, index) in searchData.config.filter(opt => !opt.isHide)" :key="index" ref="formItemRef"
            :class="setFormItemClass(index)" v-bind="item.column" :prop="item.column.prop">
            <div class="item-content" :style="{ width: setElWidth(item.width) }">
                <slot v-if="item.slot" :name="item.column.prop" :row="searchData.data" />
                <el-input v-else v-model.trim="searchData.data[item.column.prop]" :placeholder="item.placeholder" clearable
                    @keyup.enter="onSearch" />
            </div>
        </el-form-item>
        <el-form-item ref="lastItemRef" label="">
            <el-button type="primary" @click="onSearch">
                <el-icon>
                    <i class="i-ep-search" />
                </el-icon>
                查询
            </el-button>
            <el-button @click="onReset">
                <el-icon>
                    <i class="i-ep-refresh" />
                </el-icon>
                重置
            </el-button>
            <slot />
            <el-button v-if="!searchData.hideBtn" type="primary" link @click="onToggle">
                <template v-if="searchData.showAll">
                    收起<el-icon><i class="i-ep-arrow-up" /></el-icon>
                </template>
                <template v-else>
                    展开<el-icon><i class="i-ep-arrow-down" /></el-icon>
                </template>
            </el-button>
        </el-form-item>
    </el-form>
</template>

<script lang="ts" setup generic="T=Record<string, any>">
import type { FormInstance, FormItemInstance, FormItemProps } from 'element-plus'

// const props = defineProps({
//     data: {
//         type: Object as PropType<SearchDataTypeDemo<T>>,
//         required: true,
//     },
// })

const props = defineProps<{
    data: SearchDataTypeDemo<T>
}>()

const emits = defineEmits<{
    (event: 'update:data'): void
    (event: 'search'): void
    (event: 'reset'): void
}>()

defineSlots<{ default(): any } & Record<keyof T, (props: { row: T }) => any>>()

const formRef = ref<FormInstance>()
const formItemRef = ref<FormItemInstance[]>([])
const lastItemRef = ref<FormItemInstance>()

const defData = reactive({
    hideForm: true, // 默认先隐藏form
    // showAll: false,
    hideIndex: -1,
})

// const searchData = ref(props.data)
// const searchData = reactive({
//     ...props.data
// })

const searchData = computed({
    get: () => props.data,
    set: (val) => {
        emits('update:data')
        // props.data = val
    },
})

type SearchDataColumnItem<T = string> = Partial<FormItemProps> & {
    prop: keyof T
}

interface SearchDataTypeDemo<T = Record<string, any>> {
    data: T
    // config: {
    //     [key in keyof T]: { label: string, slot?: boolean, placeholder: string, width: string }
    // },
    config: { column: SearchDataColumnItem<T>, slot?: boolean, placeholder?: string, width?: string, isHide?: boolean }[]
    // searchFunc?: () => void,     // 查询方法
    hideBtn?: boolean
    showAll?: boolean
}

const searchDataTest = ref<SearchDataTypeDemo<{
    name: ''
    category_id: '' // 商品分类
    brand_id: '' // 商品品牌
    type_id: '' // 商品类型
    is_use: ''
    product_sn: '' // 订货编号
    goods_attr: '' // 商品属性值
    is_stop: '' // 是否禁用
    supplier_id: '' // 供应商id
}>>({
    // data: props.data.data,
    // config: props.data.config
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

const { width: formWidth } = useElementSize(formRef as any)

const setFormPropName = (name: string) => {
    return name
}

// 查询
const onSearch = () => {
    emits('search')
}
// 重置
const onReset = async () => {
    formRef.value?.resetFields()
    emits('reset')
}

// 判断是否显示项
const setHideItem = async (show: boolean, wid: number) => {
    // 不显示展开收起按钮时
    if (props.data.hideBtn) return
    // 展开收起按钮为展开时
    if (show) return defData.hideIndex = -1
    // 还未获取到宽度时
    if (!wid) return

    const formWid = wid
    const lastWidth = lastItemRef.value?.$el.getBoundingClientRect()

    const indexArr: number[] = []
    props.data.config.reduce((prev, next, index) => {
        // const elBound = formItemRef.value[index].$el.getBoundingClientRect()
        // const count = prev + elBound.width
        let elWidth = 0
        if (formItemRef.value[index]) {
            elWidth = formItemRef.value[index].$el.getBoundingClientRect().width
        }
        const count = prev + elWidth
        if (formWid - count < lastWidth.width) indexArr.push(index)
        return count
    }, 0)

    if (indexArr.length) defData.hideIndex = indexArr[0] > 0 ? indexArr[0] - 1 : 0
}

// 展开收起
const onToggle = () => {
    searchData.value.showAll = !searchData.value.showAll
    setHideItem(searchData.value.showAll, formWidth.value)
}

// 设置form-item隐藏class名
const setFormItemClass = (index: number) => {
    return !(defData.hideIndex >= 0 && index > defData.hideIndex) ? '' : 'hide-item'
}

// 设置宽度
const setElWidth = (wid?: string) => {
    if (!wid) return ''
    return Number.isNaN(Number(wid)) ? wid : `${wid}px`
}

// 监听展开、关闭状态以及form元素宽度变化
watchEffect(() => {
    setHideItem(!!searchData.value.showAll, formWidth.value)
}, {
    flush: 'post',
})

defineExpose({
    formRef,
})

// 采用watch监听时
// watch(() => formWidth.value, () => {
//     setHideItem(defData.showAll, formWidth.value)
// })
</script>

<style lang="scss" scoped>
.hide-item {
    position: absolute;
    left: 0;
    visibility: hidden;
    z-index: -1000;
}

.el-form {
    overflow: hidden;
    --el-font-size-base: 13px;

    .el-form-item {
        margin-right: 0;
        margin-bottom: 15px;
        padding-right: 15px;

        .item-content {
            :deep(>*) {
                width: 100%;
            }

        }
    }
}

.trans {
    display: contents;
}
</style>
