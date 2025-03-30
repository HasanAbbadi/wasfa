<template>
  <div
    class="node"
    :class="{
      'is-folder': hasChildren,
      'drag-over-inside': isDragOverInside,
      'drag-over-before': isDragOverBefore,
      'drag-over-after': isDragOverAfter,
    }"
    :style="{ paddingLeft: `${depth * 20}px` }"
    draggable="true"
    @dragstart="handleDragStart"
    @dragover="handleDragOver"
    @drop="handleDrop"
    @dragenter="handleDragEnter"
    @dragleave="handleDragLeave"
  >
    <div class="drop-indicator before" :class="{ active: isDragOverBefore }"></div>

    <div class="node-content" @click="handleClick" :class="{ 'drag-over': isDragOverInside }">
      <button v-if="hasChildren" class="toggle-btn" @click.stop="toggleExpanded">
        {{ expanded ? '▼' : '▶' }}
      </button>

      <span class="node-icon">
        {{ hasChildren ? '📁' : '📄' }}
      </span>

      <span class="node-label">{{ node.name }}</span>
    </div>

    <div class="drop-indicator after" :class="{ active: isDragOverAfter }"></div>

    <div v-if="hasChildren && expanded" class="node-children">
      <TreeNode
        v-for="child in node.children"
        :key="child.id"
        :node="child"
        :depth="depth + 1"
        @node-click="$emit('node-click', $event)"
        @drop="$emit('drop', $event)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

interface TreeNode {
  id: string
  name: string
  children?: TreeNode[]
}

const props = defineProps({
  node: {
    type: Object as () => TreeNode,
    required: true,
  },
  depth: {
    type: Number,
    default: 0,
  },
})

const emit = defineEmits(['node-click', 'drop'])

const expanded = ref(true)
const isDragOverInside = ref(false)
const isDragOverBefore = ref(false)
const isDragOverAfter = ref(false)
const hasChildren = computed(() => props.node.children && props.node.children.length > 0)

const toggleExpanded = () => {
  expanded.value = !expanded.value
}

const handleClick = () => {
  emit('node-click', props.node)
}

const handleDragStart = (event: DragEvent) => {
  if (!event.dataTransfer) return
  event.dataTransfer.setData('text/plain', props.node.id)
  event.dataTransfer.effectAllowed = 'move'
}

const getDragPosition = (event: DragEvent): 'before' | 'after' | 'inside' => {
  const rect = (event.currentTarget as HTMLElement).getBoundingClientRect()
  const y = event.clientY - rect.top

  // Top 25% = before, bottom 25% = after, middle 50% = inside
  if (y < rect.height * 0.25) return 'before'
  if (y > rect.height * 0.75) return 'after'
  return 'inside'
}

const handleDragEnter = (event: DragEvent) => {
  event.preventDefault()
  const position = getDragPosition(event)
  isDragOverBefore.value = position === 'before'
  isDragOverInside.value = position === 'inside'
  isDragOverAfter.value = position === 'after'
}

const handleDragOver = (event: DragEvent) => {
  event.preventDefault()
  if (!event.dataTransfer) return

  const position = getDragPosition(event)
  isDragOverBefore.value = position === 'before'
  isDragOverInside.value = position === 'inside'
  isDragOverAfter.value = position === 'after'

  event.dataTransfer.dropEffect = 'move'
}

const handleDragLeave = (event: DragEvent) => {
  const rect = (event.currentTarget as HTMLElement).getBoundingClientRect()
  const isOutside =
    event.clientX < rect.left ||
    event.clientX >= rect.right ||
    event.clientY < rect.top ||
    event.clientY >= rect.bottom

  if (isOutside) {
    isDragOverBefore.value = false
    isDragOverInside.value = false
    isDragOverAfter.value = false
  }
}

const handleDrop = (event: DragEvent) => {
  event.preventDefault()
  if (!event.dataTransfer) return

  const draggedNodeId = event.dataTransfer.getData('text/plain')
  if (draggedNodeId === props.node.id) return

  const position = getDragPosition(event)
  emit('drop', draggedNodeId, props.node.id, position)

  isDragOverBefore.value = false
  isDragOverInside.value = false
  isDragOverAfter.value = false
}
</script>

<style scoped>
.node {
  user-select: none;
  position: relative;
}

.node-content {
  display: flex;
  align-items: center;
  padding: 0.5rem;
  border-radius: 4px;
  cursor: pointer;
  position: relative;
}

.node-content:hover {
  background-color: var(--color-border);
}

.node-content.drag-over {
  background-color: var(--color-border);
  outline: 2px dashed var(--color-border-hover);
}

.drop-indicator {
  position: absolute;
  left: 0;
  right: 0;
  height: 2px;
  background: transparent;
  pointer-events: none;
}

.drop-indicator.before {
  top: 0;
  transform: translateY(-50%);
}

.drop-indicator.after {
  bottom: 0;
  transform: translateY(50%);
}

.drop-indicator.active {
  background: var(--color-primary);
}

.toggle-btn {
  background: none;
  border: none;
  padding: 0 4px;
  cursor: pointer;
  font-size: 0.8rem;
}

.node-icon {
  margin-right: 0.5rem;
}

.node-children {
  margin-left: 1rem;
}

.is-folder > .node-content {
  font-weight: 500;
}
</style>
