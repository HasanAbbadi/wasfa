import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useSnackbarStore = defineStore('snackbar', () => {
  const message = ref('')
  const isOpen = ref(false)

  const show = (msg: string) => {
    isOpen.value = true
    message.value = msg
  }

  const close = () => {
    isOpen.value = false
    message.value = ''
  }

  return { message, isOpen, show, close }
})
