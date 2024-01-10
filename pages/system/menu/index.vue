<template>
    <Splitpanes class="cut-pane" horizontal0>
        <Pane min-size="20" :size="25">
            <VueDraggable v-model="allRoutes" :animation="150" ghost-class="ghost"
                :group="{ name: 'menu', pull: 'clone', put: false }" :clone="clone" :sort="false"
                class="w-300px flex flex-col gap-2 rounded bg-gray-500/5 p-4" filter=".no-drag" :on-add="onCloned">
                <div v-for="item in allRoutes" :key="item.path" :class="filterPath.includes(item.path) ? 'no-drag' : ''"
                    class="h-50px cursor-move rounded bg-gray-500/5 p-3">
                    {{ item.name }}:{{ item.path }}
                </div>
            </VueDraggable>
        </Pane>
        <Pane min-size="35" :size="75">
            <OtherMenuSubItem v-model="authRoutes" @update:model-value="initTableData" />
        </Pane>
    </Splitpanes>
</template>

<script lang="ts" setup>
import { Pane, Splitpanes } from 'splitpanes'
import 'splitpanes/dist/splitpanes.css'
import { VueDraggable } from 'vue-draggable-plus'
import type { RouteRecordNormalized, RouteRecordRaw } from '#vue-router'

const router = useRouter()

const allRoutes = router.getRoutes()
console.log(allRoutes)

const authRoutes = ref<RouteRecordRaw[]>([])

// const liRef = ref<HTMLElement[]>()

// `style` will be a helper computed for `left: ?px; top: ?px;`
// const { x, y, style } = useDraggable(liRef, {
//     initialValue: { x: 40, y: 40 },
// })

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

// 获取初始数据信息
const initTableData = () => {
    // filterRoutesPath()
    setTimeout(() => {
        console.log(' filterPath.value :>> ', filterPath.value)
    }, 2000)
}

watch(() => authRoutes.value, (val) => {
    console.log('val :>> ', val)
})
</script>

<style lang="scss" scoped>
.dragging:active {
    background-color: #f00;
    /* 改变背景色为红色 */
    opacity: 0.5;
    /* 降低不透明度 */
}

.no-drag {
    opacity: 0.8;
}
</style>
