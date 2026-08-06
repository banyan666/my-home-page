<script setup>
defineProps({ active: Boolean, projects: { type: Array, required: true } })
defineEmits(['open-project'])
</script>

<template>
  <section class="scene-page page-work" data-page="1" :aria-hidden="!active" aria-labelledby="work-title">
    <div class="work-layout">
      <header class="work-heading scene-reveal">
        <p class="scene-kicker">Selected projects</p>
        <h2 id="work-title">项目作品</h2>
        <p>参与开源社区，构建 WebGIS 与三维可视化工具，开发SDK与案例，以及开源项目。</p>
      </header>

      <div class="project-grid scene-reveal">
        <article v-for="project in projects" :key="project.id" class="scene-project-card">
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
    </div>
  </section>
</template>
