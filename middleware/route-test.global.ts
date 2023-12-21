// https://www.saoniuhuo.com/question/detail-2481827.html
export default defineNuxtPlugin(() => {
    // const router = useRouter()

    // alias
    // let routes = []
    // router.beforeEach(async (to, _from, next) => {
    //     const pageType = await getPageType(to.path) // api call

    //     if (isDynamicPage(pageType)) {
    //         router.addRoute({
    //             path: to.path,
    //             name: to.path,
    //             component: () => import(`/pages/[[dynamic]]/product.vue`),
    //         })

    //         if (!routes.some(route => route.path === to.path)) {
    //             routes.push({
    //                 path: to.path,
    //                 type: pageType,
    //             })
    //             next(to.fullPath)
    //             return
    //         }
    //     }

    //     next()
    // })
})
