export default defineNuxtRouteMiddleware((to, from) => {
    
    console.log('middleware')
    // setTimeout(() => {
    //     navigateTo(to)
    // },1000)

    // const auth = useState('auth')

    // if (!auth.value.isAuthenticated) {
    //     return navigateTo('/login')
    // }

    // if (to.path !== '/dashboard') {
    //     return navigateTo('/dashboard')
    // }
})
