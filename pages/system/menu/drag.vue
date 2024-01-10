<!-- src/components/DraggableCopy.vue -->
<template>
    <div class="draggable-copy">
        <div id="app">
            <h2>源元素</h2>
            :class="draggingId === item.id ? 'bg-#eee' : ''"
            <div v-for="item in items" :key="item.id" class="dragging" draggable="true"
                @dragstart="handleDragStart($event, item)" @dragend="handleDragEnd()" @drag="handleDrag">
                {{ item.name }}
            </div>

            <h2 class="mt20px">
                目标区域
            </h2>
            <div class="droppable h-100px bg-#fafafa" @drop="handleDrop($event)" @dragover.prevent>
                <div v-for="item in copyItems" :key="item.id">
                    {{ item.name }}
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
interface DraggableItem { id: number, name: string }

const items = ref<DraggableItem[]>(
    [
        { id: 1, name: '项目A' },
        { id: 2, name: '项目B' },
        { id: 3, name: '项目C' },
    ],
)
const copyItems = ref<DraggableItem[]>([])
const copiedItem = ref<DraggableItem>() // 存储被复制的项目对象

const draggingId = ref(0) // 拖拽中的id

const handleDrag = (e: DragEvent) => {
    console.log(e)
}

const handleDragStart = (e: DragEvent, item: DraggableItem) => {
    console.log(e)
    copiedItem.value = Object.assign({}, item) // 将要复制的项目对象保存到data属性中
    draggingId.value = item.id
}
const handleDragEnd = (item?: DraggableItem) => {
    draggingId.value = 0
}
const handleDrop = (e: DragEvent) => {
    console.log('e :>> ', e)
    console.log('copiedItem :>> ', copiedItem)
    e.preventDefault()
    console.log('copiedItem.value :>> ', copiedItem.value)
    if (copiedItem.value) {
        const newId = Math.max(...items.value.map(item => item.id)) + 1 // 生成新ID

        copyItems.value.push({ ...copiedItem.value, id: newId }) // 添加复制后的项目到数据列表中
        copiedItem.value = undefined // 清空已复制的项目对象
    }
}
</script>

<style scoped>
.dragging:active {
    background-color: #f00;
    /* 改变背景色为红色 */
    opacity: 0.5;
    /* 降低不透明度 */
}
</style>
