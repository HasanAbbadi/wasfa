<script setup lang="ts">
import { ref, type PropType } from 'vue'

defineProps({
  type: {
    type: String as PropType<'button' | 'submit' | 'reset'>,
    default: 'button',
  },
})

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
  <button
    class="m3-button"
    :type="type"
    @click.stop="onClick"
    @pointerdown="startRipple"
    @pointerup="stopRipple"
    @pointerleave="stopRipple"
    @pointercancel="stopRipple"
  >
    <span class="m3-ripple" ref="ripple">
      <span class="m3-ripple-effect fade" ref="rippleEffect"></span>
    </span>
    <slot name="right-icon"></slot>
    <slot>Button</slot>
    <slot name="left-icon"></slot>
  </button>
</template>

<style>
.m3-button {
  --bg: rgba(from var(--color-secondary) r g b / 0.3);
  --bg-hover: rgba(from var(--color-secondary) r g b / 0.6);
  --bg-ripple: rgba(31, 31, 31, 0.1);
  --clr: var(--color-text);

  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 10px 16px;
  font-size: 16px;
  font-weight: 500;
  border: none;
  font-weight: 500;
  border: none;
  border-radius: 8px;
  background-color: var(--bg);
  color: var(--clr);
  cursor: pointer;
  overflow: hidden;
  transition: background-color 0.3s ease;
  width: 100%;
}

[data-theme='dark'] .m3-button {
  --bg: rgba(from var(--color-accent) r g b / 0.8);
  --bg-hover: rgba(from var(--color-accent) r g b / 0.6);
  --bg-ripple: rgba(227, 227, 227, 0.1);
}

.m3-button.secondary {
  --clr: var(--color-secondary);
  --bg: transparent;
  --bg-hover: rgba(from var(--color-accent) r g b / 0.6);
  color: var(--clr);
}

.m3-button.secondary:hover {
  background: var(--bg-hover);
  color: var(--clr);
}

[data-theme='dark'] .m3-button.secondary {
  --bg-hover: rgba(from var(--color-secondary) r g b / 0.1);
}

.m3-button.danger {
  --bg: rgba(from var(--color-danger) r g b / 0.8);
  --bg-hover: rgba(from var(--color-danger) r g b / 0.6);
  --clr: var(--color-danger);
}

.m3-button.success {
  --bg: rgba(from var(--color-success) r g b / 0.8);
  --bg-hover: rgba(from var(--color-success) r g b / 0.6);
  --clr: var(--color-success);
}

.m3-button.warning {
  --bg: rgba(from var(--color-warning) r g b / 0.8);
  --bg-hover: rgba(from var(--color-warning) r g b / 0.6);
  --clr: var(--color-warning);
}

.m3-button.simple {
  --bg: transparent;
  --bg-hover: rgba(from var(--clr) r g b / 0.1);
  --clr: var(--color-text);
}

.m3-button:hover {
  color: var(--color-text);
  background-color: var(--bg-hover);
}

.m3-button.rounded {
  border-radius: var(--border-radius);
}

.m3-ripple {
  position: absolute;
  inset: 0;
  overflow: hidden;
  border-radius: inherit;
  pointer-events: none;
}

.m3-ripple-effect {
  position: absolute;
  background: var(--bg-ripple);
  border-radius: 50%;
  transform: scale(0);
  opacity: 1;
  transition:
    transform 0.3s ease-in-out,
    opacity 0.1s ease-in-out;
}

.m3-ripple-effect.active {
  transform: scale(2);
}

.m3-ripple-effect.fade {
  opacity: 0;
}
</style>
