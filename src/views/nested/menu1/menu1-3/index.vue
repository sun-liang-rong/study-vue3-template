<template>
  <el-button type="primary" @click="add">添加角色</el-button>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column prop="created_at" label="时间" width="180" />
    <el-table-column prop="name" label="名称" width="180" />
    <el-table-column prop="description" label="描述" />
  </el-table>
  <el-dialog v-model="dialogVisible" title="Tips" width="30%" :before-close="handleClose">
    <el-form :label-position="labelPosition" label-width="100px" :model="formLabelAlign" style="max-width: 460px">
      <el-form-item label="名称">
        <el-input v-model="formLabelAlign.name" />
      </el-form-item>
      <el-form-item label="描述">
        <el-input v-model="formLabelAlign.region" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="cancelHander">取消</el-button>
        <el-button type="primary" @click="addHanler">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script setup lang="ts">
interface tableDataTypes {
  created_at: string,
  name: string
  description: string
}
import { ref, reactive } from 'vue'
import { getRole, addRole } from '@/api/user'
import { elMessage } from '@/hooks/use-element'
import { ElMessageBox } from 'element-plus'
const dialogVisible = ref(false)
const labelPosition = ref('right')
const formLabelAlign = reactive({
  name: '',
  region: ''
})
let tableData = reactive< tableDataTypes []>([

])
const getRoleList = () => {
  tableData.length = 0
  getRole().then((res) => {
    console.log(res.data)
    tableData.push(...res.data)
    console.log(tableData, 'tableData')
  })
}
getRoleList()
const add = () => {
  dialogVisible.value = true
}
const handleClose = (done: () => void) => {
  done()
}
const addHanler = () => {
  dialogVisible.value = false
  addRole({
    name: formLabelAlign.name,
    description: formLabelAlign.region
  }).then((res) => {
    console.log(res)
    elMessage('添加成功')
    getRoleList()
  })
  
}
const cancelHander = () => {
  dialogVisible.value = false
}
</script>
