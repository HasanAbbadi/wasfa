import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useSnackbarStore = defineStore('snackbar', () => {
  const message = ref('')
  const isOpen = ref(false)
  const extraButtonText = ref('')
  const extraButtonAction = ref<(() => void) | null>(null)

  const show = (msg: string, extraBtnText?: string, extraBtnAction?: () => void) => {
    isOpen.value = true
    message.value = msg

    if (extraBtnText) {
      extraButtonText.value = extraBtnText
    }

    if (extraBtnAction) {
      extraButtonAction.value = extraBtnAction
    }
  }

  const close = () => {
    isOpen.value = false
    message.value = ''
    extraButtonText.value = ''
    extraButtonAction.value = null
  }

  return { message, isOpen, show, close, extraButtonText, extraButtonAction }
})
