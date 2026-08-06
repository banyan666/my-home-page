<script setup>
defineProps({ active: Boolean })
defineEmits(['next'])
</script>

<template>
  <section class="scene-page page-home" data-page="0" :aria-hidden="!active" aria-labelledby="home-title">
    <div class="hero-copy scene-reveal">
      <p class="scene-kicker">Personal portfolio / 2026</p>
      <h1 id="home-title">
        <span>欢迎来到，</span>
        <span class="home-title-offset">Bryan 的主页</span>
      </h1>
      <p class="home-intro">以地图连接空间，以代码构建体验，以 AI 拓展全栈边界。</p>
      <div class="hero-actions">
        <button class="primary-btn" type="button" @click="$emit('next')">
          向下滚动进入 <span>↓</span>
        </button>
        <span class="scroll-hint">SCROLL DOWN</span>
      </div>
    </div>

    <aside class="profile-card glass-panel scene-reveal">
      <div class="profile-topline"><span>PROFILE</span><i></i></div>
      <h2>Bryan</h2>
      <p>前端与地图 GIS 开发从业者，正在向 Java 全栈方向进阶，具备 AI 全栈应用的设计与开发能力。</p>
      <dl>
        <div><dt>LOCATION</dt><dd>Xian, China</dd></div>
        <div><dt>FOCUS</dt><dd>Full-stack GIS AI</dd></div>
        <div><dt>STATUS</dt><dd><i></i>Strengthening backend development capabilities</dd></div>
      </dl>
    </aside>

    <div class="home-coordinate scene-reveal" aria-hidden="true">
      <span>34.34° N</span><span>108.94° E</span>
    </div>
  </section>
</template>
