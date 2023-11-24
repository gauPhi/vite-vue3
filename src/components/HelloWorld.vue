<template>
  <h1>{{ msg }}</h1>
  <div></div>
  <div class="card">
    <button type="button" @click="count++">count is {{ count }}</button>
    <p class="bg-blue-400">
      Edit111
      <code>components/HelloWorld.vue</code> to test HMR
    </p>
  </div>
  <p class="read-the-docs">Click on the Vite and Vue logos to learn more</p>
</template>
<script setup lang="ts">
import { ref } from 'vue'
defineProps<{ msg: string }>()
const count = ref(0)
</script>
<style scoped>
.read-the-docs {
  color: #888;
}
</style>
