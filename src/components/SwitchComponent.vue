<script setup lang="ts">
import { defineModel, ref } from 'vue'

const state = defineModel<boolean>()
const isPointerDown = ref<boolean>(false)
const ripple = ref<HTMLElement | null>(null)
const rippleEffect = ref<HTMLElement | null>(null)

const updateState = () => {
  state.value = !state.value
}

const onClick = (e: MouseEvent) => {
  updateState()

  if (ripple.value && rippleEffect.value) {
    if (!isPointerDown.value) {
      startRipple(e)
      setTimeout(() => {
        stopRipple()
      }, 300)
    }
  }
}

const startRipple = (e: MouseEvent) => {
  if (!ripple.value || !rippleEffect.value) return
  isPointerDown.value = true
  const rect = ripple.value.getBoundingClientRect()
  const size = Math.max(rect.width, rect.height)
  const x = e.clientX - rect.left - size / 2
  const y = e.clientY - rect.top - size / 2

  rippleEffect.value.style.width = rippleEffect.value.style.height = `${size}px`
  rippleEffect.value.style.left = `${x}px`
  rippleEffect.value.style.top = `${y}px`

  rippleEffect.value.classList.remove('fade')
  rippleEffect.value.classList.add('active')
}

const stopRipple = () => {
  if (!rippleEffect.value) return
  isPointerDown.value = false
  rippleEffect.value.classList.add('fade')
  rippleEffect.value.classList.remove('active')
}
</script>

<template>
  <div
    class="switch-component"
    @click.stop="onClick"
    @pointerdown="startRipple"
    @pointerup="stopRipple"
    @pointerleave="stopRipple"
    @pointercancel="stopRipple"
  >
    <span class="ripple" ref="ripple">
      <span class="ripple-effect fade" ref="rippleEffect"></span>
    </span>
    <div class="body">
      <slot name="body-content" />
    </div>
    <div class="switch" @click.stop="updateState" :class="{ checked: state }">
      <div class="switch-handle">
        <slot name="handle-content" />
      </div>
    </div>
  </div>
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
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius);
  width: var(--width);
  height: var(--height);
  cursor: pointer;
  background-color: var(--color-background);
  display: flex;
  align-items: center;
  padding-inline: var(--padding);
  transition: all var(--duration) ease;
}

.checked {
  background-color: var(--color-accent);
}

.switch-handle {
  width: var(--radius);
  aspect-ratio: 1;
  border-radius: 50%;
  background-color: var(--color-text);
  transition: all var(--duration) ease;
  display: grid;
  place-items: center;
}

.checked .switch-handle {
  transform: translateX(calc(var(--width) - var(--radius) - var(--padding) * 2));
}

.switch-handle svg {
  width: calc(var(--radius) - 2px);
  height: calc(var(--radius) - 2px);
  color: var(--color-background);
}

.ripple {
  position: absolute;
  inset: 0;
  overflow: hidden;
  border-radius: inherit;
  pointer-events: none;
}

.ripple-effect {
  position: absolute;
  background: radial-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.4));
  border-radius: 50%;
  transform: scale(0);
  opacity: 0.6;
  transition:
    opacity 0.3s ease,
    transform 0.3s ease;
}

.ripple-effect.active {
  transform: scale(4);
}

.ripple-effect.fade {
  transform: scale(0);
  opacity: 0;
}
</style>
