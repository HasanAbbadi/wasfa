<script setup lang="ts">
import { ref, watch } from 'vue'
import { useSnackbarStore } from '@/stores/snackbar'
import { storeToRefs } from 'pinia'

const store = useSnackbarStore()
const { message, isOpen } = storeToRefs(store)

const isClosed = ref(true)
const snackbar = ref()

let timeout: ReturnType<typeof setTimeout>

const show = () => {
  isClosed.value = false
  snackbar.value?.classList.remove('fade')

  timeout = setTimeout(() => {
    close()
  }, 5000)
}

const close = () => {
  snackbar.value?.classList.add('fade')
  setTimeout(() => {
    clearTimeout(timeout)
    isClosed.value = true
    store.close()
  }, 200)
}

watch(isOpen, (newVal) => {
  if (newVal) {
    show()
  }
})
</script>

<template>
  <div v-if="!isClosed" class="snackbar" ref="snackbar">
    <p class="message">{{ message }}</p>
    <div class="snackbar-actions">
      <button
        v-if="store.extraButtonText"
        class="close secondary"
        @click="() => store.extraButtonAction && store.extraButtonAction()"
      >
        {{ store.extraButtonText }}
      </button>
      <button class="close secondary" @click="close">Close</button>
    </div>
  </div>
</template>

<style>
.snackbar {
  position: fixed;
  bottom: 1rem;
  inset-inline-start: 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
  padding: 0.75rem 1.25rem;
  background-color: var(--color-background-opposite);
  color: var(--color-background);
  border-radius: var(--radius-small);
  box-shadow: var(--box-shadow);
  z-index: 100;
}

.snackbar .message {
  font-weight: var(--font-weight-medium);
  font-size: var(--font-size-small);
  margin: 0;
  opacity: 0.9;
}

.snackbar-actions {
  display: flex;
  align-items: center;
  gap: 5px;
}

.snackbar-actions button {
  padding: 15px 5px;
}

.snackbar-actions .close {
  color: var(--color-accent);
  margin: 0;
}

.snackbar {
  animation: show 0.2s ease-in-out;
}

.snackbar.fade {
  animation: fade 0.2s ease-in-out;
}

@keyframes show {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes fade {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}

@media (max-width: 768px) {
  .snackbar {
    width: 100%;
    inset-inline-start: 0;
    margin: 1rem auto;
  }
}
</style>
