<template>
  <div class="tree-view">
    <div class="tree-node" v-for="node in nodes" :key="node.id" :data-node-id="node.id">
      <TreeNode :node="node" :depth="0" @node-click="handleNodeClick" @drop="handleDrop" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'
import TreeNode from '@/components/home/TreeNode.vue'

interface TreeNode {
  id: string
  name: string
  children?: TreeNode[]
}

const props = defineProps({
  // Initial tree data
  nodes: {
    type: Array as () => TreeNode[],
    required: true,
  },
})

const emit = defineEmits(['update:nodes', 'node-click'])

const handleNodeClick = (node: TreeNode) => {
  emit('node-click', node)
}

const handleDrop = (
  draggedNodeId: string,
  targetNodeId: string,
  position: 'before' | 'after' | 'inside',
) => {
  const updatedNodes = JSON.parse(JSON.stringify(props.nodes)) as TreeNode[]
  let draggedNode: TreeNode | null = null
  let draggedNodeParent: TreeNode[] | null = null
  let targetNode: TreeNode | null = null
  let targetNodeParent: TreeNode[] | null = null

  const findNodes = (nodes: TreeNode[], parent: TreeNode[] | null = null) => {
    for (let i = 0; i < nodes.length; i++) {
      if (nodes[i].id === draggedNodeId) {
        draggedNode = nodes[i]
        draggedNodeParent = parent || updatedNodes
      }
      if (nodes[i].id === targetNodeId) {
        targetNode = nodes[i]
        targetNodeParent = parent || updatedNodes
      }
      if (nodes[i].children) {
        findNodes(nodes[i].children, nodes[i].children)
      }
    }
  }

  findNodes(updatedNodes)

  if (!draggedNode || !targetNode || !draggedNodeParent) return

  // Remove dragged node from its current position
  const draggedIndex = draggedNodeParent.findIndex((n) => n.id === draggedNodeId)
  draggedNodeParent.splice(draggedIndex, 1)

  // Insert node at new position
  if (position === 'inside' && targetNode) {
    if (!targetNode.children) {
      targetNode.children = []
    }
    targetNode.children.push(draggedNode)
  } else if (targetNodeParent) {
    const targetIndex = targetNodeParent.findIndex((n) => n.id === targetNodeId)
    const insertIndex = position === 'after' ? targetIndex + 1 : targetIndex
    targetNodeParent.splice(insertIndex, 0, draggedNode)
  }

  emit('update:nodes', updatedNodes)
}
</script>

<style scoped>
.tree-view {
  padding: 1rem;
}

.tree-node {
  margin: 0.25rem 0;
}
</style>
