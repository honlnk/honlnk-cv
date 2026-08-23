<script setup lang="ts">
  import type { ResumeData } from '@/types/types'
  import { renderInlineMarkdown } from '@/utils/markdown-renderer'

  defineProps<{
    values: ResumeData['additionalValues']
  }>()

  /**
   * README 中标题开头的 emoji → Lucide 图标类名
   * 图标类名以字面量出现在此处，会被 UnoCSS 扫描到
   */
  const EMOJI_ICON_MAP: Record<string, string> = {
    '🚀': 'i-lucide:rocket',
    '💻': 'i-lucide:laptop',
    '📚': 'i-lucide:book-open',
    '🛡️': 'i-lucide:shield-check',
    '🔧': 'i-lucide:wrench',
  }

  function getValueIcon(emoji: string): string {
    return EMOJI_ICON_MAP[emoji] ?? 'i-lucide:sparkles'
  }
</script>

<template>
  <section class="section additional-value" id="additional">
    <h2 class="section-title"><span class="section-index">05</span>附加价值</h2>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
      <div v-for="(item, index) in values" :key="index">
        <h3 class="flex items-center gap-2 text-base font-semibold text-primary mb-3">
          <span class="value-icon" :class="getValueIcon(item.icon)" aria-hidden="true"></span>
          {{ item.title }}
        </h3>
        <ul class="marker-list text-[0.9375rem]">
          <li v-for="(line, lIndex) in item.content" :key="lIndex">
            <span v-html="renderInlineMarkdown(line)"></span>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
  .value-icon {
    font-size: var(--font-size-lg);
    color: rgb(var(--color-secondary));
    flex-shrink: 0;
  }
</style>
