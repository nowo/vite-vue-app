<template>
    <ElConfigProvider :size="getGlobalComponentSize" :locale="zhCn">
        <!-- <router-view v-show="setLockScreen" /> -->

        <RouterView v-if="isRouterAlive" />
        <!-- <LockScreen v-if="themeConfig.isLockScreen" /> -->
        <!-- <Settings v-show="setLockScreen" ref="settingRef" /> -->
        <!-- <CloseFull v-if="!themeConfig.isLockScreen" /> -->
        <!-- <Upgrade v-if="getVersion" /> -->
    </ElConfigProvider>
</template>

<script  lang="ts" setup>
import { nextTick, onMounted, provide, ref } from 'vue'
import zhCn from 'element-plus/es/locale/lang/zh-cn'

const themeConfigState = useThemeConfig()

// 获取全局组件大小
const getGlobalComponentSize = computed(() => {
    return themeConfigState.themeConfig.globalComponentSize
})

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
