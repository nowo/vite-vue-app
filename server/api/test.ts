import { extname } from 'node:path'
import type { H3Event, MultiPartData } from 'h3'

export default eventHandler(async (event) => {
    const body = await readBody(event)

    const allData = Array.from({ length: 500 }).map((item, index) => {
        const data = {
            id: index + 1,
            account: 'admin',
            name: `张三_${Math.floor(Math.random() * 1000)}`,
            company_name: '工游记科技有限公司',
            phone: `17786${Math.floor(Math.random() * 1000000)}`,
            group_name: `组_${Math.floor(Math.random() * 100)}`,
            password: '',
            last_login_time: '',
            role_id: 0,
            status: 0,
            company_id: 0,
            role_name: '',
        }
        return data
    })
    const page = body.page || 1
    const pageSize = body.pageSize || 20

    const end = page * pageSize
    const list = allData.slice(end - pageSize, end)

    return { list, total: allData.length }
})
