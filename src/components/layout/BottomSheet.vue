<template>
  <div class="bottom-sheet-container">
    <div v-if="isOpen" class="backdrop" @click="close"></div>

    <div
      ref="sheet"
      class="bottom-sheet"
      :class="{ dragging: isDragging }"
      :style="{
        transform: `translateY(${100 - currentPosition * 100}%)`,
        bottom: '0',
        transition: `transform ${isDragging ? '0s' : '0.3s'} cubic-bezier(0.2, 0, 0, 1)`,
      }"
      @mousedown="startDrag"
      @touchstart.passive="handleTouchStart"
    >
      <div class="handle-area" @mousedown="startDrag" @touchstart.prevent="startDrag">
        <div class="handle"></div>
      </div>

      <div class="content" ref="content">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  snapPoints: {
    type: Array,
    default: () => [0.3, 0.6, 1],
  },
  startPointIndex: {
    type: Number,
    default: 0,
  },
})

const emit = defineEmits(['open', 'close'])

const isOpen = ref(false)
const isDragging = ref(false)
const currentPosition = ref(0)
const startY = ref(0)
const startPosition = ref(0)
const sheet = ref(null)
const content = ref(null)
const touchIdentifier = ref(null)
const isContentScrolled = ref(false)

const maxHeight = computed(() => window.innerHeight)
const minSnapPoint = computed(() => Math.min(...props.snapPoints))

const closestSnapPoint = (position: number) => {
  return props.snapPoints.reduce((prev: number, curr: number) => {
    return Math.abs(curr - position) < Math.abs(prev - position) ? curr : prev
  })
}

const handleTouchStart = (e: TouchEvent) => {
  if (content.value.scrollTop > 0) {
    isContentScrolled.value = true
    return // Allow native scrolling
  }
  isContentScrolled.value = false
  startDrag(e)
}

// const handleMouseDown = (e: MouseEvent) => {
//   if (content.value.scrollTop > 0) return
//   startDrag(e)
// }

const startDrag = (e) => {
  const isHandleArea = (e.target as HTMLElement).closest('.handle-area') !== null

  // For mouse events, check content scroll position
  if (!isHandleArea && e.type !== 'touchstart' && content.value?.scrollTop > 0) {
    return
  }

  isDragging.value = true
  startY.value = e.touches ? e.touches[0].clientY : e.clientY
  startPosition.value = currentPosition.value
  touchIdentifier.value = e.touches ? e.touches[0].identifier : null

  if (e.touches) {
    document.addEventListener('touchmove', onDrag, { passive: false })
    document.addEventListener('touchend', endDrag)
  } else {
    document.addEventListener('mousemove', onDrag)
    document.addEventListener('mouseup', endDrag)
  }
}

const onDrag = (e: TouchEvent | MouseEvent) => {
  if (!isDragging.value) return

  const y = e.touches
    ? Array.from(e.touches).find((t) => t.identifier === touchIdentifier.value)?.clientY
    : e.clientY

  if (!y) return

  const delta = (startY.value - y) / maxHeight.value
  let newPosition = startPosition.value + delta

  // Constrain between 0 and 1
  newPosition = Math.min(Math.max(newPosition, minSnapPoint.value - 0.1), 1)
  currentPosition.value = newPosition
}

const endDrag = () => {
  isDragging.value = false
  const snapPosition = closestSnapPoint(currentPosition.value)

  // Close if dragged below lowest snap point threshold
  if (currentPosition.value < minSnapPoint.value) {
    close()
  } else {
    currentPosition.value = snapPosition
  }

  document.removeEventListener('mousemove', onDrag)
  document.removeEventListener('mouseup', endDrag)
  document.removeEventListener('touchmove', onDrag)
  document.removeEventListener('touchend', endDrag)
}

const open = (snapIndex: number) => {
  if (!snapIndex) snapIndex = props.startPointIndex

  isOpen.value = true
  currentPosition.value = props.snapPoints[snapIndex]
  window.location.hash = '#bottom-sheet'
  emit('open')
}

const close = () => {
  isOpen.value = false
  currentPosition.value = 0
  window.location.hash = ''
  emit('close')
}

const handleResize = () => {
  if (!isOpen.value) return
  currentPosition.value = closestSnapPoint(currentPosition.value)
}

const handleEscape = (event: KeyboardEvent) => {
  if (event.key === 'Escape') {
    close()
  }
}

const handleBackGesture = (event: HashChangeEvent) => {
  if (event.oldURL.includes('#bottom-sheet')) close()
}

onMounted(() => {
  window.addEventListener('resize', handleResize)
  window.addEventListener('keydown', handleEscape)
  window.addEventListener('hashchange', handleBackGesture)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
  window.removeEventListener('keydown', handleEscape)
  window.removeEventListener('hashchange', handleBackGesture)
})

defineExpose({
  open,
  close,
})
</script>

<style scoped>
.bottom-sheet-container {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 1000;
}

.backdrop {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.4);
  pointer-events: all;
}

.bottom-sheet {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: var(--color-background-soft);
  border-radius: 28px 28px 0 0;
  box-shadow: 0 24px 28px rgba(0, 0, 0, 0.24);
  max-height: 90vh;
  pointer-events: all;
  touch-action: none;
}

.handle-area {
  padding: 16px 0;
  display: flex;
  justify-content: center;
  cursor: grab;
  touch-action: none;
}

.handle {
  width: 60px;
  height: 4px;
  background: var(--color-text);
  border-radius: 2px;
}

.content {
  overflow-y: auto;
  -webkit-overflow-scrolling: touch; /* For smooth scrolling on iOS */
  touch-action: pan-y;
  max-height: calc(90vh - 60px);
  padding: 0 16px 16px;
}

.dragging {
  cursor: grabbing;
  transition: none !important;
}
</style>
