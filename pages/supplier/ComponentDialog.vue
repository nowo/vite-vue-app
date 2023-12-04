<!-- 新增、修改地址 -->
<template>
    <CoDialog v-model:visible="defData.visible" :loading="btnLoading" auto-height hidden :title="comData.title"
        width="680px" @close="onClose" @cancel="onClose" @confirm="onConfirm">
        <el-form ref="formRef" :model="form.data" :rules="rules" label-width="100px">
            <el-row :gutter="10">
                <el-col :xs="24" :sm="16" :md="16" :lg="16" :xl="16" class="mb20px">
                    <el-form-item label="供应商名称" prop="supplier_name">
                        <el-input v-model="form.data.supplier_name" placeholder="请输入名称" maxlength="50" clearable />
                    </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="14" :md="14" :lg="14" :xl="14" class="mb20px">
                    <el-form-item label="供应商分类" prop="type">
                        <el-cascader v-model="form.data.type" :options="defData.classList"
                            :props="{ emitPath: false, value: 'id', label: 'group_name' }" placeholder="请选择" clearable
                            class="w100" />
                    </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="14" :md="14" :lg="14" :xl="14" class="mb20px">
                    <el-form-item label="联系人" prop="contact">
                        <el-input v-model="form.data.contact" placeholder="请输入联系人名字" maxlength="50" clearable />
                    </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20px">
                    <el-form-item label="手机号码" prop="phone">
                        <el-input v-model="form.data.phone" placeholder="请输入手机号码" maxlength="11" clearable />
                    </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20px">
                    <el-form-item label="地区" prop="cityArr">
                        <el-cascader v-model="form.data.cityArr" :options="regionData" clearable filterable />
                    </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="20" :md="20" :lg="20" :xl="20" class="mb20px">
                    <el-form-item label="详细地址" prop="address">
                        <el-input v-model="form.data.address" placeholder="请输入详细地址" type="textarea"
                            maxlength="200" clearable show-word-limit />
                    </el-form-item>
                </el-col>

                <el-col :xs="24" :sm="20" :md="20" :lg="20" :xl="20" class="mb20px">
                    <el-form-item label="备注" prop="remark">
                        <el-input v-model="form.data.remark" type="textarea" maxlength="200" show-word-limit
                            placeholder="请输入备注" clearable />
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
    </CoDialog>
</template>

<script lang="ts" setup>
import { computed, reactive, ref } from 'vue'
import { ElMessage, type FormInstance, type FormRules } from 'element-plus'

const emits = defineEmits<{
    (event: 'update'): void
}>()

// import { regionData, CodeToText, TextToCode, ChangeToCode, ChangeToText } from '@/utils/files/address';

const regionData = []

const operate = ref<DialogOperate>()
const formRef = ref<FormInstance>()

const defData = reactive({
    visible: false, // 是否显示窗口，默认为false。
    ready: false, // 内容是否加载完成
    classList: [] as GroupApi_ListItem[],
})

const ITEM = {
    supplier_id: '' as '' | number, // 供应商id
    supplier_name: '', // 账户名称
    remark: '', // 备注
    contact: '', // 联系人
    phone: '',
    cityArr: [] as string[], // 地区
    address: '', // 详细地址
    payment_info: [
        // {
        //     "account": "",  //账号
        //     "bank": "",     //开户行
        //     "payee": ""    //户名
        // },

    ] as any,
    type: '' as '' | number, // 类型
}

// 表单数据
const form = reactive({
    data: {
        ...ITEM,
    },

})
const rules = reactive<FormRules>({
    supplier_name: [
        { required: true, message: '必填项不能为空', trigger: 'blur' },
    ],
    type: [
        { required: true, message: '必填项不能为空', trigger: 'blur' },
    ],
    cityArr: [
        { required: true, message: '必填项不能为空', trigger: 'blur' },
    ],
    contact: [
        { required: true, message: '必填项不能为空', trigger: 'blur' },
    ],
    phone: [
        { required: true, pattern: /^1(3[0-9]|4[01456879]|5[0-35-9]|6[2567]|7[0-8]|8[0-9]|9[0-35-9])\d{8}$/, message: '请输入正确的手机号码', trigger: 'blur' },
    ],
    required: [
        { required: true, message: '必填项不能为空', trigger: 'blur' },
    ],
})

const comData = computed(() => {
    let dat = {
        title: '新增供应商',
    }
    if (operate.value === 'edit') {
        dat = {
            title: '修改供应商',
        }
    }
    return dat
})

// 获取初始信息
const initDefaultData = async () => {
    if (defData.ready) return false
    // const { data } = await CommonApi.getAllRegion()
    // if (data.value?.code === 200) {
    //     defData.addressList = data.value.data
    // } else {
    //     ElMessage.error(data.value?.msg) // 提示信息或页面加载不当会引发任何内容。
    // }

    defData.ready = true
}

// 打开弹窗
const onOpenDialog = (type: DialogOperate, row?: UserAddressApi_GetListResponse) => {
    operate.value = type
    if (operate.value === 'edit') { // 修改
        // defData.type = 2
        // form.data.id = row.address_id

        // form.data.name = row.contacts
        // form.data.phone = row.phone
        // form.data.email = row.email

        // const textArr: string[] = []
        // if (row.province) textArr.push(row.province)
        // if (row.province && row.city) textArr.push(row.city)
        // if (row.province && row.city && row.area) textArr.push(row.area)

        // form.data.provinceArr = textArr
        // form.data.address = row.address

        // const choseArr: (1 | 2)[] = []
        // if (row.is_default) choseArr.push(1)
        // if (row.is_bill_address) choseArr.push(2)
        // form.data.defaultArr = choseArr
    } else {
        form.data = deepClone(ITEM)
    }

    initDefaultData()
    defData.visible = true
}
// 关闭弹窗
const onClose = () => {
    defData.visible = false
    formRef.value?.resetFields()
}

// const [ApiFunc, btnLoading] = useSubmit()
const [ApiFunc, btnLoading] = [1, true]
// 确认
const onConfirm = async () => {
    const isRun = await useFormVerify(formRef.value)
    if (!isRun) return false

    const arr = form.data.provinceArr || []

    const params: UserAddressApi_Add = {
        email: form.data.email.trim() ?? '',
        phone: form.data.phone.trim() ?? '',
        contacts: form.data.name.trim() ?? '',
        province: arr[0] ?? '',
        city: arr[1] ?? '',
        area: arr[2] ?? '',
        address: form.data.address,
        is_default: form.data.defaultArr.includes(1) ? 1 : 0,
        is_bill_address: form.data.defaultArr.includes(2) ? 1 : 0,
    }

    if (defData.type === 1) { //  新增
        const { data } = await ApiFunc(UserAddressApi.add(params))

        // console.log('data :>> ', data)
        if (data.value?.code === 200) {
            ElMessage.success('添加成功')
            // @ts-expect-error 接口返回的address_id字段
            const address_id: number = data.value.address_id
            emits('update', {
                ...params,
                address_id,
            })
            // address_id
            onClose()
        } else {
            ElMessage.error(data.value?.msg)
        }
    } else if (defData.type === 2) { // 修改
        const edit: UserAddressApi_Edit = {
            ...params,
            address_id: form.data.id,
        }

        const { data } = await ApiFunc(UserAddressApi.edit(edit))

        // console.log('data :>> ', data)
        if (data.value?.code === 200) {
            ElMessage.success('修改成功')
            emits('update', edit)
            onClose()
        } else {
            ElMessage.error(data.value?.msg)
        }
    }
}

defineExpose({
    onOpenDialog,
})
</script>

<style lang="scss" scoped>
</style>
