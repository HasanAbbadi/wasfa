<script setup lang="ts">
import IconUp from '@/components/icons/IconUp.vue'
import IconDown from '@/components/icons/IconDown.vue'
import IconClose from '@/components/icons/IconClose.vue'
import { ref, defineModel } from 'vue'

const items = defineModel<string[]>({
  default: () => [''],
})

const oldIndex = ref(0)

const addNewitem = () => {
  items.value.push('')
}

const removeitem = (index: number) => {
  items.value.splice(index, 1)
}

const onChange = (index: number, event: Event) => {
  items.value[index] = (event.target as HTMLInputElement).value
}

const moveitemUp = (index: number) => {
  if (index > 0) {
    const temp = items.value[index]
    items.value[index] = items.value[index - 1]
    items.value[index - 1] = temp
    oldIndex.value = index
  }
}

const moveitemDown = (index: number) => {
  if (index < items.value.length - 1) {
    const temp = items.value[index]
    items.value[index] = items.value[index + 1]
    items.value[index + 1] = temp
    oldIndex.value = index
  }
}
</script>

<template>
  <div class="add-items">
    <div v-for="(item, index) in items" :key="item">
      <div class="move-buttons">
        <button class="secondary" type="button" @click="moveitemUp(index)">
          <IconUp />
        </button>
        <button class="secondary" type="button" @click="moveitemDown(index)">
          <IconDown />
        </button>
      </div>
      <span>{{ index + 1 }}. </span>
      <input type="text" :value="item" @change="onChange(index, $event)" />
      <button class="secondary close" type="button" @click="removeitem(index)">
        <IconClose />
      </button>
    </div>
    <button class="secondary" type="button" @click="addNewitem">Add new item</button>
  </div>
</template>

<style scoped>
.add-items {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.5rem;
}

.add-items > div {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

input {
  margin: 0;
}

.move-buttons {
  display: flex;
  flex-direction: column;
}
.move-buttons button {
  padding: 0;
  width: 24px;
  height: 24px;
  margin-block: -4px;
  opacity: 0.5;
}

.move-buttons button:hover {
  background-color: transparent;
  opacity: 1;
}

svg {
  width: 24px;
  height: 24px;
}
</style>
