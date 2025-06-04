<script setup lang="ts">
import { ElConfigProvider } from 'element-plus'
import ru from 'element-plus/dist/locale/ru.mjs'
import AccountForm from './components/AccountForm.vue'
</script>

<template>
  <el-config-provider :locale="ru">
    <div class="app">
      <AccountForm />
    </div>
  </el-config-provider>
</template>

<style>
.app {
  width: 100vw;
  height: 100vh;
  min-width: 100vw;
  min-height: 100vh;
  background-color: #f3f5f8;
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
</style>
