<template>
  <div class="container">
    usermanagement
    <el-button type="primary" @click="addInterview">添加访问量</el-button>

    <div>
      获取某一天访问量
      <el-button type="primary" @click="getOneDat">获取某一天访问量</el-button>
    </div>
    <div>
      获取所有的访问量
      <el-button type="primary" @click="getAll">获取所有的访问量</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
  import {reactive,toRefs} from "vue"
  import { addInterviewReq, getOneDatReq, getAllReq } from '@/api/interview'
  const addInterview = () => {
    addInterviewReq().then(
      res => {
        console.log(res)
      }
    ).catch(
      error => {
        console.log(error, 'error')
      }
    )
  }
  const getOneDat = () => {
    getOneDatReq().then(
      res => {
        console.log(res)
      }
    ).catch(
      err => {
        console.log(err)
      }
    )
  }
  const getAll = () => {
    getAllReq().then(

      res => {
        console.log(res)
      }
    ).catch(
      err => {
        console.log(err)
      }
    )
  }

</script>

<style lang="less" scoped>
</style>
