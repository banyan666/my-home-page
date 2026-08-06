<script setup>
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import gsap from 'gsap'

const props = defineProps({
  active: Boolean,
  photos: { type: Array, required: true },
  skills: { type: Array, required: true },
})
const emit = defineEmits(['open-photo'])
const leftTrack = ref(null)
const rightTrack = ref(null)
const galleryStream = ref(null)
let leftTween
let rightTween
const tiltControllers = new WeakMap()

const indexedPhotos = computed(() => props.photos.map((photo, index) => ({ ...photo, sourceIndex: index })))
const skillItems = computed(() => props.skills)
const petPhotos = computed(() => indexedPhotos.value)

const setSpeed = (value) => {
  leftTween?.timeScale(value)
  rightTween?.timeScale(value)
}

const canTilt = () => (
  window.matchMedia('(hover: hover) and (pointer: fine)').matches &&
  !window.matchMedia('(prefers-reduced-motion: reduce)').matches
)

const getTiltController = (element) => {
  if (tiltControllers.has(element)) return tiltControllers.get(element)
  gsap.set(element, { transformPerspective: 800, transformStyle: 'preserve-3d' })
  const controller = {
    rotateX: gsap.quickTo(element, 'rotationX', { duration: 0.28, ease: 'power3.out' }),
    rotateY: gsap.quickTo(element, 'rotationY', { duration: 0.28, ease: 'power3.out' }),
    depth: gsap.quickTo(element, 'z', { duration: 0.28, ease: 'power3.out' }),
  }
  tiltControllers.set(element, controller)
  return controller
}

const tiltPhoto = (event) => {
  if (!canTilt()) return
  const element = event.currentTarget
  const rect = element.getBoundingClientRect()
  const x = event.clientX - rect.left
  const y = event.clientY - rect.top
  const normalizedX = (x / rect.width) * 2 - 1
  const normalizedY = (y / rect.height) * 2 - 1
  const controller = getTiltController(element)
  controller.rotateX(-normalizedY * 7)
  controller.rotateY(normalizedX * 7)
  controller.depth(14)
  element.style.setProperty('--shine-x', `${(x / rect.width) * 100}%`)
  element.style.setProperty('--shine-y', `${(y / rect.height) * 100}%`)
}

const resetPhotoTilt = (event) => {
  const element = event.currentTarget
  const controller = getTiltController(element)
  controller.rotateX(0)
  controller.rotateY(0)
  controller.depth(0)
  element.style.setProperty('--shine-x', '50%')
  element.style.setProperty('--shine-y', '50%')
}

const syncPlayback = () => {
  if (props.active) {
    leftTween?.play()
    rightTween?.play()
  } else {
    leftTween?.pause()
    rightTween?.pause()
  }
}

watch(() => props.active, syncPlayback)

onMounted(() => {
  leftTween = gsap.to(leftTrack.value, { yPercent: -50, duration: 62, repeat: -1, ease: 'none' })
  rightTween = gsap.fromTo(rightTrack.value, { yPercent: -50 }, { yPercent: 0, duration: 72, repeat: -1, ease: 'none' })
  syncPlayback()
})

onBeforeUnmount(() => {
  leftTween?.kill()
  rightTween?.kill()
  if (galleryStream.value) gsap.killTweensOf(galleryStream.value.querySelectorAll('.stream-photo'))
})
</script>

<template>
  <section class="scene-page page-gallery" data-page="2" :aria-hidden="!active" aria-labelledby="gallery-title">
    <header class="gallery-scene-heading scene-reveal">
      <p class="scene-kicker">Technical stack / Pet moments</p>
      <h2 id="gallery-title">技能与生活</h2>
      <span>{{ skillItems.length }} SKILLS · {{ petPhotos.length }} PET MOMENTS</span>
    </header>

    <div ref="galleryStream" class="gallery-stream scene-reveal" @mouseenter="setSpeed(0)" @mouseleave="setSpeed(1)" @focusin="setSpeed(0)" @focusout="setSpeed(1)">
      <div class="photo-column photo-column-left">
        <span class="photo-column-label">SKILLS / STACK</span>
        <div ref="leftTrack" class="photo-track">
          <div v-for="repeat in 2" :key="repeat" class="photo-track-set">
            <article v-for="skill in skillItems" :key="`${repeat}-${skill.id}`" class="stream-photo stream-skill-card" :style="{ '--skill-accent': skill.accent }" :aria-label="`${skill.title}：${skill.category}`" @pointermove="tiltPhoto" @pointerleave="resetPhotoTilt">
              <i class="skill-card-group">{{ skill.group }}</i>
              <div class="skill-card-symbol" aria-hidden="true"><b>{{ skill.mark }}</b></div>
              <span><strong>{{ skill.title }}</strong><small>{{ skill.category }}</small></span>
            </article>
          </div>
        </div>
      </div>
      <div class="photo-column photo-column-right">
        <span class="photo-column-label">PETS / MOMENTS</span>
        <div ref="rightTrack" class="photo-track">
          <div v-for="repeat in 2" :key="repeat" class="photo-track-set">
            <button v-for="photo in petPhotos" :key="`${repeat}-${photo.id}`" type="button" class="stream-photo stream-photo-pet" @pointermove="tiltPhoto" @pointerleave="resetPhotoTilt" @click="emit('open-photo', photo.sourceIndex)">
              <img :src="photo.src" :alt="photo.title" loading="lazy" />
              <span><strong>{{ photo.title }}</strong><small>{{ photo.date }}</small></span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <p class="gallery-instruction scene-reveal">悬停暂停 · 左列技术栈 · 右列宠物日常</p>
  </section>
</template>
