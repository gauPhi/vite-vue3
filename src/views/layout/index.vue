<template>
  <!-- <a-layout class="width-100 flex-display layout" style="height: 100vh"> -->
  <a-layout>
    <a-layout-header class="header">
      <div class="text-white">vue3</div>
    </a-layout-header>

    <a-layout-content>
      <a-layout>
        <a-layout-sider v-model:collapsed="collapsed" collapsible>
          <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline">
            <a-menu-item key="1">
              <pie-chart-outlined />
              <span><router-link to='/home' class="rule-item">home</router-link></span>
            </a-menu-item>
            <a-menu-item key="2">
              <desktop-outlined />
              <span><router-link to='/info' class="rule-item">info</router-link></span>
            </a-menu-item>
            <a-menu-item key="30">
              <desktop-outlined />
              <span><router-link to='/canvas' class="rule-item">canvas</router-link></span>
            </a-menu-item>
            <a-sub-menu key="sub1">
              <template #title>
                <span>
                  <user-outlined />
                  <span>User</span>
                </span>
              </template>
              <a-menu-item key="3">Tom</a-menu-item>
              <a-menu-item key="4">Bill</a-menu-item>
              <a-menu-item key="5">Alex</a-menu-item>
            </a-sub-menu>
            <a-sub-menu key="sub2">
              <template #title>
                <span>
                  <team-outlined />
                  <span>Team</span>
                </span>
              </template>
              <a-menu-item key="6">Team 1</a-menu-item>
              <a-menu-item key="8">Team 2</a-menu-item>
            </a-sub-menu>
            <a-menu-item key="9">
              <file-outlined />
              <span>File</span>
            </a-menu-item>
          </a-menu>
        </a-layout-sider>
        <a-layout-content class="p-2">
          <a-breadcrumb style="margin: 15px 0">
            <a-breadcrumb-item>User</a-breadcrumb-item>
            <a-breadcrumb-item>Bill</a-breadcrumb-item>
          </a-breadcrumb>
          <router-view />
          <a-layout-footer style="text-align: center">
            Ant Design ©2018 Created by Ant UED
          </a-layout-footer>
        </a-layout-content>

      </a-layout>
    </a-layout-content>
  </a-layout>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref, UnwrapRef, watch, provide } from 'vue'
import {
  PieChartOutlined,
  DesktopOutlined,
  UserOutlined,
  TeamOutlined,
  FileOutlined,
} from '@ant-design/icons-vue';

const collapsed = ref<boolean>(false);
const selectedKeys = ref<string[]>(['1']);

</script>