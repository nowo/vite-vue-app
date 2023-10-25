<template>
    <RouterView v-if="isRouterAlive" />
</template>

<script  lang="ts" setup>
import { nextTick, onMounted, provide, ref } from 'vue'

// 局部组件刷新
const isRouterAlive = ref(true)
const reload = () => {
    isRouterAlive.value = false
    nextTick(() => {
        isRouterAlive.value = true
    })
}
provide('reload', reload)
</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
</style>
