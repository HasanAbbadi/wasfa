<template>
  <div class="accordion-group" role="tablist">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { provide, ref } from 'vue'

const props = withDefaults(
  defineProps<{
    multiple?: boolean
  }>(),
  {
    multiple: false,
  },
)

const openItems = ref<Set<string>>(new Set())

const toggleItem = (id: string) => {
  if (props.multiple) {
    if (openItems.value.has(id)) {
      openItems.value.delete(id)
    } else {
      openItems.value.add(id)
    }
  } else {
    openItems.value = openItems.value.has(id) ? new Set() : new Set([id])
  }
}

provide('accordionGroup', {
  openItems,
  toggleItem,
  multiple: props.multiple,
})
</script>

<style scoped>
.accordion-group {
  width: 100%;
  border-radius: 0.5rem;
}
</style>
