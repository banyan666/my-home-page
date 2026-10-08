<script setup>
import { nextTick, onBeforeUnmount, watch } from 'vue'
import gsap from 'gsap'

const props = defineProps({ project: { type: Object, default: null } })
const emit = defineEmits(['close'])

const onKeydown = (event) => {
  if (event.key === 'Escape') emit('close')
}

watch(
  () => props.project,
  async (project) => {
    document.body.classList.toggle('modal-open', Boolean(project))
    if (project) {
      window.addEventListener('keydown', onKeydown)
      await nextTick()
      document.querySelector('.project-modal-close')?.focus({ preventScroll: true })
    } else {
      window.removeEventListener('keydown', onKeydown)
    }
  },
)

onBeforeUnmount(() => {
  document.body.classList.remove('modal-open')
  window.removeEventListener('keydown', onKeydown)
})

const enter = (el, done) => {
  gsap.timeline({ onComplete: done })
    .fromTo(el, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.28 })
    .fromTo(el.querySelector('.project-modal-panel'), { y: 44, scale: 0.98 }, { y: 0, scale: 1, duration: 0.55, ease: 'power3.out' }, 0)
}

const leave = (el, done) => {
  gsap.to(el, { autoAlpha: 0, duration: 0.24, ease: 'power2.in', onComplete: done })
}
</script>

<template>
  <Teleport to="body">
    <Transition :css="false" @enter="enter" @leave="leave">
      <div v-if="project" class="project-modal" role="dialog" aria-modal="true" :aria-labelledby="`modal-${project.id}`" @click.self="$emit('close')">
        <article class="project-modal-panel">
          <button class="project-modal-close" type="button" aria-label="关闭项目详情" @click="$emit('close')">
            <span></span><span></span>
          </button>
          <div class="project-modal-media">
            <img :src="project.image" :alt="`${project.title} 项目预览`" />
            <span>{{ project.number }} / {{ project.status }}</span>
          </div>
          <div class="project-modal-body">
            <p class="eyebrow">{{ project.type }}</p>
            <h2 :id="`modal-${project.id}`">{{ project.title }}</h2>
            <p class="project-modal-summary">{{ project.summary }}</p>

            <div class="modal-detail-grid">
              <div class="modal-background">
                <span class="detail-label">WHY IT EXISTS</span>
                <p>{{ project.background }}</p>
              </div>
              <div>
                <span class="detail-label">WHAT I DID</span>
                <ul><li v-for="item in project.role" :key="item">{{ item }}</li></ul>
              </div>
              <div>
                <span class="detail-label">CORE FEATURES</span>
                <ul><li v-for="item in project.features" :key="item">{{ item }}</li></ul>
              </div>
            </div>

            <footer class="project-modal-footer">
              <div class="modal-tech">
                <span v-for="item in project.tech" :key="item">{{ item }}</span>
              </div>
              <div class="modal-links">
                <a v-if="project.demoUrl" :href="project.demoUrl" target="_blank" rel="noopener noreferrer">LIVE DEMO ↗</a>
                <a v-if="project.docsUrl" :href="project.docsUrl" target="_blank" rel="noopener noreferrer">DOCS ↗</a>
                <a v-if="project.githubUrl" :href="project.githubUrl" target="_blank" rel="noopener noreferrer">GITHUB ↗</a>
                <span v-if="!project.demoUrl && !project.docsUrl && !project.githubUrl">CASE NOTES / PRIVATE</span>
              </div>
            </footer>
          </div>
        </article>
      </div>
    </Transition>
  </Teleport>
</template>
