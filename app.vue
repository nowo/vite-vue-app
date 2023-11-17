<template>
    <el-config-provider :locale="zhCn">
        <VitePwaManifest />
        <NuxtLayout :name="layoutName">
            <NuxtLoadingIndicator />
            <div>
                <NuxtLink v-for="item in list" :key="item.path" :to="item.path" class="mr20px">
                    {{ item.name }}
                </NuxtLink>
            </div>
            <NuxtPage />
        </NuxtLayout>
    </el-config-provider>
</template>

<script setup lang="ts">
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'

// import '~/assets/scss/default.scss'

// import '@unocss/reset/tailwind.css'
// import '~/assets/scss/app.scss'

// const locale = ref(zhCn)
// const systemInfo = await useSystemState().getSystemInfo()
// console.log('🚀 ~ file: app.vue:22 ~ systemInfo:', systemInfo)

// const { locale: lo } = useI18n()

// const locale = computed(() => {
//     return lo.value === 'en' ? en : zhCn
// })

const route = useRoute()

const { themeConfig } = useThemeState()

// 布局结构设置
const layoutName = computed(() => {
    const layout = themeConfig.value.layout
    const blank = route.name === 'login' ? 'blank' : ''
    return blank || layout
})

const list = useRouter().getRoutes()

if (process.client) console.log(useRouter().getRoutes())

// let a = -1
// if (a > 0){ a++}

// console.log('a :>> ', a);

// useHead({
//     title: systemInfo.value?.title,
//     meta: [
//         { name: 'description', content: systemInfo.value?.description },
//         { name: 'keywords', content: systemInfo.value?.keyword },
//     ],
//     link: [{ rel: 'icon', href: systemInfo.value?.icon }],
//     // bodyAttrs: {
//     //     class: 'test',
//     // },
//     // script: [{ innerHTML: 'console.log(\'Hello world\')' }],
// })
</script>

<style lang="scss">
html,
body,
#__nuxt {
    height: 100vh;
    margin: 0;
    padding: 0;
    // background: $bgColor;
}

html.dark {
    background: #333;
    color: white;
}

.page-enter-active,
.page-leave-active {
  transition: all 2s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
</style>
