<template>
    <div>
        图片上传
        <VueDraggable ref="dragRef" v-model="uploadList" tag="ul" class="upload-list" handle=".upload-list-chose-icon-drag">
            <li v-for="item in uploadList" :key="item" class="upload-list-item">
                <el-image :src="item" class="upload-list-item-image" />
                <div class="upload-list-item-view">
                    <i v-if="uploadList.length > 1" class="i-ep-more-filled upload-list-chose-icon upload-list-chose-icon-drag" />

                    <!-- <i v-if="uploadList.length > 1" class="i-ep-rank upload-list-chose-icon upload-list-chose-icon-drag" /> -->
                    <!-- <i v-if="uploadList.length > 1" class="i-ep-position upload-list-chose-icon upload-list-chose-icon-drag" /> -->
                    <!-- <i v-if="uploadList.length > 1" class="i-ep-connection upload-list-chose-icon upload-list-chose-icon-drag" /> -->

                    <i class="i-ep-zoom-in upload-list-chose-icon" />
                    <i class="i-ep-delete upload-list-chose-icon" />
                </div>
            </li>
            <li v-if="props.limit > uploadList?.length" class="upload-list-item upload-list-chose" @click="openChoseDialog">
                <i class="i-ep-plus upload-list-chose-icon" />
            </li>
        </VueDraggable>
        <!-- <el-image-viewer v-if="showImg.viewer" :url-list="uploadList" :z-index="10000" :initial-index="showImg.index"
            teleported @close="closeView" /> -->
    </div>
</template>

<script lang="ts" setup>
import { type UseDraggableReturn, VueDraggable } from 'vue-draggable-plus'

const props = defineProps({
    modelValue: {
        type: String as PropType<string | string[]>,
    },
    limit: {
        type: Number,
        default: 1,
        validator: (val: number) => {
            return val > 0
        },
    },
    char: { // 字符串分隔符
        type: String,
        default: ',',
    },
})

const emits = defineEmits<{
    (e: 'update:modelValue', value: string | string[]): void
}>()

const dragRef = ref<UseDraggableReturn>()

const uploadList = computed({
    get() {
        // props.limit>1
        if (Array.isArray(props.modelValue)) {
            return props.modelValue
        } else {
            return props.modelValue ? [props.modelValue] : []
        }
    },
    set(value) {
        const val = Array.isArray(props.modelValue) ? value : props.modelValue || ''
        emits('update:modelValue', val)
    },
})

const styles = computed(() => {
    const margin = props.limit > 1 ? '8px' : '0'
    return { margin }
})

// 打开选择相册弹窗
const openChoseDialog = () => {

}
</script>

<style lang="scss" scoped>
.upload-list {
    --co-upload-image-width: 80px;
    --co-upload-item-margin: v-bind('styles.margin');
    --co-upload-icon-size: 24px;
    display: flex;
    flex-wrap: wrap;

    .upload-list-item {
        position: relative;
        width: var(--co-upload-image-width);
        height: var(--co-upload-image-width);
        background-color: var(--el-fill-color-blank);
        border: 1px solid var(--el-border-color);
        border-radius: 6px;
        overflow: hidden;
        margin: 0 var(--co-upload-item-margin) var(--co-upload-item-margin) 0;

        .upload-list-item-image {
            width: 100%;
            height: 100%;
            display: block;
        }

        .upload-list-item-view {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            display: inline-flex;
            justify-content: space-evenly;
            align-items: center;
            color: #fff;
            opacity: 1;
            font-size: var(--co-upload-icon-size);
            background-color: var(--el-overlay-color-lighter);
            transition: opacity var(--el-transition-duration);
        }

        &:hover {
            .upload-list-item-view {
                opacity: 1;
            }
        }

        .upload-list-chose-icon-drag {
            position: absolute;
            top: 0;
            left: 0;
            cursor: move;
            z-index: 10;
        }

    }

    .upload-list-chose {
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        border-style: dashed;
        color: var(--el-text-color-secondary);

        &:hover {
            border-color: var(--el-color-primary);
        }

    }

    .upload-list-chose-icon {
        cursor: pointer;
        font-size: var(--co-upload-icon-size);
    }

}
</style>
