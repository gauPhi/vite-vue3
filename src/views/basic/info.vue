<template>
  <div class="py-2 px-4 bg-white h-500px">
    <vxe-toolbar>
      <template #buttons>
        <vxe-button @click="allAlign = 'left'">居左</vxe-button>
        <vxe-button @click="allAlign = 'center'">居中</vxe-button>
        <vxe-button @click="allAlign = 'right'">居右</vxe-button>
      </template>
    </vxe-toolbar>

    <vxe-table :align="allAlign" :data="tableData">
      <vxe-column type="seq" width="60"></vxe-column>
      <vxe-column field="name" title="Name" show-overflow="ellipsis"></vxe-column>
      <vxe-column field="nameLang" title="标题溢出，显示为 tooltip xxxxxxxxxx" show-header-overflow show-overflow="title"
        show-footer-overflow></vxe-column>
      <vxe-column field="sex" title="Sex"></vxe-column>
      <vxe-column field="age" title="Age"></vxe-column>
    </vxe-table>

    <div class="bg-light-500"></div>
    <h1>{{ name }}</h1>
    <h1>{{ count }}</h1>
    <a-button @click="handleChange">+20</a-button>

    <p>{{ count20 }}</p>

  </div>
</template>
<script lang="ts" setup>
import { onMounted, reactive, ref, UnwrapRef, watch, provide } from 'vue'

import { VxeTablePropTypes } from 'vxe-table'

import { useMainStore } from '../../store'

import { storeToRefs } from 'pinia'

interface RowVO {
  id: number
  name: string
  nameLang: string
  role: string
  sex: string
  age: number
  address: string
}


const allAlign = ref<VxeTablePropTypes.Align>(null)

const tableData = ref<RowVO[]>([
  { id: 10001, name: 'Test1', nameLang: 'Test1 不换行不换行不换行不换行不换行不换行不换行不换行不换行不换行不换行不换行不换行不换行不换行不换行', role: 'Develop', sex: 'Man', age: 28, address: 'test abc' },
  { id: 10002, name: 'Test2', nameLang: 'Test2Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
  { id: 10003, name: 'Test3', nameLang: 'Test2Test2Test2', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
  { id: 10004, name: 'Test4', nameLang: 'Test2Test2Test2', role: 'Designer', sex: 'Women', age: 24, address: 'Shanghai' }
])

const mainStore = useMainStore()

const { name, count, count20 } = storeToRefs(mainStore)

const handleChange = () => {
  mainStore.changeState(10)
}

</script>