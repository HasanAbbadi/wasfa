<script setup lang="ts">
import { ref, watch, onMounted, nextTick } from 'vue'
import IconDoubleLeftArrow from '@/components/icons/IconDoubleLeftArrow.vue'
import IconDoubleRightArrow from '@/components/icons/IconDoubleRightArrow.vue'
import BottomSheet from './BottomSheet.vue'
import { usePanelStore } from '@/stores/panel'
import { storeToRefs } from 'pinia'

const panelStore = usePanelStore()
const { isExpanded, isMobile } = storeToRefs(panelStore)
const sheet = ref()
// Flag to track if the state change is due to the sheet's close event
const isInternalUpdate = ref(false)

const expand = () => {
  panelStore.expand()
  if (isMobile.value) sheet.value.open()
}

const collapse = () => {
  if (isMobile.value) sheet.value.close()
}

// Handle sheet close event
const onSheetClose = () => {
  isInternalUpdate.value = true
  panelStore.collapse()
  // Reset the flag after the state change has been processed
  nextTick(() => {
    isInternalUpdate.value = false
  })
}

// Watch for store changes, skip if triggered by internal update
watch(isExpanded, (value) => {
  if (isInternalUpdate.value) return
  if (value) expand()
  else collapse()
})
onMounted(() => {
  isMobile.value = window.innerWidth < 768

  window.addEventListener('resize', () => {
    isMobile.value = window.innerWidth < 768
  })
})
</script>

<template>
  <BottomSheet v-if="isMobile" class="panel" ref="sheet" @close="onSheetClose" :snapPoints="[1]">
    <div class="content">
      <slot />
    </div>
  </BottomSheet>

  <div v-else id="side-panel" class="panel" :class="{ expanded: isExpanded }">
    <div class="content">
      <slot />
    </div>

    <div class="toggle-expanded" @click="isExpanded = !isExpanded">
      <IconDoubleRightArrow v-if="isExpanded" />
      <IconDoubleLeftArrow v-else />
    </div>
  </div>
</template>

<style>
#side-panel {
  position: fixed;
  display: flex;
  justify-content: space-around;
  background-color: var(--color-background-soft);
  border-radius: var(--border-radius) var(--border-radius) 0 0;
  padding: 10px;
  z-index: 90;
  user-select: none;
  transition: width 0.3s ease;
  /* TODO: Fix overflow hides the psuedo curve */
  /* overflow-y: auto;
  overflow-x: visible; */
}

#side-panel:has(.content *) {
  width: 450px;
}

#side-panel:not(.expanded) .content {
  display: none;
}

#side-panel:not(.expanded) {
  width: 60px;
}

#side-panel .toggle-expanded {
  position: absolute;
  bottom: 0.5rem;
  inset-inline-start: 1.5rem;
}

#side-panel .toggle-expanded {
  align-self: flex-end;
  margin-top: auto;
  cursor: pointer;
  opacity: 0.7;
}

#side-panel .toggle-expanded svg {
  width: 1.5em;
  height: 1.5em;
}

#side-panel:not(:has(.content *)) .toggle-expanded {
  display: none;
}

#side-panel {
  bottom: 0;
  right: 0;
  height: 100%;
}

#side-panel {
  position: relative;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  top: 0;
  height: 100%;
  border-radius: 0;
  gap: 1rem;
  padding-inline: 1.2rem;
}

#side-panel .content {
  flex: 1;
  margin: auto;
  margin-top: 1.5em;
  width: 100%;
}

@media (max-width: 1024px) {
  #side-panel {
    display: none;
  }
}
</style>
