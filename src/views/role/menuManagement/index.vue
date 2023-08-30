<template>
  <div class="container">
    菜单管理
    <el-button type="primary" @click="add">刷新Token</el-button>
  </div>
</template>

<script setup lang="ts">
import {reactive,toRefs} from "vue"
import { useBasicStore } from '@/store/basic'
// import { refreshTokenReq } from "@/api/refreshTOken"
const add = () => {
  // refreshTokenReq().then((res) => {
  //   console.log(res)
  //   useBasicStore().setToken(res.data.accessToken)
  // })
}
</script>

<style lang="less" scoped>
</style>
