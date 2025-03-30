<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import type { folderType } from '@/types'
import { useFoldersStore } from '@/stores/folders'
import FolderCard from '@/components/home/FolderCard.vue'
import ContextMenu from '@/components/common/ContextMenu.vue'

const foldersStore = useFoldersStore()
// const folders = computed<folderType[]>(() => foldersStore.folders)

const showContextMenu = ref(false)
const contextMenuRef = ref()
const selectedFolderId = ref('')

const handleContextMenu = (event: MouseEvent, folderId: string) => {
  event.preventDefault()
  selectedFolderId.value = folderId
  contextMenuRef.value?.open(event)
}

const handleRename = () => {
  // TODO: Implement rename functionality
  closeContext()
}

const handleDelete = () => {
  // TODO: Implement delete functionality
  closeContext()
}

const closeContext = () => {
  showContextMenu.value = false
}

watch(showContextMenu, (newValue) => {
  if (!newValue) {
    selectedFolderId.value = ''
  }
})
</script>

<template>
  <div class="folders-grid body">
    <FolderCard
      v-for="folder in folders"
      :key="folder.id"
      :folder="folder"
      :class="{ selected: folder.id === selectedFolderId }"
      @opencontext="(e) => handleContextMenu(e, folder.id)"
    />
  </div>

  <ContextMenu v-model="showContextMenu" ref="contextMenuRef">
    <div class="menu-item" @click="handleRename">
      <span>Rename</span>
    </div>
    <div class="menu-divider" />
    <div class="menu-item" @click="handleDelete">
      <span>Delete</span>
    </div>
  </ContextMenu>
</template>

<style>
/* .body {
  flex: none !important;
} */

.folders-grid {
  display: grid;
  grid-gap: 16px;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
}
</style>
