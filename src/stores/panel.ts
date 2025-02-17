import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

const STORAGE_KEY = 'side-panel-expanded'
const MOBILE_SIZE = 1028

export const usePanelStore = defineStore('panel', () => {
  const savedState = localStorage.getItem(STORAGE_KEY) === 'true'
  const isMobile = ref(window.innerWidth < MOBILE_SIZE)
  const isExpanded = ref(isMobile ? false : savedState ? savedState : false)

  const expand = () => {
    if (isExpanded.value) isExpanded.value = false
    isExpanded.value = true
  }

  const collapse = () => {
    isExpanded.value = false
  }

  const toggle = () => {
    isExpanded.value = !isExpanded.value
  }

  watch(isExpanded, (value) => {
    localStorage.setItem(STORAGE_KEY, value.toString())
  })

  window.addEventListener('resize', () => {
    isMobile.value = window.innerWidth < MOBILE_SIZE
  })

  return {
    isExpanded,
    isMobile,
    expand,
    collapse,
    toggle,
  }
})
