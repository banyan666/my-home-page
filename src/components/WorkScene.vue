<script setup>
import { computed, nextTick, ref, watch } from 'vue'
import gsap from 'gsap'

const props = defineProps({ active: Boolean, projects: { type: Array, required: true } })
defineEmits(['open-project'])

const pageSize = 4
const currentPage = ref(0)
const switching = ref(false)
const projectGrid = ref(null)
const totalPages = computed(() => Math.max(1, Math.ceil(props.projects.length / pageSize)))
const maxPageIndex = computed(() => totalPages.value - 1)
const startIndex = computed(() => currentPage.value * pageSize)
const visibleProjects = computed(() => props.projects.slice(startIndex.value, startIndex.value + pageSize))
const visibleEnd = computed(() => Math.min(startIndex.value + pageSize, props.projects.length))
const visibleRange = computed(() => {
  if (!props.projects.length) return '00 / 00'
  const start = String(startIndex.value + 1).padStart(2, '0')
  const end = String(visibleEnd.value).padStart(2, '0')
  const total = String(props.projects.length).padStart(2, '0')
  return start === end ? `${start} / ${total}` : `${start}–${end} / ${total}`
})
const canGoPrevious = computed(() => currentPage.value > 0 && !switching.value)
const canGoNext = computed(() => currentPage.value < maxPageIndex.value && !switching.value)

watch(() => props.projects.length, () => {
  currentPage.value = Math.min(currentPage.value, maxPageIndex.value)
})

const switchProjects = (direction) => {
  const nextPage = Math.min(maxPageIndex.value, Math.max(0, currentPage.value + direction))
  if (nextPage === currentPage.value || switching.value) return

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reduceMotion) {
    currentPage.value = nextPage
    return
  }

  switching.value = true
  const outgoingCards = projectGrid.value?.querySelectorAll('.scene-project-card') || []
  const outgoingX = direction > 0 ? -32 : 32
  const incomingX = -outgoingX

  gsap.to(outgoingCards, {
    x: outgoingX,
    autoAlpha: 0,
    duration: 0.24,
    stagger: 0.025,
    ease: 'power2.in',
    onComplete: async () => {
      currentPage.value = nextPage
      await nextTick()
      const incomingCards = projectGrid.value?.querySelectorAll('.scene-project-card') || []
      gsap.fromTo(incomingCards,
        { x: incomingX, autoAlpha: 0 },
        {
          x: 0,
          autoAlpha: 1,
          duration: 0.48,
          stagger: 0.055,
          ease: 'power3.out',
          clearProps: 'transform,opacity,visibility',
          onComplete: () => { switching.value = false },
        },
      )
    },
  })
}
</script>

<template>
  <section class="scene-page page-work" data-page="1" :aria-hidden="!active" aria-labelledby="work-title">
    <div class="work-layout">
      <header class="work-heading scene-reveal">
        <p class="scene-kicker">Selected projects</p>
        <h2 id="work-title">项目作品</h2>
        <p>参与开源社区，构建 WebGIS 与三维可视化工具，开发SDK与案例，以及开源项目。</p>
      </header>

      <div class="project-carousel">
        <div ref="projectGrid" class="project-grid scene-reveal">
          <article v-for="project in visibleProjects" :key="project.id" class="scene-project-card">
            <button type="button" @click="$emit('open-project', project)">
              <div class="scene-project-image">
                <img :src="project.image" :alt="`${project.title} 项目封面`" />
                <span>VIEW CASE ↗</span>
              </div>
              <div class="scene-project-info">
                <span>{{ project.number }} / {{ project.type }}</span>
                <h3>{{ project.title }}</h3>
                <p>{{ project.description }}</p>
                <div><i v-for="tech in project.tech.slice(0, 3)" :key="tech">{{ tech }}</i></div>
              </div>
            </button>
          </article>
        </div>

        <span class="project-window" aria-live="polite">
          {{ visibleRange }}
        </span>
        <button class="project-nav project-nav-prev" type="button" :disabled="!canGoPrevious" aria-label="显示上一页项目" @click="switchProjects(-1)">←</button>
        <button class="project-nav project-nav-next" type="button" :disabled="!canGoNext" aria-label="显示下一页项目" @click="switchProjects(1)">→</button>
      </div>
    </div>
  </section>
</template>
