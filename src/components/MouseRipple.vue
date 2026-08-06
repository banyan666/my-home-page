<script setup>
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'

const props = defineProps({
  active: Boolean,
  scene: { type: Number, default: 0 },
})

const canvas = ref(null)
let context = null
let pixelRatio = 1
let animationFrame = 0
let lastFrameAt = 0
let lastRippleAt = 0
let ripples = []
let enabled = false

const resize = () => {
  if (!canvas.value || !context) return
  pixelRatio = Math.min(window.devicePixelRatio || 1, 2)
  canvas.value.width = Math.round(window.innerWidth * pixelRatio)
  canvas.value.height = Math.round(window.innerHeight * pixelRatio)
  canvas.value.style.width = `${window.innerWidth}px`
  canvas.value.style.height = `${window.innerHeight}px`
  context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0)
}

const drawRipple = (ripple) => {
  const progress = Math.min(1, ripple.radius / ripple.maxRadius)
  const alpha = Math.max(0, ripple.alpha * (1 - progress))
  const glow = context.createRadialGradient(
    ripple.x,
    ripple.y,
    Math.max(1, ripple.radius * 0.18),
    ripple.x,
    ripple.y,
    ripple.radius,
  )

  context.save()
  context.globalCompositeOperation = 'screen'
  glow.addColorStop(0, `rgba(255, 255, 255, ${alpha * 0.2})`)
  glow.addColorStop(0.42, `rgba(112, 232, 226, ${alpha * 0.24})`)
  glow.addColorStop(1, 'rgba(112, 232, 226, 0)')
  context.fillStyle = glow
  context.beginPath()
  context.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2)
  context.fill()

  context.lineWidth = 1.45
  context.strokeStyle = `rgba(112, 232, 226, ${alpha * 0.82})`
  context.beginPath()
  context.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2)
  context.stroke()

  context.lineWidth = 0.8
  context.strokeStyle = `rgba(255, 255, 255, ${alpha * 0.58})`
  context.beginPath()
  context.arc(ripple.x, ripple.y, ripple.radius * 0.56, 0, Math.PI * 2)
  context.stroke()
  context.restore()
}

const animate = (time) => {
  animationFrame = 0
  if (!context || !canvas.value) return
  const frameScale = lastFrameAt ? Math.min(2, (time - lastFrameAt) / 16.67) : 1
  lastFrameAt = time
  context.clearRect(0, 0, window.innerWidth, window.innerHeight)

  ripples = ripples.filter((ripple) => {
    ripple.radius += ripple.speed * frameScale
    if (ripple.radius >= ripple.maxRadius) return false
    drawRipple(ripple)
    return true
  })

  if (ripples.length) animationFrame = window.requestAnimationFrame(animate)
  else lastFrameAt = 0
}

const startAnimation = () => {
  if (!animationFrame) animationFrame = window.requestAnimationFrame(animate)
}

const handlePointerMove = (event) => {
  if (!enabled || !props.active || event.pointerType === 'touch') return
  const now = performance.now()
  if (now - lastRippleAt < 68) return

  const sceneStrength = [0.62, 0.72, 0.68, 0.56][props.scene] ?? 0.62
  ripples.push({
    x: event.clientX,
    y: event.clientY,
    radius: 2,
    maxRadius: props.scene === 1 ? 86 : 78,
    alpha: sceneStrength,
    speed: props.scene === 1 ? 1.08 : 0.96,
  })
  if (ripples.length > 24) ripples.splice(0, ripples.length - 24)
  lastRippleAt = now
  startAnimation()
}

const clear = () => {
  ripples = []
  lastFrameAt = 0
  if (animationFrame) window.cancelAnimationFrame(animationFrame)
  animationFrame = 0
  context?.clearRect(0, 0, window.innerWidth, window.innerHeight)
}

watch(() => props.active, (active) => {
  if (!active) clear()
})

onMounted(() => {
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  enabled = finePointer && !reduceMotion
  if (!enabled) return
  context = canvas.value?.getContext('2d') ?? null
  resize()
  window.addEventListener('resize', resize)
  window.addEventListener('pointermove', handlePointerMove, { passive: true })
})

onBeforeUnmount(() => {
  clear()
  window.removeEventListener('resize', resize)
  window.removeEventListener('pointermove', handlePointerMove)
})
</script>

<template>
  <canvas ref="canvas" class="water-ripple-canvas" aria-hidden="true"></canvas>
</template>
