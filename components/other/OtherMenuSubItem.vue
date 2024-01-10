<template>
    <VueDraggable v-model="list" class="drag-area" tag="ul" group="menu" handle=".drag-icon" :on-add="onEnd">
        <li v-for="item in modelValue" :key="item.path">
            <div class="flex items-center">
                <span class="drag-icon">
                    <i class="i-ic:baseline-format-list-bulleted block" />
                </span>

                <span v-if="item.children?.length" @click="onToggleExpand(item)">
                    <i v-if="defData.isExpand === item.path" class="i-ep-arrow-down block" />
                    <i v-else class="i-ep-arrow-right block" />
                </span>
                <p>{{ item.name }}</p>
            </div>
            <OtherMenuSubItem v-model="item.children" />
        </li>
    </VueDraggable>
</template>

<script setup lang="ts">
import { VueDraggable } from 'vue-draggable-plus'
import { computed } from 'vue'
import type { RouteRecordRaw } from '#vue-router'

const props = defineProps<{
    modelValue?: RouteRecordRaw[]
}>()

const emits = defineEmits<{
    (e: 'update:modelValue', value: RouteRecordRaw[]): void
}>()

const list = computed({
    get: () => props.modelValue || [],
    set: value => emits('update:modelValue', value),
})

const defData = reactive({
    isExpand: '',
})

const onToggleExpand = (item: RouteRecordRaw) => {
    defData.isExpand = defData.isExpand ? '' : item.path
}

const onEnd = (e:any) => {
    console.log('e :>> ', e);
    emits('update:modelValue', list.value)
}

</script>

<style lang="scss" scoped>
.drag-area {
    min-height: 5px;
    outline: 1px dashed;

    li {
        >ul {
            padding-left: 20px;
        }
    }
}
</style>
