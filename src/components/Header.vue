<script setup lang="ts">
import type { ResumeData } from '@/data/resume-data'

defineOptions({
  name: 'ResumeHeader'
})

defineProps<{
  data: ResumeData
}>()
</script>

<template>
  <header class="card header-gradient" data="ResumeData">
    <div class="name-group mb-6 text-center">
      <h1
        class="name text-4xl font-bold text-primary mb-2"
        v-motion
        :initial="{ opacity: 0, y: -20 }"
        :enter="{ opacity: 1, y: 0, transition: { delay: 200, duration: 800 } }"
      >
        {{ data.name }}
      </h1>
      <h2
        class="position text-xl text-secondary"
        v-motion
        :initial="{ opacity: 0, y: -10 }"
        :enter="{ opacity: 1, y: 0, transition: { delay: 600, duration: 800 } }"
      >
        {{ data.position }}
      </h2>
    </div>

    <div class="contact-group grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <div
        class="contact-item flex items-center gap-3 p-3 bg-white/90 backdrop-blur rounded-lg"
        v-motion
        :initial="{ opacity: 0, scale: 0.9 }"
        :enter="{ opacity: 1, scale: 1, transition: { delay: 800, duration: 600 } }"
      >
        <span class="icon text-xl">📍</span>
        <span class="text-sm">{{ data.contact.location }}</span>
      </div>
      <div
        class="contact-item flex items-center gap-3 p-3 bg-white/90 backdrop-blur rounded-lg"
        v-motion
        :initial="{ opacity: 0, scale: 0.9 }"
        :enter="{ opacity: 1, scale: 1, transition: { delay: 900, duration: 600 } }"
      >
        <span class="icon text-xl">💰</span>
        <span class="text-sm">{{ data.contact.salary }}</span>
      </div>
      <a
        class="contact-link contact-item flex items-center gap-3 p-3 bg-white/90 backdrop-blur rounded-lg hover:bg-white transition-colors duration-200"
        :href="`mailto:${data.contact.email}`"
        v-motion
        :initial="{ opacity: 0, scale: 0.9 }"
        :enter="{ opacity: 1, scale: 1, transition: { delay: 1000, duration: 600 } }"
      >
        <span class="icon text-xl">✉️</span>
        <span class="text-sm">{{ data.contact.email }}</span>
      </a>
      <a
        class="contact-link contact-item flex items-center gap-3 p-3 bg-white/90 backdrop-blur rounded-lg hover:bg-white transition-colors duration-200"
        :href="`tel:${data.contact.phone}`"
        v-motion
        :initial="{ opacity: 0, scale: 0.9 }"
        :enter="{ opacity: 1, scale: 1, transition: { delay: 1100, duration: 600 } }"
      >
        <span class="icon text-xl">📱</span>
        <span class="text-sm">{{ data.contact.phone }}</span>
      </a>
      <a
        class="contact-link contact-item flex items-center gap-3 p-3 bg-white/90 backdrop-blur rounded-lg hover:bg-white transition-colors duration-200"
        rel="noopener noreferrer"
        :href="data.contact.website"
        target="_blank"
        v-motion
        :initial="{ opacity: 0, scale: 0.9 }"
        :enter="{ opacity: 1, scale: 1, transition: { delay: 1200, duration: 600 } }"
      >
        <span class="icon text-xl">🌐</span>
        <span class="text-sm">{{data.contact.website}}</span>
      </a>
      <a
        class="contact-link contact-item flex items-center gap-3 p-3 bg-white/90 backdrop-blur rounded-lg hover:bg-white transition-colors duration-200"
        rel="noopener noreferrer"
        :href="data.contact.gitee"
        target="_blank"
        v-motion
        :initial="{ opacity: 0, scale: 0.9 }"
        :enter="{ opacity: 1, scale: 1, transition: { delay: 1300, duration: 600 } }"
      >
        <span class="icon text-xl">🐱</span>
        <span class="text-sm">{{data.contact.gitee}}</span>
      </a>
    </div>
  </header>
</template>
