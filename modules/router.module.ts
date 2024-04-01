// https://github.com/nuxt-modules/prismic/blob/master/src/module.ts
import { defineNuxtModule } from '@nuxt/kit'

export default defineNuxtModule({
    setup(options, nuxt) {
        // const resolver = createResolver(import.meta.url)
        nuxt.hook('pages:extend', async (pages) => {
            // const { data } = await $fetch('/api/menu/auth')
            // console.log('data :>> ', data.value)
            console.log(`发现了${pages.length}个页面`)
        })
        // extendPages(async (pages) => {
        //     console.log('999', pages)
        //     // const { data } = await useFetch('/api/menu/auth')
        //     // console.log('data :>> ', data.value)
        //     //   pages.unshift({
        //     //     name: 'prismic-preview',
        //     //     path: '/preview',
        //     //     file: resolver.resolve('runtime/preview.vue')
        //     //    })
        // })
    },
})
