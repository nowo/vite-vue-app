<template>
    <div class="table-page">
        <div v-if="$slots.default || propsData.isTool" class="mb8px flex items-end justify-between">
            <div>
                <slot />
            </div>
            <div v-if="propsData.isTool">
                <el-popover :width="240" popper-class="popover-box" trigger="click">
                    <template #reference>
                        <el-button circle>
                            <i class="i-ep-operation block" />
                        </el-button>
                    </template>
                    <VueDraggable v-model="headerList" tag="ul" class="move-box" handle=".handle" :animation="260">
                        <li v-for="(item, index) in headerList" :key="index"
                            class="flex items-center justify-between px8px">
                            <i class="i-ep-rank handle mr5px inline-block cursor-pointer" />
                            <div class="flex-1 text-truncate">
                                <el-checkbox v-model="item.other.isShow" :label="item.label" @change="onCheckBox" />
                            </div>
                            <div class="flex items-center pl5px">
                                <div class="pin-icon mr5px" @click="onFixedItem('left', item)">
                                    <i v-if="item.fixed === 'left'" class="pin-active i-mdi:pin rotate-30" />
                                    <i v-else class="i-mdi:pin-outline rotate-30" />
                                </div>
                                <div class="pin-icon" @click="onFixedItem('right', item)">
                                    <i v-if="item.fixed === 'right'" class="pin-active i-mdi:pin -rotate-30" />
                                    <i v-else class="i-mdi:pin-outline -rotate-30" />
                                </div>
                            </div>
                        </li>
                    </VueDraggable>
                </el-popover>
            </div>
        </div>
        <div class="flex-1 overflow-hidden">
            <!--  :max-height="tableHeight" -->
            <el-table ref="tableRef" :data="propsData.data" scrollbar-always-on highlight-current-row class="h100%!"
                v-bind="newAttrs">
                <el-table-column v-for="(item, index) in headerList.filter(item => item.other.isShow)" :key="index"
                    show-overflow-tooltip v-bind="setColumnAttrs(item)">
                    <template v-if="item.other?.slotHeader" #header="scope">
                        <slot :name="setSlotHeaderName(item)" :scopes="scope" />
                    </template>
                    <!-- 这里根据slot字段来判断是否使用插槽 -->
                    <template v-if="item.type !== 'selection' && item.type !== 'index'" #default="scope">
                        <slot v-if="$slots[item.property as any]" :name="item.property" :scopes="scope" />
                        <span v-else>{{ scope.row[item.property] }}</span>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <el-pagination v-if="defData.pagination.total" v-model:current-page="defData.pagination.page"
            v-model:page-size="defData.pagination.page_size" :small="smallSize" :page-sizes="defData.pagination.page_sizes"
            :total="defData.pagination.total" :pager-count="5" background layout="total, sizes, prev, pager, next, jumper"
            class="mt15px" @size-change="onHandleSizeChange" @current-change="onHandleCurrentChange" />
    </div>
</template>

<script lang="ts" setup  generic="T">
import { computed, reactive, ref } from 'vue'
import { VueDraggable } from 'vue-draggable-plus'
import type { TableColumnCtx, TableInstance } from 'element-plus'
import { wait } from '@/utils/common'

type CoTablePropsType = CoTableType<T>
type TableHeaderType = CoTablePropsType['tableHeader'][0]

interface CoTableColumnScopes {
    row: T
    column: TableColumnCtx<T>
    $index: number
    cellIndex: number
}
const props = defineProps<{
    data: CoTableType<T>
}>()

const emits = defineEmits<{
    (e: 'update:data', param: CoTableType<T>): void
    (e: 'pagination', param: CoTableType<T>['pagination']): void
}>()

// const slots = defineSlots<{
//     // str(props: { scopes: T }): any
//     [K in keyof TableHeaderType['property']]:(props: { scopes: T })=>any
// } & Record<CoTableColumnProperty<T>, (props: { scopes: CoTableColumnScopes }) => any>>()

defineSlots<{ default: any } & {
    // [K in CoTableColumnProperty<T>]: (props: {
    //     scopes: CoTableColumnScopes
    // }) => any;
    [K in CoTableColumnProperty<T>]?: (props: { scopes: CoTableColumnScopes }) => void;
}>()

const { themeConfig } = useThemeState()

const tableRef = ref<TableInstance>()

const propsData = computed({
    get: () => {
        return props.data
    },
    set: (val) => {
        emits('update:data', val)
    },
})
// table表头配置
const headerList = computed({
    get: () => {
        // 过滤隐藏项
        const tableHeader = props.data.tableHeader.filter(item => !item?.other?.isHide).map((item) => {
            // 设置默认显示
            const other = item.other || {}
            other.isShow = item.other?.isShow === undefined ? true : item.other?.isShow
            return {
                ...item,
                other,
            }
        })
        return tableHeader
    },
    set: (val) => {
        propsData.value.tableHeader = val
    },
})

// 默认数据列表
const defData = reactive({
    visible: false,
    pagination: props.data.pagination,
    time: 0, // 用于分页和分页数量同时改变时，更新数据判断
})

// 获取全局组件大小
const smallSize = computed(() => {
    return themeConfig.value.globalComponentSize === 'small'
})

// 属性透传，去除id、class、style，不传入el-table组件
const attrs = useAttrs()
const newAttrs = computed(() => {
    const { class: a, id, style, ...att } = attrs // eslint-disable-line unused-imports/no-unused-vars
    // if (att.style) delete att.style;
    // if (att.class) delete att.class;
    // if (att.id) delete att.id;
    return att
})

const setColumnAttrs = (item: TableHeaderType): any => {
    const { other, ...attr } = item // eslint-disable-line unused-imports/no-unused-vars
    return attr
}

const setSlotHeaderName = (row: TableHeaderType) => {
    return `${String(row.property)}Header` as CoTableColumnProperty<T>
}

// 分页点击
const onHandleCurrentChange = (val: number) => {
    const { total, page_size } = defData.pagination
    if (total < page_size && propsData.value.data.length === total) return

    defData.time = Date.now()
    emits('pagination', defData.pagination)
    tableRef.value?.setScrollTop(0)
}
// 分页数量点击
const onHandleSizeChange = async (val: number) => {
    const { total, page_size } = defData.pagination
    if (total < page_size && propsData.value.data.length === total) return
    // 分页跟分页数量同时改变时，通过时间去判断让他只调用一个方法
    await wait(10) // 等待10ms，defData.time才可能是最新的
    if (Date.now() - defData.time < 20) return
    defData.time = Date.now()

    emits('pagination', defData.pagination)
    tableRef.value?.setScrollTop(0)
}

// 选中（显示、隐藏）
const onCheckBox = () => {
    propsData.value.tableHeader = headerList.value
}

const onFixedItem = (type: 'left' | 'right', row: CoTableHeader<T>) => {
    // if (type === 'left') {
    //     row.fixed = row.fixed === type ? false : type
    // } else if (type === 'right') {
    //     row.fixed = row.fixed === type ? false : type
    // }
    row.fixed = row.fixed === type ? false : type
    propsData.value.tableHeader = headerList.value
}

// 因设置keepalive缓存时，table组件滚动条位置不对处理
onActivated(() => {
    useTableScrollbarLoad(tableRef.value)
})

defineExpose({
    tableRef,
})
</script>

<style lang="scss" scoped>
.table-page {
    display: flex;
    flex-direction: column;
    // min-height: 100%;
    height: 100%;
    overflow: auto;
    border: 0;
}

.move-box {

    // background-color: var(--el-color-primary-light-9);
    :deep(.sortable-chosen) {
        background-color: var(--el-color-info-light-9);
    }

    :deep(.el-checkbox) {
        --el-checkbox-height: 28px;
    }

    .pin-icon {
        cursor: pointer;
        overflow: hidden;

        >i {
            display: block;
            font-size: 16px;
            color: var(--el-color-info);

            &.pin-active {
                color: var(--el-color-primary)
            }
        }
    }

}
</style>
