<template>
    <el-image :z-index="10000" preview-teleported v-bind="$attrs">
        <template #error>
            <div class="el-image__error">
                <i class="i-ep-picture" />
            </div>
        </template>
    </el-image>
</template>

<script lang="ts" setup>
import type { ImageProps } from 'element-plus'

// const props = defineProps<Partial<ImageProps> & {
//     iconSize?: number
// }>()

// // 设置默认值
// const propsData = computed({
//     get: () => {
//         const { iconSize, ...dat } = props // eslint-disable-line unused-imports/no-unused-vars
//         if (dat.zIndex === undefined) dat.zIndex = 10000
//         if (dat.previewTeleported === undefined) dat.previewTeleported = true
//         return dat
//     },
//     set: (val) => {

//     },
// })

const props = defineProps({
    iconSize: {
        type: Number,
        default: 16,
    },
})

const iconSize = computed(() => {
    let size = props.iconSize || 16
    size = size < 12 ? 12 : size
    return `${size}px`
})
</script>

<style lang="scss" scoped>
.el-image__error {
    font-size: v-bind('iconSize');
}
</style>
