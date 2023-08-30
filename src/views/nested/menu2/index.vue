<template>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column prop="username" label="用户" align="center" />
    <el-table-column prop="name" label="角色" align="center">
      <template #default="scope">
        <div v-if="scope.row.permissionss && scope.row.permissionss.length">
          <el-tag v-for="(item, index) in scope.row.permissionss">{{ item.name }}</el-tag>
        </div>
        <div v-else>
          -
        </div>
      </template>
    </el-table-column>
    <el-table-column  label="操作" align="center">
      <template #default="scope">
        <el-button link type="primary" size="small" @click="handleDelete"
          >删除</el-button
        >
        <el-button link type="primary" size="small" @click="handlerEdit(scope.row)">编辑</el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-dialog v-model="dialogVisible" title="Tips" width="30%" :before-close="handleClose">
    <el-form :label-position="labelPosition" label-width="100px" :model="formLabelAlign" style="max-width: 460px">
      <el-form-item label="角色">
        <el-select
          v-model="optionsValue"
          multiple
          placeholder="选择角色标签"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
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
  description: string,
  permissionss: [],
  id: string
}
interface optionsTypes {
  label: string,
  value: string
}
import { reactive, ref } from 'vue'
import { addRole, addUserRole, getRole, getRoleList, userList } from '@/api/user'
import { elMessage } from '@/hooks/use-element'
import { ElMessageBox } from 'element-plus'
const dialogVisible = ref(false)
const labelPosition = ref('right')
const tableData = reactive< tableDataTypes []>([])
const optionsValue = ref<string[]>([])
const options = reactive< optionsTypes []>([])
const tempItem = reactive< tableDataTypes >({
  created_at: '',
  name: '',
  description: '',
  permissionss: [],
  id: ''
})
const getAllRole = () => {
  options.length = 0
  getRoleList().then((res) => {
    console.log(res)
    const list = [...res.data]
    list.forEach((item) => {
      options.push({
        label: item.name,
        value: item.id
      })
    })
    options.push(...list)
  })
}
getAllRole()
const getUserList = () => {
   tableData.length = 0
  userList().then((res) => {
    console.log(res)
    tableData.push(...res.data)
  })
}
getUserList()
const handleClose = (done: () => void) => {
  done()
}
const addHanler = () => {
  console.log(optionsValue.value)
  dialogVisible.value = false
  if(optionsValue.value.length > 0){
    const data = {
      userId: tempItem.id,
      roleList: optionsValue.value
    }
    addUserRole(data).then(res => {
      console.log(res)
      elMessage('添加成功')
      tempItem.id = ''
      optionsValue.value.length = 0
      getUserList()
    })
  }
}
const cancelHander = () => {
  dialogVisible.value = false
  
}
const handleDelete = () => {

}
const handlerEdit = (row) => {
  optionsValue.value = []
  row.permissionss.forEach((item) => {
    optionsValue.value.push(item.id)
  })
  dialogVisible.value = true
  tempItem.created_at = row.created_at
  tempItem.name = row.name
  tempItem.description = row.description
  tempItem.permissionss = row.permissionss
  tempItem.id = row.id
}
</script>
