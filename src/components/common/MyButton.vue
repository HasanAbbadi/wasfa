<script setup lang="ts">
import TouchRipple from '@/components/common/TouchRipple.vue'
</script>

<template>
  <button class="m3-button">
    <touch-ripple class="m3-ripple-container" :keep-last-ripple="true">
      <div class="m3-button-content"><slot>Button</slot></div>
    </touch-ripple>
  </button>
</template>

<style>
.m3-button {
  --bg: rgba(from var(--color-secondary) r g b / 0.3);
  --bg-hover: rgba(from var(--color-secondary) r g b / 0.6);
  --clr: var(--color-text);

  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 0;
  font-size: 16px;
  font-weight: 500;
  border: none;
  font-weight: 500;
  padding: 0 !important;
  box-shadow: none !important;
  border: none;
  border-radius: var(--border-radius);
  background-color: var(--bg);
  color: var(--clr);
  cursor: pointer;
  overflow: hidden;
  transition: background-color 0.3s ease;
  /* width: 100%; */
}

.m3-ripple-container {
  overflow: hidden;
  border-radius: var(--border-radius);
  width: 100%;
}

.m3-button-content {
  padding: 10px 12px;
}

[data-theme='dark'] .m3-button {
  --bg: rgba(from var(--color-accent) r g b / 0.8);
  --bg-hover: rgba(from var(--color-accent) r g b / 0.6);
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
  --bg-hover: rgba(from var(--color-danger) r g b / 0.3);
  --clr: var(--color-danger);
}

.m3-button.success {
  --bg: rgba(from var(--color-success) r g b / 0.8);
  --bg-hover: rgba(from var(--color-success) r g b / 0.3);
  --clr: var(--color-success);
}

.m3-button.warning {
  --bg: rgba(from var(--color-warning) r g b / 0.8);
  --bg-hover: rgba(from var(--color-warning) r g b / 0.3);
  --clr: var(--color-warning);
}

.m3-button.simple {
  --bg: transparent;
  --bg-hover: rgba(from var(--clr) r g b / 0.1);
  --clr: var(--color-text);
}

[data-theme='dark'] .m3-button:not(.secondary) {
  --clr: var(--color-text);
}

.m3-button:hover {
  color: var(--color-text);
  background-color: var(--bg-hover);
}

.m3-button.rounded {
  border-radius: var(--border-radius);
}
</style>
