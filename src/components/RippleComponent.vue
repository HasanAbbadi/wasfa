<script setup lang="ts">
import { ref } from 'vue'

const isPointerDown = ref<boolean>(false)
const ripple = ref<HTMLElement | null>(null)
const rippleEffect = ref<HTMLElement | null>(null)

const emit = defineEmits(['click'])

const onClick = (e: MouseEvent) => {
  emit('click')
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
    class="ripple-wrapper"
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
      <slot />
    </div>
  </div>
</template>

<style>
.ripple-wrapper {
  position: relative;
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
