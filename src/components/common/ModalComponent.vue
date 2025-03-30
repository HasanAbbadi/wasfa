<script setup lang="ts">
import { ref } from 'vue'
const dialog = ref<HTMLDialogElement>()

const onClick = (e: MouseEvent) => {
  if (e.target === dialog.value) {
    close()
  }
}

const open = () => {
  dialog.value?.showModal()
}

const close = () => {
  dialog.value?.classList.add('closing')
  setTimeout(() => {
    dialog.value?.close()
    dialog.value?.classList.remove('closing')
  }, 200)
}

defineExpose({
  open,
  close,
})
</script>

<template>
  <dialog ref="dialog" class="modal" @click="onClick" @cancel="close">
    <div class="modal-header">
      <slot name="modal-header" />
    </div>
    <div class="modal-body">
      <slot name="modal-body" />
    </div>
    <div class="modal-footer">
      <slot name="modal-footer" />
    </div>
  </dialog>
</template>

<style>
.modal::backdrop {
  --background: rgba(0, 0, 0, 0.3);
  background-color: var(--background);
  animation: backdrop-open 0.2s ease;
}

[data-theme='dark'] .modal::backdrop {
  --background: rgba(0, 0, 0, 0.6);
}

.modal[open] {
  animation: dialog-open 0.2s ease;
}

.modal.closing::backdrop {
  animation: backdrop-close 0.2s ease;
}

.modal.closing {
  animation: dialog-close 0.2s ease;
}

.modal {
  background-color: var(--color-background);
  padding: 2rem;
  border-radius: var(--border-radius);
  max-height: 80vh;
  flex-direction: column;
  gap: 2rem;
  transition: width 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
  margin: auto;
  inset: 0;
  border: 0;
  color: var(--color-text);
  width: 80%;
  @media (width > 1028px) {
    max-width: 80%;
    min-width: 400px;
    width: auto;
  }
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

@keyframes backdrop-open {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@keyframes backdrop-close {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

@keyframes dialog-open {
  0% {
    opacity: 0;
    transform: translateY(10px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes dialog-close {
  0% {
    opacity: 1;
    transform: translateY(0);
  }
  100% {
    opacity: 0;
    transform: translateY(10px);
  }
}
</style>
