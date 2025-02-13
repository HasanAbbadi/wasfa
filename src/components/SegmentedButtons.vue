<script setup lang="ts">
import type { Component } from 'vue'

type buttonsType = {
  label?: string
  value: string
  checked: boolean
  icon?: Component
}[]

const buttons = defineModel<buttonsType>()
const props = defineProps<{
  multi?: {
    type: boolean
    default: false
  }
}>()

const onButtonChecked = (value: string) => {
  if (props.multi) {
    buttons.value = buttons.value?.map((b) => {
      b.checked = b.value === value
      return b
    })
  } else {
    buttons.value = buttons.value?.map((b) => {
      b.checked = b.value === value
      return b
    })
  }
}
</script>

<template>
  <div class="segmented-buttons">
    <div class="button" v-for="button in buttons" :key="button.value">
      <button
        :class="[{ active: button.checked }]"
        type="button"
        @click="onButtonChecked(button.value)"
      >
        <component :is="button.icon" v-if="button.icon"></component>

        {{ button.label }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.segmented-buttons {
  display: inline-flex;
  position: relative;
  border-radius: var(--border-radius);
  padding: 2px;
}

.button button {
  position: relative;
  padding: 0.5em 1em;
  background: none;
  border: 1px solid var(--color-border);
  color: var(--color-text);
  transition: all 0.2s ease;
  margin-left: -1px;
  box-shadow: none !important;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5em;
}

.button:first-child button {
  margin-left: 0;
  border-radius: calc(var(--border-radius) - 2px) 0 0 calc(var(--border-radius) - 2px);
}

.button:last-child button {
  border-radius: 0 calc(var(--border-radius) - 2px) calc(var(--border-radius) - 2px) 0;
}

.button button.active {
  background-color: var(--color-accent);
  border-color: var(--color-border);
  z-index: 1;
}
</style>
