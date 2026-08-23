<script setup lang="ts">
  import type { ResumeData } from '@/types/types'
  import { renderInlineMarkdown } from '@/utils/markdown-renderer'

  defineProps<{
    advantages: ResumeData['coreAdvantages']
  }>()
</script>

<template>
  <section class="section core-advantages" id="core">
    <h2 class="section-title"><span class="section-index">01</span>核心优势</h2>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
      <div v-for="(item, index) in advantages" :key="index">
        <h3 class="text-base font-semibold text-primary mb-3">{{ item.title }}</h3>
        <ul class="marker-list text-[0.9375rem]">
          <li v-for="(point, pIndex) in item.items" :key="pIndex">
            <span v-html="renderInlineMarkdown(point)"></span>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>
