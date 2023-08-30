<template>
  <div>
    <el-button type="primary" @click="setRefreshToken">添加角色</el-button>
  </div>
</template>

<script lang="ts" setup>
  import {ref} from 'vue';
  import { RefreshTokenReq } from '@/api/refreshtoken'
  const setRefreshToken = () => {
    console.log('setRefreshToken')
    RefreshTokenReq().then((res) => {
      console.log(res)
    })
  }
</script>

<style lang="less" scoped>

</style>