<script setup lang="ts">
import MyButton from '@/components/common/MyButton.vue'
import TouchRipple from '@/components/common/TouchRipple.vue'
import IconArrowRight from '@/components/icons/IconRight.vue'
import { useSettingsStore } from '@/stores/settings'
import { useThemeStore } from '@/stores/theme'
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'

const currentSlide = ref(0)
const router = useRouter()

const themeStore = useThemeStore()

const selectedLanguage = ref('en')
const selectedTheme = ref<'light' | 'dark' | 'system'>('system')

const languages = [
  { code: 'en', name: 'English' },
  { code: 'ar', name: 'العربية' },
]

const themes: themesType[] = [
  { id: 'light', name: 'Light' },
  { id: 'dark', name: 'Dark' },
  { id: 'system', name: 'System' },
]

type themesType = { id: themeType; name: string }
type themeType = 'light' | 'dark' | 'system'

const slides = [
  {
    title: 'Welcome to Wasfa',
    description:
      'Your ultimate recipe companion! Organize, create, and share your favorite recipes with ease. Get started on your culinary journey today.',
    image: '/src/assets/logo-no-bg.svg',
    template: 'welcome',
  },
  {
    title: 'Customize Your Experience',
    description: 'Choose your preferred settings to make Wasfa truly yours.',
    template: 'preferences',
  },
  {
    title: 'Get Started',
    description: 'Import our collection of sample recipes to explore the features of Wasfa.',
    template: 'import',
  },
]

const settingsStore = useSettingsStore()
const nextSlide = () => {
  if (currentSlide.value < slides.length - 1) {
    currentSlide.value++
  } else {
    settingsStore.settings.firstVisit = false
    router.push('/')
  }
}

const previousSlide = () => {
  if (currentSlide.value > 0) {
    currentSlide.value--
  }
}

watch(selectedTheme, () => {
  themeStore.setTheme(selectedTheme.value)
})

const nextSlideOnKey = (e: KeyboardEvent) => {
  if (e.key === 'Enter' || e.key === 'Space' || e.key === 'ArrowRight') {
    nextSlide()
  }
}

const previousSlideOnKey = (e: KeyboardEvent) => {
  if (e.key === 'ArrowLeft') {
    previousSlide()
  }
}

onMounted(() => {
  window.addEventListener('keydown', nextSlideOnKey)
  window.addEventListener('keydown', previousSlideOnKey)
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', nextSlideOnKey)
  window.removeEventListener('keydown', previousSlideOnKey)
})
</script>

<template>
  <div class="welcome-layout">
    <div class="slides-container">
      <div
        v-for="(slide, index) in slides"
        :key="index"
        class="slide"
        :class="{ active: currentSlide === index }"
      >
        <img v-if="slide.image" :src="slide.image" :alt="slide.title" class="slide-image" />
        <h1>{{ slide.title }}</h1>
        <p>{{ slide.description }}</p>

        <!-- Language and Theme Selection -->
        <div v-if="slide.template === 'preferences'" class="preferences-container">
          <div class="preference-section">
            <h3>Language</h3>
            <div class="language-options">
              <MyButton
                v-for="lang in languages"
                :key="lang.code"
                :class="[lang.code, { secondary: lang.code != selectedLanguage }]"
                @click="selectedLanguage = lang.code"
              >
                {{ lang.name }}
              </MyButton>
            </div>
          </div>

          <div class="preference-section">
            <h3>Theme</h3>
            <div class="theme-options">
              <touch-ripple
                v-for="theme in themes"
                :class="[theme.id, { active: theme.id === selectedTheme }]"
                class="theme"
                @click="selectedTheme = theme.id"
                :color="'#ccc'"
              >
                <span>{{ theme.name }}</span>
              </touch-ripple>
            </div>
          </div>
        </div>

        <!-- Import Mock Recipes -->
        <div v-if="slide.template === 'import'" class="import-container">
          <button class="import-button">Import Mock Recipes</button>
        </div>
      </div>
    </div>
    <div class="navigation">
      <div class="dots">
        <span
          v-for="(slide, index) in slides"
          :key="index"
          class="dot"
          :class="{ active: currentSlide === index }"
          @click="currentSlide = index"
        ></span>
      </div>
      <div>
        <my-button v-if="currentSlide > 0" class="secondary back-btn" @click="previousSlide">
          Back
        </my-button>
        <my-button @click="nextSlide" class="secondary">
          {{ currentSlide === slides.length - 1 ? 'No thanks' : 'Next' }}
          <template #icon><IconArrowRight /></template>
        </my-button>
      </div>
    </div>
  </div>
</template>

<style>
.welcome-layout {
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background-color: var(--color-background);
}

.slides-container {
  flex: 1;
  width: 100%;
  max-width: 800px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.slide {
  position: absolute;
  width: 100%;
  text-align: center;
  display: none;
  transition: opacity 0.3s ease-in-out;
}

.slide.active {
  display: block;
  animation: slide 0.2s cubic-bezier(0.075, 0.82, 0.165, 1);
}

@keyframes slide {
  from {
    opacity: 0;
    transform: translateX(50%);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.slide-image {
  --deg: 190deg;
  width: 200px;
  height: 200px;
  margin-bottom: 2rem;
  filter: invert(70%) sepia(100%) saturate(9999%) hue-rotate(201deg) brightness(140%) contrast(60%);
  background-color: var(--color-border);
  border: 5px solid var(--color-border);
  border-radius: 50%;
  opacity: 0.9;
}

.slide h1 {
  margin-bottom: 1rem;
  color: var(--color-heading);
  text-decoration: underline;
}

.slide p {
  color: var(--color-text);
  max-width: 600px;
  margin: 0 auto;
}

.navigation {
  width: 100%;
  max-width: 800px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem;
}

.dots {
  display: flex;
  gap: 0.5rem;
}

.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  cursor: pointer;
  background-color: var(--color-border);
  transition: background-color 0.3s ease-in-out;
}

.dot.active {
  background-color: var(--color-secondary);
}

.navigation > div {
  display: flex;
  gap: 1em;
  align-items: center;
  justify-content: center;
}

.navigation button {
  font-weight: var(--font-weight-bold);
  padding: 0.5em 1em;
}

.navigation .m3-button-content {
  display: flex;
  align-items: center;
  gap: 0.5em;
}

.navigation .back-btn {
  opacity: 0.6;
}

.preferences-container {
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  align-items: center;
}

.preference-section {
  text-align: center;
}

.preference-section h3 {
  margin-bottom: 1rem;
  color: var(--color-heading);
}

.language-options {
  display: flex;
  gap: 1rem;
  justify-content: center;
  align-items: center;
}

.theme-options {
  display: flex;
  gap: 1rem;
  justify-content: center;
  align-items: center;
}

.theme {
  --width: 100px;
  --height: 80px;

  width: var(--width);
  height: var(--height);
  border-radius: var(--border-radius);
  display: grid;
  place-content: center;
  cursor: pointer;
  user-select: none;
  box-shadow: var(--box-shadow);
  overflow: hidden;
}

.theme.active {
  border: 4px solid skyblue;
}

.theme.dark {
  background-color: var(--c-black-soft);
  color: var(--c-white);
}

.theme.light {
  background-color: var(--c-white-soft);
  color: var(--c-black);
}

.theme.system {
  background: linear-gradient(135deg, var(--c-white-soft) 50%, var(--c-black-soft) 50%);
  color: var(--c-white);
}

.theme.system span {
  mix-blend-mode: difference;
}

.import-container {
  margin-top: 2rem;
}
</style>
