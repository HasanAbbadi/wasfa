<script setup lang="ts">
import { type PropType } from 'vue'
import type { folderType } from '@/types'
import IconFolder from '@/components/icons/IconFolder.vue'
import IconMoreVertical from '../icons/IconMoreVertical.vue'
import MyButton from '@/components/common/MyButton.vue'
import TouchRipple from '@/components/common/TouchRipple.vue'
defineProps({
  folder: {
    type: Object as PropType<folderType>,
    required: true,
  },
})

const emit = defineEmits(['opencontext', 'openfolder'])
</script>

<template>
  <touch-ripple
    @click="emit('openfolder', folder.id)"
    @contextmenu="emit('opencontext', $event, folder.id)"
    class="folder-card"
  >
    <div class="folder-card__right">
      <IconFolder />
      <span class="folder-card__name">
        {{ folder.name }}
      </span>
    </div>
    <MyButton @click.stop="emit('opencontext', $event, folder.id)" class="simple menu-btn">
      <IconMoreVertical />
    </MyButton>
  </touch-ripple>
</template>

<style>
.folder-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  border-radius: var(--radius-xm);
  overflow: hidden;
  padding: 12px 0.8rem;
  max-width: 300px;
  cursor: pointer;
  background-color: var(--color-background-mute);
  user-select: none;
}

.folder-card__right {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.folder-card.selected {
  background-color: var(--color-accent);
  color: var(--color-secondary);
}

.menu-btn {
  border-radius: 50%;
  --color-secondary: var(--color-text);
}

.menu-btn .m3-button-content {
  padding: 0.125rem 0.25rem;
}

.menu-btn svg {
  width: 1rem;
  height: 1rem;
}
</style>
