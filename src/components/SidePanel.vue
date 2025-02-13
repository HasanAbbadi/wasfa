<script setup lang="ts">
import { ref, watch, onMounted, onBeforeUnmount } from 'vue'
import IconDoubleLeftArrow from '@/components/icons/IconDoubleLeftArrow.vue'
import IconDoubleRightArrow from '@/components/icons/IconDoubleRightArrow.vue'
const isExpanded = ref(true)
let observer: MutationObserver

const expand = () => {
  isExpanded.value = true
}

watch(isExpanded, (value) => {
  localStorage.setItem('side-panel-expanded', value.toString())
})

onMounted(() => {
  const storedValue = localStorage.getItem('side-panel-expanded')
  if (storedValue) {
    isExpanded.value = storedValue === 'true'
  }

  observer = new MutationObserver(expand)
  const el = document.querySelector('#side-panel .content')

  if (el) observer.observe(el, { childList: true, subtree: true })
})

onBeforeUnmount(() => {
  observer.disconnect()
})
</script>

<template>
  <div id="side-panel" :class="{ expanded: isExpanded }">
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
