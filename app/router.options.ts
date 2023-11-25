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
    routes: _routes => [
        ..._routes,
        // ...customRoutes,
    ],
}
