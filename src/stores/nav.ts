import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export const useNavStore = defineStore('nav', () => {
  const isExpanded = ref(!(localStorage.getItem('nav-expanded') === 'false'))

  watch(isExpanded, (value) => {
    localStorage.setItem('nav-expanded', value.toString())
  })

  const toggleNav = () => {
    isExpanded.value = !isExpanded.value
  }

  return {
    isExpanded,
    toggleNav,
  }
})
