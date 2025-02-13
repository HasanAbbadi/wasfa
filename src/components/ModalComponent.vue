<script setup lang="ts">
import { ref, watch } from 'vue'
const emit = defineEmits(['close'])
const isClosed = ref<boolean>()
const isClosedParent = defineModel<boolean>()

watch(isClosedParent, (value) => {
  if (value === false) {
    open()
  }
})

const open = () => {
  isClosedParent.value = false
  // delay the opening
  setTimeout(() => {
    isClosed.value = false
  }, 200)
}

const close = () => {
  isClosed.value = true
  // delay the transition
  setTimeout(() => {
    isClosedParent.value = true
    emit('close')
  }, 200)
}

window.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    close()
  }
})
</script>

<template>
  <div class="modal-backdrop" @click="close" :class="{ closed: isClosed }">
    <div class="modal" @click.stop>
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
  width: 400px;
  max-width: 80%;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.modal-body {
  display: flex;
  flex-direction: column;
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
