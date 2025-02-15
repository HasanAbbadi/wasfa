<template>
  <div
    class="tabs-container"
    @touchstart="handleTouchStart"
    @touchmove="handleTouchMove"
    @touchend="handleTouchEnd"
  >
    <div class="tabs-header">
      <button
        v-for="(tab, index) in tabs"
        :key="index"
        :class="['tab-button', { active: activeIndex === index }]"
        @click="selectTab(index)"
      >
        {{ tab.props.name }}
      </button>
    </div>
    <div class="tabs-content">
      <div
        class="tabs-content-inner"
        :style="{
          width: `${tabs.length * 100}%`,
          transform: `translateX(-${activeIndex * (100 / tabs.length)}%)`,
          transition: isTransitioning ? 'transform 0.3s ease-out' : 'none',
        }"
      >
        <component v-for="(tab, index) in tabs" :key="index" :is="tab" class="tab-component" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, useSlots } from 'vue'

const slots = useSlots()
const activeIndex = ref(0)
const touchStartX = ref(0)
const isTransitioning = ref(false)

const tabs = computed(() => {
  // @ts-expect-error shut up ts
  return slots.default ? slots.default() : []
})

const selectTab = (index: number) => {
  if (index >= 0 && index < tabs.value.length) {
    isTransitioning.value = true
    activeIndex.value = index
    setTimeout(() => {
      isTransitioning.value = false
    }, 300)
  }
}

const handleTouchStart = (e: TouchEvent) => {
  touchStartX.value = e.touches[0].clientX
  isTransitioning.value = false
}

const handleTouchMove = (e: TouchEvent) => {
  if (!touchStartX.value) return
  const currentX = e.touches[0].clientX
  const diff = currentX - touchStartX.value

  if (Math.abs(diff) > 10) {
    e.preventDefault()
  }
}

const handleTouchEnd = (e: TouchEvent) => {
  if (!touchStartX.value) return

  const currentX = e.changedTouches[0].clientX
  const diff = currentX - touchStartX.value
  const containerWidth = (e.currentTarget as HTMLElement)?.offsetWidth
  const percentageMoved = (diff / containerWidth) * 100

  if (Math.abs(percentageMoved) > 25) {
    if (percentageMoved > 0 && activeIndex.value > 0) {
      selectTab(activeIndex.value - 1)
    } else if (percentageMoved < 0 && activeIndex.value < tabs.value.length - 1) {
      selectTab(activeIndex.value + 1)
    }
  }

  touchStartX.value = 0
}
</script>

<style scoped>
.tabs-container {
  width: 100%;
  overflow: hidden;
}

.tabs-header {
  display: flex;
  gap: 1px;
  border-bottom: 1px solid var(--color-border);
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}

.tab-button {
  padding: 0.5rem 1rem;
  border: 2px solid transparent;
  background: none;
  cursor: pointer;
  white-space: nowrap;
  border-radius: 0;
  box-shadow: none;
  color: var(--color-text);
  flex: 1;
}

.tab-button.active {
  border-bottom: 2px solid var(--color-secondary);
  color: var(--color-secondary);
}

.tabs-content {
  width: 100%;
  overflow: hidden;
}

.tabs-content-inner {
  display: flex;
}

.tab-component {
  flex: 1 0 100%;
  width: 100%;
}
</style>
