<script setup lang="ts">
import type { ResumeData } from '@/data/resume-data'
import { getFieldIcon } from '@/config/basic-info-fields'

defineOptions({
  name: 'ResumeHeader'
})

defineProps<{
  data: ResumeData
}>()

// 生成联系方式链接
function generateContactLink(field: string, value: string): string {
  switch (field) {
    case 'email':
      return `mailto:${value}`
    case 'phone':
      return `tel:${value}`
    case 'website':
    case 'gitee':
    case 'github':
    case 'blog':
    case 'linkedin':
      return value
    default:
      return '#'
  }
}

// 判断是否为链接字段
function isLinkField(field: string): boolean {
  return ['email', 'phone', 'website', 'gitee', 'github', 'blog', 'linkedin'].includes(field)
}
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
        {{ data.basicInfo?.name || data.name }}
      </h1>
      <h2
        class="position text-xl text-secondary"
        v-motion
        :initial="{ opacity: 0, y: -10 }"
        :enter="{ opacity: 1, y: 0, transition: { delay: 600, duration: 800 } }"
      >
        {{ data.basicInfo?.position || data.position }}
        <span v-if="data.basicInfo?.age && !data.position.includes(String(data.basicInfo.age))" class="ml-2">
          | {{ data.basicInfo.age }}
        </span>
      </h2>
    </div>

    <div class="contact-group grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <template v-if="data.basicInfo">
        <div
          v-for="(value, key, index) in data.basicInfo"
          :key="key"
          class="contact-item flex items-center gap-3 p-3 bg-white/90 backdrop-blur rounded-lg"
          v-motion
          :initial="{ opacity: 0, scale: 0.9 }"
          :enter="{ opacity: 1, scale: 1, transition: { delay: 800 + (index * 100), duration: 600 } }"
        >
          <span class="icon text-xl">{{ getFieldIcon(String(key)) }}</span>

          <!-- 链接字段 -->
          <a
            v-if="isLinkField(String(key)) && value"
            :href="generateContactLink(String(key), String(value))"
            :rel="String(key) === 'email' ? '' : 'noopener noreferrer'"
            :target="isLinkField(String(key)) ? '_blank' : undefined"
            class="contact-link text-sm hover:text-secondary transition-colors duration-200"
          >
            {{ value }}
          </a>

          <!-- 普通字段 -->
          <span v-else class="text-sm">{{ value }}</span>
        </div>
      </template>

      <!-- 兼容旧的contact数据结构 -->
      <template v-else>
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
          <span class="text-sm">{{ data.contact.website }}</span>
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
          <span class="text-sm">{{ data.contact.gitee }}</span>
        </a>
      </template>
    </div>
  </header>
</template>
