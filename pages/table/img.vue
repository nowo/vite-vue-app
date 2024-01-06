<template>
    <ul>
        <li v-for="item in data" :key="item">
            <img :src="item" alt="" lazy>
        </li>
    </ul>
</template>

<script setup lang="ts">
const data = ref<string[]>([])
Array.from({ length: 20 }).forEach((item,i) => {
    console.log('item :>> ', item);
    const url = `https://picsum.photos/300/300?a=${i}`
    data.value.push(url)
})
</script>
