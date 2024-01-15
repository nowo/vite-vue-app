<template>
    <ul class="grid grid-cols-6 gap-10px">
        <li>
            <CoImage src="https://element-plus.org/images/element-plus-logo.svg" />
        </li>
        <li v-for="(item, index) in data" :key="item">
            <!-- <img :src="item" :preview-src-list="[item]" alt="" lazy> -->

            <CoImage :src="item" :initial-index="index" :preview-src-list="data" alt="" lazy @show="onShow"
                @load="onLoad" />
        </li>
    </ul>
</template>

<script setup lang="ts">
const data = ref<string[]>([])
Array.from({ length: 20 }).forEach((item, i) => {
    console.log('item :>> ', item)
    const url = `https://picsum.photos/300/300?a=${i}`
    data.value.push(url)
})
watchEffect(() => {
    console.log(data.value)
})
const onShow = () => {
    console.log('1111')
}

const onLoad = () => {
    console.log('加载完成')
}
</script>
