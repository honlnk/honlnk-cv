<script setup lang="ts">
  import { getFieldIcon } from '@/config/basic-info-fields'
  import type { ResumeData } from '@/types/types'

  defineOptions({
    name: 'ResumeHeader',
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
    return ['email', 'website', 'gitee', 'github', 'blog', 'linkedin'].includes(field)
  }
</script>

<template>
  <header class="header-container" data="ResumeData">
    <div class="header-inner card">
      <div class="name-group mb-6 text-center">
        <h1
          class="name text-4xl header-name mb-2"
          v-motion
          :initial="{ opacity: 0, y: -20 }"
          :enter="{ opacity: 1, y: 0, transition: { delay: 200, duration: 800 } }"
        >
          {{ data.basicInfo.name }}
        </h1>
        <h2
          class="position text-xl header-position"
          v-motion
          :initial="{ opacity: 0, y: -10 }"
          :enter="{ opacity: 1, y: 0, transition: { delay: 600, duration: 800 } }"
        >
          {{ data.basicInfo.position }}
          <span v-if="data.basicInfo.age" class="ml-2"> | {{ data.basicInfo.age }} </span>
        </h2>
      </div>

      <div class="contact-group grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <template v-for="(value, key, index) in data.basicInfo" :key="key">
          <!-- 跳过已在顶部展示的核心字段 -->
          <div
            v-if="!['name', 'age', 'position'].includes(String(key))"
            class="contact-item flex items-center gap-3 p-3 glass-effect rounded-lg"
            v-motion
            :initial="{ opacity: 0, scale: 0.9 }"
            :enter="{
              opacity: 1,
              scale: 1,
              transition: { delay: 800 + index * 100, duration: 600 },
            }"
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
      </div>
    </div>
  </header>
</template>
