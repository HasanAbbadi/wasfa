<!-- Rewritten in vue 3 from: https://github.surmon.me/vue-touch-ripple -->

<template>
  <div
    class="v-touch-ripple"
    ref="element"
    @mousedown="handleMouseDown"
    @mouseup="handleMouseUp"
    @mouseleave="handleMouseLeave"
  >
    <slot></slot>
    <TransitionGroup
      name="ripple"
      tag="div"
      class="ripples"
      @before-enter="onBeforeEnter"
      @after-leave="onAfterLeave"
    >
      <RippleItem
        v-for="ripple in ripples"
        :key="ripple.id"
        :id="ripple.id"
        :size="ripple.size"
        :top="ripple.top"
        :left="ripple.left"
        :color="config.color ?? 'var(--ripple-color)'"
        :opacity="config.opacity"
        :duration="config.duration"
        :transition="config.transition"
        @start="handleRippleStart"
        @end="handleRippleEnd"
      />
    </TransitionGroup>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  reactive,
  computed,
  onBeforeUnmount,
  onMounted,
  nextTick,
  h,
} from 'vue'

interface Ripple {
  id: number
  size: number
  left: number
  top: number
}

interface Props {
  color?: string
  opacity?: number
  duration?: number
  transition?: string
  keepLastRipple?: boolean
}

// @ts-expect-error color is defined as css variable.
const DEFAULT_CONFIG: Required<Props> = {
  opacity: 1,
  duration: 400,
  transition: 'cubic-bezier(0.4, 0, 0.2, 1)',
  keepLastRipple: true,
}

const RippleItem = defineComponent({
  name: 'RippleItem',
  props: {
    id: {
      type: Number,
      required: true,
    },
    size: {
      type: Number,
      required: true,
    },
    top: {
      type: Number,
      required: true,
    },
    left: {
      type: Number,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    opacity: {
      type: Number,
      required: true,
    },
    transition: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
  },
  emits: {
    start: (id: number) => Number.isInteger(id),
    end: (id: number) => Number.isInteger(id),
  },
  setup(props, { emit }) {
    let scaleTimer: number | null = null
    const scale = ref(0)

    onMounted(() => {
      nextTick(() => {
        scaleTimer = window.setTimeout(() => {
          scale.value = 1
        }, 0)
      })
    })

    onBeforeUnmount(() => {
      if (scaleTimer) {
        window.clearTimeout(scaleTimer)
        scaleTimer = null
      }
    })

    return () =>
      h('div', {
        class: 'ripple-item',
        'data-id': props.id,
        onTransitionstart: () => emit('start', props.id),
        onTransitionend: () => emit('end', props.id),
        style: {
          opacity: props.opacity,
          top: `${props.top}px`,
          left: `${props.left}px`,
          width: `${props.size}px`,
          height: `${props.size}px`,
          transform: `scale(${scale.value})`,
          'z-index': props.id,
          'background-color': props.color,
          'transition-property': 'transform, opacity',
          'transition-duration': `${props.duration}ms, 300ms`,
          'transition-timing-function': `${props.transition}, linear`,
        },
      })
  },
})

export default defineComponent({
  name: 'VueTouchRipple',
  components: {
    RippleItem,
  },
  props: {
    color: {
      type: String,
      default: undefined,
    },
    opacity: {
      type: Number,
      default: undefined,
    },
    duration: {
      type: Number,
      default: undefined,
    },
    transition: {
      type: String,
      default: undefined,
    },
    keepLastRipple: {
      type: Boolean,
      default: undefined,
    },
  },
  emits: ['touch', 'click', 'start', 'end'],
  setup(props, { emit }) {
    const element = ref<HTMLElement | null>(null)
    const ripples = reactive<Ripple[]>([])
    const lastRippleID = ref(0)
    const state = reactive<{
      active: boolean
      cleanWhenMouseUp: boolean
    }>({
      active: true,
      cleanWhenMouseUp: false,
    })

    const config = computed<Required<Props>>(() => ({
      color: props.color ?? DEFAULT_CONFIG.color,
      opacity: props.opacity ?? DEFAULT_CONFIG.opacity,
      duration: props.duration ?? DEFAULT_CONFIG.duration,
      transition: props.transition ?? DEFAULT_CONFIG.transition,
      keepLastRipple: props.keepLastRipple ?? DEFAULT_CONFIG.keepLastRipple,
    }))

    const clearRipples = () => {
      ripples.length = 0
    }

    const getRippleSize = (positionX: number, positionY: number) => {
      const width = element.value!.clientWidth
      const height = element.value!.clientHeight

      const square = (x: number) => Math.pow(x, 2)
      const coordinates = [
        [0, 0],
        [width, 0],
        [0, height],
        [width, height],
      ].map((coordinate) => {
        return Math.sqrt(square(coordinate[0] - positionX) + square(coordinate[1] - positionY))
      })

      const maxCoordinate = Math.max(...coordinates)
      const size = maxCoordinate * 2
      const left = positionX - size / 2
      const top = positionY - size / 2

      return { left, top, size: Math.ceil(size) }
    }

    const handleMouseDown = (event: MouseEvent) => {
      if (event.button === 0) {
        state.active = true
        const { top: innerY, left: innerX } = element.value!.getBoundingClientRect()
        const { clientX: layerX, clientY: layerY } = event
        const positionX = layerX - innerX
        const positionY = layerY - innerY
        const { size, left, top } = getRippleSize(positionX, positionY)
        ripples.push({
          id: (lastRippleID.value += 1),
          size,
          left,
          top,
        })
        emit('touch', event)
      }
    }

    const handleMouseUp = (event: MouseEvent) => {
      if (event.button === 0) {
        state.active = false
        if (state.cleanWhenMouseUp) {
          clearRipples()
        }
        emit('click', event)
      }
    }

    const handleMouseLeave = () => {
      state.active = false
      if (state.cleanWhenMouseUp) {
        clearRipples()
      }
    }

    const handleRippleStart = (id: number) => {
      emit('start', id)
    }

    const handleRippleEnd = (id: number) => {
      const targetIndex = ripples.findIndex((ripple) => ripple.id === id)
      if (targetIndex < 0) return

      if (config.value.keepLastRipple) {
        if (state.active && targetIndex === ripples.length - 1) {
          state.cleanWhenMouseUp = true
          return
        }
      }

      state.cleanWhenMouseUp = false
      ripples.splice(targetIndex, 1)
      emit('end', id)
    }

    // @ts-expect-error idk element stuff
    const onBeforeEnter = (element) => {
      emit('start', Number(element.dataset.id))
    }
    // @ts-expect-error idk element stuff
    const onAfterLeave = (element) => {
      emit('end', Number(element.dataset.id))
    }

    onBeforeUnmount(() => {
      clearRipples()
    })

    return {
      element,
      ripples,
      config,
      handleMouseDown,
      handleMouseUp,
      handleMouseLeave,
      handleRippleStart,
      handleRippleEnd,
      onBeforeEnter,
      onAfterLeave,
    }
  },
})
</script>

<style scoped>
.v-touch-ripple {
  --ripple-color: rgba(31, 31, 31, 0.1);
}

[data-theme='dark'] .v-touch-ripple {
  --ripple-color: rgba(227, 227, 227, 0.1);
}

.v-touch-ripple {
  position: relative;
}

.v-touch-ripple :not(:last-child) {
  z-index: 1;
}

.v-touch-ripple > .ripples {
  z-index: 0;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: block;
  overflow: hidden;
  pointer-events: none;
}

.v-touch-ripple > .ripples > .ripple-item {
  display: block;
  position: absolute;
  border-radius: 50%;
}

.v-touch-ripple > .ripples > .ripple-item.ripple-leave-to {
  opacity: 0 !important;
}
</style>
