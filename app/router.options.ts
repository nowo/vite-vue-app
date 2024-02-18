const customRoutes = [
    {
        name: 'home',
        path: '/home',
        component: () => import('~/pages/index.vue'),
    },
    {
        name: 'demo',
        path: '/demo',
        component: () => import('~/views/demo/index.vue'),
    },
]
export default {
    routes: (_routes) => {
        // console.log('_routes :>> ', _routes)

        // const { data } = await useFetch('/api/menu/auth')
        // console.log('data :>> ', data.value)

        // const routeList = _routes.map((route) => {
        //     const node = findTreeNodeItem(data.value, route.path, 'path')
        //     console.log('node :>> ', node);
        //     // if (node) {
        //     //     route.meta = {
        //     //         ...route.meta,
        //     //         ...node.meta,
        //     //     }
        //     // }
        //     return route
        // })
        // return routeList
        return [
            ..._routes,
            // ...customRoutes,
        ]
    },
}
