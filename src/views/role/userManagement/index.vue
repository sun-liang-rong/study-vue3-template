<template>
  <div class="container">
    <el-button type="primary" @click="addUserAccount">添加账号</el-button>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="id" label="ID" align="center" />
      <el-table-column prop="created_at" label="时间" align="center" />
      <el-table-column prop="username" label="账户名" align="center" />
  </el-table>
  <el-dialog v-model="dialogVisible" title="添加账号" width="30%" :before-close="handleClose">
    <el-form ref="ruleFormRef" :rules="rules" label-position="right" label-width="100px" :model="formLabelAlign" style="max-width: 460px">
      <el-form-item label="账户名" prop="username">
        <el-input v-model="formLabelAlign.username" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="formLabelAlign.password" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="cancelHander(ruleFormRef)">取消</el-button>
        <el-button type="primary" @click="addHanler(ruleFormRef)">确定</el-button>
      </span>
    </template>
  </el-dialog>
  </div>
</template>

<script setup lang="ts">
import type { FormInstance, FormRules } from 'element-plus';
import { addUser, userList } from '@/api/user';
interface tableDataTypes {
  username: string
  id: string
  created_at: string
  updated_at: string
}
const ruleFormRef = ref<FormInstance>()
interface RuleForm {
  username: string
  password: string
}
import {reactive,ref,toRefs} from "vue"
const rules = reactive<FormRules>({
  username: [
    { required: true, message: '请输入账户名', trigger: 'blur' },
    { min: 3, max: 8, message: '账户名长度3至8位', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 8, message: '密码长度6至8位', trigger: 'blur' },
  ],
})
const tableData = ref<tableDataTypes []>([])

const addUserAccount = () => {
  console.log(22)
  dialogVisible.value = true
}


const dialogVisible = ref(false)


const formLabelAlign = reactive({
  username: '',
  password: ''
})
//查号关闭
const handleClose = () => {
  dialogVisible.value = false
  if (!ruleFormRef.value) return
  ruleFormRef.value.resetFields()
}
//取消按钮回调
const cancelHander = (formEl: FormInstance | undefined) => {
  dialogVisible.value = false
  if (!formEl) return
  formEl.resetFields()
}
//确定按钮回调
const addHanler = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      dialogVisible.value = false
      addUserHandler(formLabelAlign)
      console.log('submit!')
    } else {
      console.log('error submit!', fields)
    }
  })
  console.log(formLabelAlign)
}
//添加账号接口
const addUserHandler = (data) => {
  addUser(data).then(res => {
    console.log(res)
    getUserList()
  })
}
const getUserList = () => {
  tableData.value = []
  userList().then((res) => {
    console.log(res)
    tableData.value.push(...res.data)
  })
}
getUserList()
</script>

<style lang="scss" scoped>
</style>
