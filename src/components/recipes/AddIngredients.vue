<script setup lang="ts">
import IconClose from '@/components/icons/IconClose.vue'
import type { ingredientType } from '@/types'

const ingredients = defineModel<ingredientType[]>({ required: true })

const onChangeName = (index: number, event: Event) => {
  ingredients.value[index].name = (event.target as HTMLInputElement).value
}

const onChangeQuantity = (index: number, event: Event) => {
  ingredients.value[index].quantity = parseInt((event.target as HTMLInputElement).value)
}

const onChangeUnit = (index: number, event: Event) => {
  ingredients.value[index].unit = (event.target as HTMLInputElement).value
}

const onRemove = (index: number) => {
  ingredients.value.splice(index, 1)
}

const onAdd = () => {
  ingredients.value.push({ quantity: undefined, unit: undefined, name: undefined })
}
</script>
<template>
  <div class="inputs">
    <div class="input" v-for="(ingredient, index) in ingredients" :key="index">
      <input
        class="quantity"
        type="number"
        :value="ingredient.quantity"
        @change="onChangeQuantity(index, $event)"
      />
      <select class="unit" :value="ingredient.unit" @change="onChangeUnit(index, $event)">
        <option value="mg">mg</option>
        <option value="g">g</option>
        <option value="tbsp">tbsp</option>
        <option value="tsp">tsp</option>
        <option value="ml">ml</option>
        <option value="oz">oz</option>
      </select>
      <input
        class="name"
        type="text"
        :value="ingredient.name"
        @change="onChangeName(index, $event)"
      />
      <button class="secondary close" type="button" @click="onRemove(index)">
        <IconClose />
      </button>
    </div>
    <button class="secondary" type="button" @click="onAdd()">Add new ingredient</button>
  </div>
</template>

<style scoped>
.inputs {
  display: flex;
  flex-direction: column;
  gap: 0.2em;
}
.input {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.2em;
}

input,
select {
  margin: 0;
}

.quantity,
.unit {
  width: 5em;
}

.name {
  flex: 1;
}

svg {
  width: 24px;
  height: 24px;
}
</style>
