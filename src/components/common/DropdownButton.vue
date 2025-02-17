<template>
  <div v-on-click-outside="close" class="dropdown-btn-container">
    <div class="main-btn-container">
      <slot name="main-button">
        <button>Main Button</button>
      </slot>
      <touch-ripple @click="toggle"
        ><span><slot name="icon">o</slot></span></touch-ripple
      >
    </div>
    <div v-if="isOpen" class="dropdown-container">
      <slot name="dropdown-content"> </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import TouchRipple from './TouchRipple.vue'

const isOpen = ref(false)

const toggle = () => {
  isOpen.value = !isOpen.value
}

const close = () => {
  isOpen.value = false
}

const VOnClickOutside = {
  mounted: function (element, binding) {
    element.clickOutsideEvent = function (event) {
      const excludeComponent = document.getElementById(binding.arg)

      if (
        !(element == event.target || element.contains(event.target)) &&
        !(
          excludeComponent &&
          (event.target == excludeComponent || excludeComponent.contains(event.target))
        )
      ) {
        binding.value(event, element)
      }
    }
    document.addEventListener('click', element.clickOutsideEvent)
  },
  unmounted: function (element) {
    document.removeEventListener('click', element.clickOutsideEvent)
  },
}
</script>

<style>
.dropdown-btn-container {
  --radius: var(--border-radius);
  --icon-width: 45px;

  width: 100%;
  position: relative;
}

.main-btn-container {
  display: grid;
  grid-template-columns: 1fr var(--icon-width);
  place-content: center;
  align-items: center;
  background-color: var(--bg);
  border-radius: var(--radius);
  border: 1px solid var(--color-border);
  width: 100%;
}
.main-btn-container span {
  display: grid;
  place-content: center;
  text-align: center;
  user-select: none;
  cursor: pointer;
  opacity: 0.3;
  transition: opacity 0.3s ease;
}

.main-btn-container span,
.main-btn-container .v-touch-ripple {
  height: 100%;
  width: 100%;
}

span:hover {
  opacity: 1;
}

.main-btn-container button {
  background: transparent;
  border: none;
  border-radius: var(--radius) 0 0 var(--radius);
  height: 100%;
  cursor: pointer;
  border-right: 2px solid var(--color-border);
  transition: all 0.3s ease;
}

.main-btn-container button .m3-button-content {
  margin-inline-start: var(--icon-width);
}

.dropdown-container {
  position: absolute;
  top: 100%;
  inset-inline-end: -1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: var(--color-background-mute);
  box-shadow: var(--box-shadow);
  border: 1px solid var(--color-border);
  border-radius: var(--radius) 0 var(--radius) var(--radius);
  padding: 10px;
  margin-inline-end: 2rem;
  min-width: 60%;
  z-index: 30;
}

.dropdown-container button {
  background: transparent;
  border: none !important;
  border-radius: 0 !important;
  color: var(--color-text);
  cursor: pointer;
  text-align: start;
  width: 100%;
  padding-block: 0.2rem;
  opacity: 0.8;
  transition: opacity 0.3s ease;
}

.dropdown-container button .m3-button-content {
  padding-inline: 1.25rem;
}

.dropdown-container button:hover {
  opacity: 1;
}

.dropdown-container button:not(:first-child) {
  border-top: 1px solid var(--color-border) !important;
}
</style>
