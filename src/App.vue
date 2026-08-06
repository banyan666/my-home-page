<script setup>
import { nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
import gsap from 'gsap'
import IntroOverlay from './components/IntroOverlay.vue'
import HomeScene from './components/HomeScene.vue'
import WorkScene from './components/WorkScene.vue'
import GalleryScene from './components/GalleryScene.vue'
import ContactScene from './components/ContactScene.vue'
import MouseRipple from './components/MouseRipple.vue'
import ProjectModal from './components/ProjectModal.vue'
import PhotoLightbox from './components/PhotoLightbox.vue'
import { photos, projects, skills } from './data/portfolio'
import scene1Source from '../assets/scene1.mp4?url'
import transitionSource from '../assets/transition_1_2.mp4?url'
import scene2Source from '../assets/scene2.mp4?url'
import scene2IdleSource from '../assets/scene2_idle_loop.mp4?url'
import scene3Source from '../assets/scene3.mp4?url'
import backgroundMusic from '../assets/background-music.mp3?url'

const sceneLabels = ['HOME', 'PROJECTS', 'SKILLS / LIFE', 'CONTACT']
const activeScene = ref(0)
const introActive = ref(true)
const locked = ref(false)
const phaseLabel = ref('Scene 01 · Idle Loop')
const progress = ref(0)
const selectedProject = ref(null)
const selectedPhoto = ref(-1)
const isPlaying = ref(false)

const contentTrack = ref(null)
const scene1Video = ref(null)
const transitionVideo = ref(null)
const scene2Video = ref(null)
const scene2IdleVideo = ref(null)
const scene3Video = ref(null)
const scene3LoopVideo = ref(null)
const audio = ref(null)

let currentVideoKey = 'scene1'
let sequenceId = 0
let skipCurrentPhase = null
let progressVideo = null
let progressFrame = 0
let lastWheelAt = 0
let touchStartY = 0
let touchStartX = 0
let enteringSite = false

const getVideos = () => ({
  scene1: scene1Video.value,
  transition: transitionVideo.value,
  scene2: scene2Video.value,
  scene2Idle: scene2IdleVideo.value,
  scene3: scene3Video.value,
  scene3Loop: scene3LoopVideo.value,
})

const safePlay = (video) => {
  const promise = video?.play()
  promise?.catch?.(() => {})
}

const fadeToVideo = async (key, { restart = false, duration = 0.62 } = {}) => {
  const videos = getVideos()
  const next = videos[key]
  const previous = videos[currentVideoKey]
  if (!next) return

  if (restart) {
    try { next.currentTime = 0 } catch { /* metadata not ready yet */ }
  }
  safePlay(next)

  if (next === previous) {
    gsap.set(next, { opacity: 1, zIndex: 2 })
    return
  }

  gsap.set(next, { zIndex: 2 })
  await new Promise((resolve) => {
    gsap.timeline({ onComplete: resolve })
      .to(next, { opacity: 1, duration, ease: 'power2.out' })
      .to(previous, { opacity: 0, duration, ease: 'power2.out' }, '<')
  })

  Object.entries(videos).forEach(([videoKey, video]) => {
    if (!video || videoKey === key) return
    video.pause()
    gsap.set(video, { zIndex: 0 })
  })
  currentVideoKey = key
}

const waitForVideo = (video, token, fallbackMs = 12000) => new Promise((resolve) => {
  let finished = false
  const finish = () => {
    if (finished) return
    finished = true
    video?.removeEventListener('ended', finish)
    window.clearTimeout(timer)
    if (skipCurrentPhase === finish) skipCurrentPhase = null
    progressVideo = null
    progress.value = 100
    resolve(token === sequenceId)
  }
  const timer = window.setTimeout(finish, fallbackMs)
  video?.addEventListener('ended', finish, { once: true })
  progressVideo = video
  progress.value = 0
  skipCurrentPhase = finish
})

const waitForDelay = (duration) => new Promise((resolve) => {
  window.setTimeout(resolve, duration)
})

const animateSceneContent = (index) => {
  const page = contentTrack.value?.querySelector(`[data-page="${index}"]`)
  if (!page) return
  const elements = page.querySelectorAll('.scene-reveal')
  gsap.fromTo(elements,
    { y: 26, autoAlpha: 0 },
    { y: 0, autoAlpha: 1, duration: 0.75, stagger: 0.1, delay: 0.32, ease: 'power3.out', overwrite: true },
  )
}

const prepareWorkContent = () => {
  const page = contentTrack.value?.querySelector('[data-page="1"]')
  if (!page) return null
  const heading = page.querySelector('.work-heading')
  const grid = page.querySelector('.project-grid')
  const cards = [...page.querySelectorAll('.scene-project-card')]
  gsap.killTweensOf([heading, grid, ...cards])
  gsap.set(grid, { autoAlpha: 1, x: 0, y: 0 })
  gsap.set(heading, { autoAlpha: 0, x: 72, y: 0 })
  gsap.set(cards, { autoAlpha: 0, x: 96, y: 0, scale: 0.985 })
  return { heading, cards }
}

const animateWorkContent = (prepared) => {
  if (!prepared) return
  const { heading, cards } = prepared
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reduceMotion) {
    gsap.set([heading, ...cards], { autoAlpha: 1, x: 0, y: 0, scale: 1 })
    return
  }

  const rightToLeft = [cards[1], cards[3], cards[0], cards[2]].filter(Boolean)
  gsap.timeline({ defaults: { overwrite: true } })
    .to(rightToLeft, {
      autoAlpha: 1,
      x: 0,
      scale: 1,
      duration: 0.72,
      stagger: 0.12,
      ease: 'power3.out',
    }, 0.12)
    .to(heading, {
      autoAlpha: 1,
      x: 0,
      duration: 0.7,
      ease: 'power3.out',
    }, 0.58)
}

const moveTrack = (index, animate = true, revealContent = true) => {
  if (!contentTrack.value) return
  gsap.to(contentTrack.value, {
    x: -window.innerWidth * index,
    duration: animate ? 1.08 : 0,
    ease: 'power3.inOut',
    overwrite: true,
  })
  if (revealContent) animateSceneContent(index)
}

const cancelSequence = () => {
  sequenceId += 1
  skipCurrentPhase?.()
  skipCurrentPhase = null
  locked.value = false
  progressVideo = null
}

const enterWorkThroughSequence = async () => {
  const token = ++sequenceId
  locked.value = true
  phaseLabel.value = 'Transition 01 → 02 · Scroll to skip'
  const transitionFade = fadeToVideo('transition', { restart: true, duration: 0.38 })
  const transitionFinished = waitForVideo(transitionVideo.value, token, 10500)
  await Promise.race([waitForDelay(320), transitionFinished])
  if (token !== sequenceId) return

  const preparedWorkContent = prepareWorkContent()
  activeScene.value = 1
  moveTrack(1, true, false)
  animateWorkContent(preparedWorkContent)

  if (!(await transitionFinished) || token !== sequenceId) return
  await transitionFade
  phaseLabel.value = 'Scene 02 · Intro Playing'
  await fadeToVideo('scene2', { restart: true, duration: 0.45 })
  if (!(await waitForVideo(scene2Video.value, token, 10500)) || token !== sequenceId) return

  phaseLabel.value = 'Scene 02 · Idle Loop'
  await fadeToVideo('scene2Idle', { restart: true, duration: 0.5 })
  locked.value = false
  progress.value = 100 / 3
}

const enterGalleryThroughSequence = async () => {
  const token = ++sequenceId
  locked.value = true
  activeScene.value = 2
  moveTrack(2)
  phaseLabel.value = 'Scene 03 · Intro Playing · Scroll to skip'
  await fadeToVideo('scene3', { restart: true, duration: 0.65 })
  if (!(await waitForVideo(scene3Video.value, token, 12500)) || token !== sequenceId) return

  phaseLabel.value = 'Scene 03 · Skills & Life'
  await fadeToVideo('scene3Loop', { restart: true, duration: 0.55 })
  locked.value = false
  progress.value = 200 / 3
}

const navigateScene = async (target, { animate = true } = {}) => {
  const next = Math.max(0, Math.min(3, target))
  if (next === activeScene.value && !locked.value) return

  if (locked.value) cancelSequence()
  const previous = activeScene.value
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (!reduceMotion && previous === 0 && next === 1) {
    enterWorkThroughSequence()
    return
  }

  if (!reduceMotion && next === 2 && previous !== 2) {
    enterGalleryThroughSequence()
    return
  }

  activeScene.value = next
  moveTrack(next, animate)

  if (next === 0) {
    phaseLabel.value = 'Scene 01 · Idle Loop'
    await fadeToVideo('scene1', { duration: 0.65 })
  } else if (next === 1) {
    phaseLabel.value = 'Scene 02 · Idle Loop'
    await fadeToVideo('scene2Idle', { duration: 0.65 })
  } else if (next === 2) {
    phaseLabel.value = 'Scene 03 · Skills & Life'
    await fadeToVideo('scene3Loop', { duration: 0.65 })
  } else {
    phaseLabel.value = 'Scene 04 · Contact'
    await fadeToVideo('scene3Loop', { duration: 0.7 })
  }
  progress.value = (next / 3) * 100
}

const shouldIgnoreNavigation = (target) => Boolean(
  selectedProject.value ||
  selectedPhoto.value >= 0 ||
  target?.closest?.('input, textarea, select, .project-modal-panel, .lightbox-frame, .feedback-panel'),
)

const handleWheel = (event) => {
  if (introActive.value || shouldIgnoreNavigation(event.target) || Math.abs(event.deltaY) < 8) return
  event.preventDefault()
  const now = Date.now()

  if (locked.value) {
    if (now - lastWheelAt > 320) skipCurrentPhase?.()
    lastWheelAt = now
    return
  }

  if (now - lastWheelAt < 820) return
  lastWheelAt = now
  navigateScene(activeScene.value + (event.deltaY > 0 ? 1 : -1))
}

const handleTouchStart = (event) => {
  touchStartY = event.changedTouches[0].clientY
  touchStartX = event.changedTouches[0].clientX
}

const handleTouchEnd = (event) => {
  if (introActive.value || shouldIgnoreNavigation(event.target)) return
  const deltaY = touchStartY - event.changedTouches[0].clientY
  const deltaX = touchStartX - event.changedTouches[0].clientX
  if (Math.abs(deltaY) < 58 || Math.abs(deltaY) < Math.abs(deltaX)) return
  if (locked.value) skipCurrentPhase?.()
  else navigateScene(activeScene.value + (deltaY > 0 ? 1 : -1))
}

const handleKeydown = (event) => {
  if (introActive.value || shouldIgnoreNavigation(event.target)) return
  if (event.key === 'ArrowDown' || event.key === 'PageDown') {
    event.preventDefault()
    locked.value ? skipCurrentPhase?.() : navigateScene(activeScene.value + 1)
  }
  if (event.key === 'ArrowUp' || event.key === 'PageUp') {
    event.preventDefault()
    locked.value ? cancelSequence() : navigateScene(activeScene.value - 1)
  }
}

const handleResize = () => moveTrack(activeScene.value, false)

const updateProgress = () => {
  if (progressVideo?.duration && Number.isFinite(progressVideo.duration)) {
    progress.value = Math.min(100, (progressVideo.currentTime / progressVideo.duration) * 100)
  }
  progressFrame = window.requestAnimationFrame(updateProgress)
}

const enterSite = async () => {
  if (enteringSite) return
  enteringSite = true
  safePlay(scene1Video.value)
  try {
    await audio.value?.play()
    isPlaying.value = true
  } catch {
    isPlaying.value = false
  }
  const finishEntry = () => {
    if (!introActive.value) return
    introActive.value = false
    animateSceneContent(0)
  }
  gsap.to('.intro-overlay', {
    autoAlpha: 0,
    scale: 1.025,
    duration: 0.85,
    ease: 'power3.inOut',
    pointerEvents: 'none',
    onComplete: finishEntry,
  })
  window.setTimeout(finishEntry, 1000)
}

const toggleAudio = async () => {
  if (!audio.value) return
  if (audio.value.paused) {
    try { await audio.value.play(); isPlaying.value = true } catch { isPlaying.value = false }
  } else {
    audio.value.pause()
    isPlaying.value = false
  }
}

onMounted(async () => {
  await nextTick()
  const videos = getVideos()
  Object.entries(videos).forEach(([key, video]) => {
    gsap.set(video, { opacity: key === 'scene1' ? 1 : 0, zIndex: key === 'scene1' ? 2 : 0 })
  })
  safePlay(scene1Video.value)
  moveTrack(0, false)
  updateProgress()
  window.addEventListener('wheel', handleWheel, { passive: false })
  window.addEventListener('touchstart', handleTouchStart, { passive: true })
  window.addEventListener('touchend', handleTouchEnd, { passive: true })
  window.addEventListener('keydown', handleKeydown)
  window.addEventListener('resize', handleResize)
})

onBeforeUnmount(() => {
  cancelSequence()
  window.cancelAnimationFrame(progressFrame)
  window.removeEventListener('wheel', handleWheel)
  window.removeEventListener('touchstart', handleTouchStart)
  window.removeEventListener('touchend', handleTouchEnd)
  window.removeEventListener('keydown', handleKeydown)
  window.removeEventListener('resize', handleResize)
})
</script>

<template>
  <div class="scene-app" :data-scene="activeScene + 1">
    <div class="video-stage" aria-hidden="true">
      <video ref="scene1Video" class="bg-video" :src="scene1Source" muted autoplay loop playsinline preload="auto"></video>
      <video ref="transitionVideo" class="bg-video" :src="transitionSource" muted playsinline preload="auto"></video>
      <video ref="scene2Video" class="bg-video" :src="scene2Source" muted playsinline preload="auto"></video>
      <video ref="scene2IdleVideo" class="bg-video" :src="scene2IdleSource" muted loop playsinline preload="auto"></video>
      <video ref="scene3Video" class="bg-video" :src="scene3Source" muted playsinline preload="auto"></video>
      <video ref="scene3LoopVideo" class="bg-video" src="/videos/scene3-loop-after.mp4" muted loop playsinline preload="auto"></video>
      <div class="cinema-vignette"></div>
      <div class="film-grain"></div>
    </div>

    <MouseRipple :active="!introActive" :scene="activeScene" />

    <header class="topbar" :inert="Boolean(selectedProject) || selectedPhoto >= 0">
      <button class="scene-brand" type="button" aria-label="回到首页" @click="navigateScene(0)">
        <i></i><span>BRYAN / STUDIO</span>
      </button>
      <nav aria-label="场景导航">
        <button v-for="(label, index) in sceneLabels" :key="label" type="button" :class="{ active: activeScene === index }" :aria-label="label" @click="navigateScene(index)">
          <span>{{ label }}</span><i></i>
        </button>
      </nav>
      <button class="top-sound" type="button" :aria-label="isPlaying ? '关闭背景音乐' : '播放背景音乐'" @click="toggleAudio">
        <span :class="{ playing: isPlaying }"><i></i><i></i><i></i></span>
        {{ isPlaying ? 'SOUND ON' : 'SOUND OFF' }}
      </button>
    </header>

    <main class="scene-viewport" :inert="Boolean(selectedProject) || selectedPhoto >= 0">
      <div ref="contentTrack" class="content-track">
        <HomeScene :active="activeScene === 0" @next="navigateScene(1)" />
        <WorkScene :active="activeScene === 1" :projects="projects" @open-project="selectedProject = $event" />
        <GalleryScene :active="activeScene === 2" :photos="photos" :skills="skills" @open-photo="selectedPhoto = $event" />
        <ContactScene :active="activeScene === 3" />
      </div>
    </main>

    <div class="mobile-scene-controls" aria-label="移动端场景导航">
      <button type="button" :disabled="activeScene === 0" aria-label="上一场景" @click="navigateScene(activeScene - 1)">↑</button>
      <span>0{{ activeScene + 1 }} / 04</span>
      <button type="button" :disabled="activeScene === 3" aria-label="下一场景" @click="navigateScene(activeScene + 1)">↓</button>
    </div>

    <div class="progress-ui" aria-hidden="true">
      <span>{{ phaseLabel }}</span>
      <span class="progress-line"><i :style="{ width: `${progress}%` }"></i></span>
      <span>0{{ activeScene + 1 }} / 04</span>
    </div>

    <IntroOverlay v-if="introActive" @enter="enterSite" />
    <ProjectModal :project="selectedProject" @close="selectedProject = null" />
    <PhotoLightbox :photos="photos" :index="selectedPhoto" @close="selectedPhoto = -1" @change="selectedPhoto = $event" />
    <audio ref="audio" :src="backgroundMusic" loop preload="auto" @play="isPlaying = true" @pause="isPlaying = false"></audio>
  </div>
</template>
