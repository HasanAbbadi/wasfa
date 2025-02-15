<script setup lang="ts">
import { ref } from 'vue'
const isClosed = ref<boolean>(true)
const modal = ref()

const open = () => {
  isClosed.value = false
  modal.value?.classList.remove('closed')
}

const close = () => {
  // delay the transition
  modal.value?.classList.add('closed')
  setTimeout(() => {
    isClosed.value = true
  }, 200)
}

window.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    close()
  }
})

defineExpose({
  open,
  close,
})
</script>

<template>
  <div v-if="!isClosed" class="modal-backdrop" @click="close" ref="modal">
    <div class="modal" @click.stop>
      <div class="modal-header">
        <slot name="modal-header" />
      </div>
      <div class="modal-body">
        <slot name="modal-body" />
      </div>
      <div class="modal-footer">
        <slot name="modal-footer" />
      </div>
    </div>
  </div>
</template>

<style>
.modal-backdrop {
  --background: rgba(0, 0, 0, 0.3);
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: var(--background);
  display: flex;
  z-index: 99;
  justify-content: center;
  align-items: center;
  animation: open 0.2s ease;
}

[data-theme='dark'] .modal-backdrop {
  --background: rgba(0, 0, 0, 0.6);
}

.modal-backdrop.closed {
  animation: close 0.2s ease;
}

@keyframes open {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@keyframes close {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

.modal {
  background-color: var(--color-background);
  padding: 2rem;
  border-radius: var(--border-radius);
  max-height: 80%;
  /* width: 400px; */
  max-width: min(80%, 900px);
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.modal-header:not(:has(*)) {
  display: none;
}

.modal-body {
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  overflow-x: hidden;
  gap: 1rem;
}

.modal-footer {
  display: flex;
  gap: 1rem;
}

.modal-footer > * {
  flex: 1;
  font-weight: var(--font-weight-bold);
}

.modal-footer:has(button:only-child) {
  justify-content: flex-end;
}

.modal-footer > button:only-child {
  flex: 0;
}
</style>
