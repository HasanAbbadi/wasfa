<script setup lang="ts">
import { defineModel } from 'vue'
import RippleComponent from '@/components/RippleComponent.vue'

const state = defineModel<boolean>()

const updateState = () => {
  state.value = !state.value
}
</script>

<template>
  <RippleComponent>
    <div class="switch-component" @click.stop="updateState">
      <div class="body">
        <slot name="body-content" />
      </div>
      <div class="switch" @click.stop="updateState" :class="{ checked: state }">
        <div class="switch-handle">
          <slot name="handle-content" />
        </div>
      </div>
    </div>
  </RippleComponent>
</template>

<style>
.switch {
  --width: 50px;
  --height: 30px;
  --radius: 18px;
  --padding: 6px;
  --duration: 0.3s;
}

.switch-component {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  flex: 1;
  gap: 1em;
  padding-inline: 2em;
  padding-block: 1em;
  position: relative;
}

.switch-component .body {
  user-select: none;
}

p {
  font-size: var(--font-size-small);
  opacity: 0.7;
}

.switch {
  --border-color: #444746;
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius);
  width: var(--width);
  height: var(--height);
  cursor: pointer;
  background-color: var(--color-background);
  display: flex;
  align-items: center;
  padding-inline: var(--padding);
  transition: all var(--duration) ease;
  opacity: 0.8;
}

.switch:hover {
  opacity: 1;
}

.checked {
  background-color: var(--color-secondary);
}

.switch-handle {
  width: var(--radius);
  aspect-ratio: 1;
  border-radius: 50%;
  background-color: var(--border-color);
  transition: all var(--duration) ease;
  display: grid;
  place-items: center;
}

.checked .switch-handle {
  --scale: 1.2;
  --percentage: calc((var(--scale) - 1) * 100%);
  transform: translateX(calc(var(--width) - var(--radius) - var(--padding) * 2 - var(--percentage)))
    scale(var(--scale));
  background-color: var(--color-accent);
}

.switch-handle svg {
  width: calc(var(--radius) - 2px);
  height: calc(var(--radius) - 2px);
  color: var(--color-text);
  opacity: 0;
}
</style>
