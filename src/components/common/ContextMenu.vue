<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

interface Position {
  x: number
  y: number
}

interface Props {
  modelValue: boolean
}

const props = defineProps<Props>()
const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

const menuRef = ref<HTMLElement | null>(null)
const position = ref<Position>({ x: 0, y: 0 })

const updatePosition = (event: MouseEvent) => {
  position.value = {
    x: event.clientX,
    y: event.clientY,
  }
}

const handleClickOutside = (event: MouseEvent) => {
  if (menuRef.value && !menuRef.value.contains(event.target as Node)) {
    emit('update:modelValue', false)
  }
}

const open = (event: MouseEvent) => {
  updatePosition(event)
  emit('update:modelValue', true)
}

defineExpose({
  open,
})

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<template>
  <Teleport to="body">
    <div
      v-if="modelValue"
      ref="menuRef"
      class="context-menu"
      :style="{
        left: `${position.x}px`,
        top: `${position.y + 14}px`,
      }"
    >
      <slot />
    </div>
  </Teleport>
</template>

<style scoped>
.context-menu {
  position: fixed;
  background: var(--color-background-soft);
  border-radius: var(--radius-small);
  min-width: 200px;
  box-shadow: var(--box-shadow);
  z-index: 1000;
  overflow: hidden;
}

:slotted(.menu-item) {
  padding: 8px 16px;
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--color-text);
  cursor: pointer;
  transition: background-color 0.2s;
}

:slotted(.menu-item:hover) {
  background-color: var(--color-border-hover);
}

:slotted(.menu-divider) {
  height: 1px;
  background-color: var(--color-border);
  margin: 4px 0;
}
</style>
