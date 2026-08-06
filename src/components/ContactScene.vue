<script setup>
import { ref } from 'vue'

defineProps({ active: Boolean })
const status = ref('')
const submitting = ref(false)
const formspreeFormId = String(import.meta.env.VITE_FORMSPREE_FORM_ID || '').trim()
const formEndpoint = formspreeFormId
  ? `https://formspree.io/f/${encodeURIComponent(formspreeFormId)}`
  : ''

const submitForm = async (event) => {
  const form = event.currentTarget
  status.value = ''

  if (!formEndpoint) {
    status.value = '留言服务尚未配置，请直接发送邮件至 15029296293@163.com。'
    return
  }

  submitting.value = true
  try {
    const response = await fetch(formEndpoint, {
      method: 'POST',
      body: new FormData(form),
      headers: { Accept: 'application/json' },
    })
    if (!response.ok) throw new Error('submit failed')
    form.reset()
    status.value = '留言已发送，我会尽快回复。'
  } catch {
    status.value = '暂时没有发送成功，请直接通过邮箱联系。'
  } finally {
    submitting.value = false
  }
}
</script>

<template>
  <section class="scene-page page-contact" data-page="3" :aria-hidden="!active" aria-labelledby="contact-title">
    <div class="contact-atmosphere" aria-hidden="true"></div>
    <div class="contact-layout">
      <div class="contact-intro scene-reveal">
        <p class="scene-kicker">Scene 04 / Contact</p>
        <h2 id="contact-title">Contact<br /><span>/ 联系我</span></h2>
        <p class="contact-lead">期待与你交流前端、地图 GIS、Java 全栈与 AI 应用开发，也欢迎项目合作与技术探讨。</p>

        <div class="contact-card-grid">
          <a class="contact-info-card glass-panel" href="mailto:15029296293@163.com">
            <span>EMAIL</span><strong>15029296293@163.com</strong><small>Project / Collaboration ↗</small>
          </a>
          <a class="contact-info-card glass-panel" href="https://github.com/banyan666" target="_blank" rel="noopener noreferrer">
            <span>GITHUB</span><strong>banyan666</strong><small>Code / Portfolio ↗</small>
          </a>
          <a class="contact-info-card glass-panel" href="https://blog.csdn.net/A15029296293" target="_blank" rel="noopener noreferrer">
            <span>CSDN</span><strong>阿琰a_</strong><small>Articles / Notes ↗</small>
          </a>
        </div>
      </div>

      <form class="feedback-panel glass-panel scene-reveal" @submit.prevent="submitForm">
        <div class="panel-heading"><span>FEEDBACK</span><h3>用户反馈</h3></div>
        <input type="hidden" name="_subject" value="Bryan 个人主页新留言" />
        <label><span>Name / 姓名</span><input type="text" name="name" autocomplete="name" placeholder="请输入你的姓名" required /></label>
        <label><span>Email / 邮箱</span><input type="email" name="email" autocomplete="email" placeholder="you@example.com" required /></label>
        <label><span>Message / 留言内容</span><textarea name="message" rows="4" placeholder="写下你想交流的内容…" required></textarea></label>
        <button type="submit" :disabled="submitting">{{ submitting ? '发送中…' : 'Submit / 提交' }} <i>↗</i></button>
        <p role="status" aria-live="polite">{{ status }}</p>
      </form>
    </div>
  </section>
</template>
