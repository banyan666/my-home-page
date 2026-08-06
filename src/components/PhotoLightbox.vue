<script setup>
import { computed, onBeforeUnmount, watch } from 'vue'
import gsap from 'gsap'

const props = defineProps({
  photos: { type: Array, required: true },
  index: { type: Number, default: -1 },
})
const emit = defineEmits(['close', 'change'])
const photo = computed(() => props.index >= 0 ? props.photos[props.index] : null)

const previous = () => emit('change', (props.index - 1 + props.photos.length) % props.photos.length)
const next = () => emit('change', (props.index + 1) % props.photos.length)
const onKeydown = (event) => {
  if (event.key === 'Escape') emit('close')
  if (event.key === 'ArrowLeft') previous()
  if (event.key === 'ArrowRight') next()
}

watch(photo, (value) => {
  document.body.classList.toggle('modal-open', Boolean(value))
  if (value) window.addEventListener('keydown', onKeydown)
  else window.removeEventListener('keydown', onKeydown)
})

watch(() => props.index, () => {
  if (!photo.value) return
  requestAnimationFrame(() => {
    gsap.fromTo('.lightbox-image img', { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.42, ease: 'power2.out' })
  })
})

onBeforeUnmount(() => {
  document.body.classList.remove('modal-open')
  window.removeEventListener('keydown', onKeydown)
})

const enter = (el, done) => gsap.fromTo(el, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.32, onComplete: done })
const leave = (el, done) => gsap.to(el, { autoAlpha: 0, duration: 0.22, onComplete: done })
</script>

<template>
  <Teleport to="body">
    <Transition :css="false" @enter="enter" @leave="leave">
      <div v-if="photo" class="photo-lightbox" role="dialog" aria-modal="true" :aria-label="photo.title">
        <button class="lightbox-backdrop" type="button" aria-label="关闭照片" @click="$emit('close')"></button>
        <div class="lightbox-frame">
          <header>
            <span>PET MOMENT / {{ String(photo.id).padStart(2, '0') }}</span>
            <button type="button" aria-label="关闭照片" @click="$emit('close')">CLOSE ×</button>
          </header>
          <div class="lightbox-image"><img :src="photo.src" :alt="photo.title" /></div>
          <footer>
            <div>
              <span>{{ photo.date }}</span>
              <h2>{{ photo.title }}</h2>
              <p>{{ photo.description }}</p>
            </div>
            <div class="lightbox-controls">
              <button type="button" aria-label="上一张" @click="previous">←</button>
              <span>{{ String(index + 1).padStart(2, '0') }} / {{ String(photos.length).padStart(2, '0') }}</span>
              <button type="button" aria-label="下一张" @click="next">→</button>
            </div>
          </footer>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
