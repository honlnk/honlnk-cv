<script setup lang="ts">
  import type { ResumeData } from '@/types/types'
  import { renderInlineMarkdown } from '@/utils/markdown-renderer'

  defineProps<{
    data: ResumeData['education']
  }>()
</script>

<template>
  <section class="section education" id="education">
    <h2 class="section-title"><span class="section-index">04</span>教育背景</h2>

    <div class="item-header">
      <div class="flex items-center gap-3 flex-wrap">
        <h3 class="text-lg font-semibold text-primary m-0">{{ data.school }}</h3>
        <span class="text-sm text-text-secondary">{{ data.major }}</span>
      </div>
      <span class="duration">{{ data.duration }}</span>
    </div>

    <ul class="marker-list mt-3">
      <li v-for="(exp, index) in data.experiences" :key="index">
        <span v-html="renderInlineMarkdown(exp)"></span>
      </li>
    </ul>
  </section>
</template>
