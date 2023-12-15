module.exports = {
    apps: [
        {
            name: 'nuxt-app',
            port: '38493',
            exec_mode: 'cluster',
            instances: 'max',
            script: './.output/server/index.mjs',
            env: {
                // 数据库
                // DATABASE_URL: 'mysql://root:root@localhost:3306/nuxt-prisma',
            },
        },
    ],
}
