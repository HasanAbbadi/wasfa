<script setup lang="ts">
import IconClose from '@/components/icons/IconClose.vue'
import { defineProps, defineModel, computed } from 'vue'

const props = defineProps<{
  options: string[]
}>()

const selected = defineModel<string[]>({
  default: () => [],
})
const clonedOptions = computed(() => {
  // if there are selected options, clone the options array and remove the selected options
  return props.options?.slice().filter((option) => !selected.value.includes(option)) || []
})

const onSelect = (selection: string) => {
  selected.value.push(selection)
  clonedOptions.value.splice(clonedOptions.value.indexOf(selection), 1)
}

const onClose = (selection: string) => {
  selected.value.splice(selected.value.indexOf(selection), 1)
  clonedOptions.value.push(selection)
}
</script>
<template>
  <div class="wrapper">
    <div class="selections">
      <div class="selection" v-for="selection in selected" :key="selection">
        {{ selection }}
        <button
          class="close"
          @click="onClose(selection)"
          type="button"
          aria-label="Remove selection"
        >
          <IconClose />
        </button>
      </div>
    </div>
    <div class="chips">
      <div class="chip" v-for="option in clonedOptions" :key="option" @click="onSelect(option)">
        {{ option }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  display: flex;
  /* flex-direction: column; */
  flex-wrap: wrap;
  gap: 8px;
  padding: 16px;
  border: 1px solid var(--color-border, #ccc);
  border-radius: var(--radius-medium);
  background-color: var(--color-background);
}

.selections,
.chips {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.selection,
.chip {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 6px 10px;
  border-radius: var(--radius-medium);
  cursor: pointer;
  transition:
    background-color 0.2s ease,
    transform 0.1s ease;
  user-select: none;
}

.chip {
  background-color: var(--color-background-soft);
  color: var(--color-text);
  border: 1px solid transparent;
}

.chip:hover {
  background-color: var(--color-background-mute);
  border-color: var(--color-border-hover);
  transform: scale(1.05);
}

.selection {
  background-color: var(--color-secondary);
  color: var(--color-accent);
  border: 1px solid var(--color-accent);
}

.selection:hover {
  background-color: var(--color-secondary);
}

.close {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.1);
  border: none;
  border-radius: 50%;
  padding: 4px;
  cursor: pointer;
  transition: background-color 0.2s ease;
  opacity: 0.7;
}

.close:hover {
  background-color: rgba(0, 0, 0, 0.2);
  opacity: 1;
}

.close svg {
  width: 14px;
  height: 14px;
  fill: var(--color-close-icon, #666);
}

@media (max-width: 400px) {
  .wrapper {
    padding: 10px;
  }
  .selection,
  .chip {
    padding: 4px 8px;
    font-size: 0.875rem;
  }
}
</style>
