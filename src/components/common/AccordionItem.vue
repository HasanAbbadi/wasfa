<template>
  <div class="accordion-item">
    <touch-ripple>
      <button
        class="accordion-header"
        :class="{ 'is-active': isOpen }"
        @click="toggle"
        :aria-expanded="isOpen"
        :aria-controls="itemId"
      >
        <slot name="header"></slot>
        <span class="accordion-icon" :class="{ 'is-open': isOpen }">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </span>
      </button>
    </touch-ripple>
    <transition
      name="accordion"
      @enter="startTransition"
      @leave="startTransition"
      @after-enter="endTransition"
      @after-leave="endTransition"
    >
      <div
        v-show="isOpen"
        class="accordion-content"
        :id="itemId"
        role="region"
        :aria-labelledby="headerId"
      >
        <div class="accordion-content-inner">
          <slot></slot>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import TouchRipple from '@/components/common/TouchRipple.vue'
import { computed, inject, ref, type Ref } from 'vue'

defineProps<{
  modelValue?: boolean
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()

const uuidv4 = () => {
  return 'xxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0
    const v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

const itemId = ref(`accordion-${uuidv4()}`)
const headerId = ref(`accordion-header-${uuidv4()}`)

const accordionGroup = inject('accordionGroup') as {
  openItems: Ref<Set<string>>
  toggleItem: (id: string) => void
  multiple: boolean
}

const isOpen = computed(() => accordionGroup.openItems.value?.has(itemId.value))

const toggle = () => {
  accordionGroup.toggleItem(itemId.value)
  emit('update:modelValue', isOpen.value)
}

const startTransition = (el: Element) => {
  const content = el as HTMLElement
  content.style.overflow = 'hidden'
  if (isOpen.value) {
    content.style.height = '0'
    void content.offsetHeight // Force reflow
    content.style.height = `${content.scrollHeight}px`
  } else {
    content.style.height = `${content.scrollHeight}px`
    void content.offsetHeight // Force reflow
    content.style.height = '0'
  }
}

const endTransition = (el: Element) => {
  const content = el as HTMLElement
  content.style.height = ''
  content.style.overflow = ''
}
</script>

<style scoped>
.accordion-item:not(:last-child) {
  border-bottom: 1px solid var(--color-border);
}

.v-touch-ripple {
  border-radius: 0.5rem;
}

.accordion-header {
  all: unset;
  box-sizing: border-box;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background: transparent;
  border: none;
  cursor: pointer;
  text-align: left;
  font-weight: 500;
  margin: 0;
  border-radius: 0 !important;
}

/* 
.accordion-header:hover {
  background-color: #f8fafc;
} */

.accordion-icon {
  transition: transform 0.3s ease;
}

.accordion-icon.is-open {
  transform: rotate(180deg);
}

.accordion-content {
  overflow: hidden;
  transition: height 0.3s ease;
}

.accordion-content-inner {
  padding: 1rem;
  padding-top: 0;
}

/* Transition classes */
.accordion-enter-active,
.accordion-leave-active {
  transition: height 0.3s ease;
  overflow: hidden;
}

.accordion-enter-from,
.accordion-leave-to {
  height: 0 !important;
}
</style>
