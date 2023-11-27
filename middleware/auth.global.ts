const whiteList = ['/', '/doc/*']
export default defineNuxtRouteMiddleware(async (to, from) => {
    console.log(process.client)
    const { menuList, getAuthMenu } = usePermissionState()
    await getAuthMenu()
    if (process.client) {
        const token = useSessionStorage('token', '')
        console.log(token.value)
        if (!token.value && to.path !== '/login') {
            return navigateTo('/login')
        } else if (to.path === '/login') {
            return navigateTo('/')
        } else {
            // const currentItem = menuList.value.find(item => item.path === to.path)
            // console.log(currentItem)
            // // if (!currentItem) return abortNavigation('无权访问')  // 阻止跳转

            // if (!currentItem) return navigateTo('/', { redirectCode: 301 })
        }
    }

    const currentItem = menuList.value.find(item => item.path === to.path)
    console.log(currentItem)
    // if (!currentItem) return abortNavigation('无权访问')  // 阻止跳转

    if (currentItem) {
        to.meta.title = `${currentItem.meta.title}aa`
    } else {
        return navigateTo('/', { redirectCode: 301 })
    }

    // const auth = useState('auth')

    // if (!auth.value.isAuthenticated) {
    //     return navigateTo('/login')
    // }

    // if (to.path !== '/dashboard') {
    //     return navigateTo('/dashboard')
    // }
})
