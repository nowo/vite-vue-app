import defu from 'defu'

const apiFetch = $fetch.create({ baseURL: '/api' })

/**
 * http请求方法封装
 * @param args
 * @returns
 */
export const useRequest = <T>(...args: Parameters<typeof $fetch>) => {
    const [request, opts] = args
    const config = useRuntimeConfig()

    // const token = useCookie('token')
    const { token } = useUserState()

    const headers: HeadersInit = {}
    if (token.value) { // token追加到请求头
        headers.Authorization = `Bearer ${token.value}`
    }
    console.log('opts :>> ', opts)

    // 仅适用 'PUT', 'POST', 'DELETE 和 'PATCH' 请求方法,使用data接收 https://axios-http.com/zh/docs/req_config
    // 先判断是不是为post提交，默认用get
    // const type: 'data' | 'params' = ['post', 'put', 'patch'].includes(config.method as string) ? 'data' : 'params';
    // let data = config[type] ?? {};
    // if (typeof data === 'string') data = JSON.parse(data)

    const options: typeof opts = {
        // 设置api主机地址
        baseURL: config.public.apiBase,
        // body: { a: 1 },
        // params: { b: 10 },

        headers,

        // 其他相应的处理
        onResponse(_ctx) {
            // _ctx.response._data = new myBusinessResponse(_ctx.response._data)
        },

        onResponseError(_ctx) {
            // throw new myBusinessError()
        },
    }

    const data = { a: 100 }
    // 默认使用get请求，使用query或params
    if (!opts?.method || opts.method.toUpperCase() === 'GET') {
        options.params = data
    } else {
        options.body = data
    }

    // 合并参数
    const params = defu(opts, options)

    return $fetch<T>(request, params)
}

// type $FetchType = typeof $fetch
// export type ReqOptions = Parameters<$FetchType>[1]
// /**
//  * use $Fetch
//  * @param url
//  * @param options
//  * @returns
//  */
// export function useServerFetch<T>(url: NitroFetchRequest, options: ReqOptions = {}) {
//     const userAuth = useCookie('token')
//     const config = useRuntimeConfig()

//     const defaults: ReqOptions = {
//         baseURL: config.baseUrl as string ?? 'https://api.nuxtjs.dev',
//         // cache request
//         // key: url,

//         // set user token if connected
//         headers: userAuth.value
//             ? { Authorization: `Bearer ${userAuth.value}` }
//             : {},

//         onResponse(_ctx) {
//             // _ctx.response._data = new myBusinessResponse(_ctx.response._data)
//         },

//         onResponseError(_ctx) {
//             // throw new myBusinessError()
//         },
//     }

//     // for nice deep defaults, please use unjs/defu
//     const params = defu(options, defaults)

//     return $fetch<T>(url, params)
// }
