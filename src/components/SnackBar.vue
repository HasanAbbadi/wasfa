<script setup lang="ts">
import { ref } from 'vue'
const isClosed = ref(true)
const snackbar = ref()

const props = defineProps({
  message: {
    type: String,
    required: true,
  },
})

const show = () => {
  isClosed.value = false
  snackbar.value?.classList.remove('fade')

  setTimeout(() => {
    close()
  }, 5000)
}

const close = () => {
  snackbar.value?.classList.add('fade')
  setTimeout(() => {
    isClosed.value = true
  }, 200)
}

defineExpose({
  show,
})
</script>

<template>
  <div v-if="!isClosed" class="snackbar" ref="snackbar">
    <p class="message">{{ props.message }}</p>
    <button class="close secondary" @click="close">Close</button>
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
  gap: 1rem;
  padding: 0.75rem 1.25rem;
  background-color: var(--color-background-opposite);
  color: var(--color-background);
  border-radius: var(--radius-small);
  box-shadow: var(--box-shadow);
}

.snackbar .message {
  font-weight: var(--font-weight-medium);
  font-size: var(--font-size-small);
  margin: 0;
  opacity: 0.9;
}

.snackbar .close {
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
