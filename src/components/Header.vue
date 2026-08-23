<script setup lang="ts">
  import { getFieldIcon } from '@/config/basic-info-fields'
  import type { ResumeData } from '@/types/types'
  import { applyCjkSpacing } from '@/utils/markdown-renderer'

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
  <header class="site-header">
    <h1 class="header-name">{{ data.basicInfo.name }}</h1>
    <p class="header-position">
      {{ data.basicInfo.position }}
      <template v-if="data.basicInfo.age"> · {{ data.basicInfo.age }}</template>
    </p>

    <ul class="contact-list">
      <template v-for="(value, key) in data.basicInfo" :key="key">
        <!-- 跳过已在顶部展示的核心字段 -->
        <li v-if="!['name', 'age', 'position'].includes(String(key))" class="contact-item">
          <span class="contact-icon" :class="getFieldIcon(String(key))" aria-hidden="true"></span>

          <!-- 链接字段 -->
          <a
            v-if="isLinkField(String(key)) && value"
            :href="generateContactLink(String(key), String(value))"
            :rel="String(key) === 'email' ? '' : 'noopener noreferrer'"
            :target="isLinkField(String(key)) ? '_blank' : undefined"
            class="contact-link"
          >
            {{ applyCjkSpacing(String(value)) }}
          </a>

          <!-- 普通字段 -->
          <span v-else>{{ applyCjkSpacing(String(value)) }}</span>
        </li>
      </template>
    </ul>
  </header>
</template>
