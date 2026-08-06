<script setup>
defineEmits(['enter'])
</script>

<template>
  <div class="intro-overlay" role="dialog" aria-modal="true" aria-label="进入网站">
    <div class="intro-atmosphere" aria-hidden="true"></div>
    <div class="intro-frame" aria-hidden="true">
      <span>BRYAN / PERSONAL ARCHIVE</span>
      <span>XIAN · CHINA</span>
    </div>
    <button class="intro-enter" type="button" @click="$emit('enter')">
      <span class="intro-enter-cn">进入网站</span>
      <span class="intro-enter-en">ENTER SITE</span>
      <i aria-hidden="true"></i>
    </button>
    <p class="intro-hint">开启声音与完整场景体验</p>
  </div>
</template>
