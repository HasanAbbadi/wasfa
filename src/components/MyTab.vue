<!-- Tab.vue -->
<template>
  <div class="tab-content">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
defineProps({
  name: {
    type: String,
    required: true,
  },
})
</script>

<style scoped>
.tab-content {
  width: 100%;
  overflow-y: auto;
}
</style>
