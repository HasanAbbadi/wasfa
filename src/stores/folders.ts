import { defineStore } from 'pinia'
import type { folderType } from '@/types'
import { ref, computed, watch } from 'vue'

export const useFoldersStore = defineStore('folders', () => {
  // const folders = ref<folderType[]>(JSON.parse(localStorage.getItem('folders') || '[]'))

  const folders = ref<folderType[]>([
    {
      id: 1,
      name: 'Recipes',
      children: [0, 1, 2],
    },
    {
      id: 2,
      name: 'Favorites',
      children: [3, 4, 5],
    },
    {
      id: 3,
      name: 'Breakfast',
      children: [6, 7, 8],
    },
  ])
  const getFolders = computed(() => folders.value)

  // Save to localStorage whenever folders change
  watch(
    folders,
    (newFolders) => {
      localStorage.setItem('folders', JSON.stringify(newFolders))
    },
    { deep: true },
  )

  function addFolder(folder: folderType) {
    folders.value.push(folder)
  }

  function removeFolder(folder: folderType) {
    folders.value = folders.value.filter((f) => f.id !== folder.id)
  }

  function updateFolder(folder: folderType) {
    folders.value = folders.value.map((f) => {
      if (f.id === folder.id) {
        return folder
      }
      return f
    })
  }

  return {
    folders,
    getFolders,
    addFolder,
    removeFolder,
    updateFolder,
  }
})
