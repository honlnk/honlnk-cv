<script setup lang="ts">
  import type { ListItem, ProjectData } from '@/types/types'
  import { renderInlineMarkdown } from '@/utils/markdown-renderer'
  import { computed } from 'vue'

  interface Props {
    project: ProjectData
    variant?: 'project' | 'work-nested'
  }

  const props = withDefaults(defineProps<Props>(), {
    variant: 'project',
  })

  // 扁平化列表项，保留层级信息
  const flattenHighlights = (items: ListItem[]): Array<{ content: string; level: number }> => {
    const result: Array<{ content: string; level: number }> = []
    const flatten = (items: ListItem[], level = 0) => {
      for (const item of items) {
        result.push({
          content: item.content,
          level, // 保留层级信息，不再拼接空格
        })
        if (item.children && item.children.length > 0) {
          flatten(item.children, level + 1)
        }
      }
    }
    flatten(items)
    return result
  }

  const flattenedHighlights = computed(() => flattenHighlights(props.project.highlights))
</script>

<template>
  <article class="project-item" :class="{ 'project-item--nested': variant === 'work-nested' }">
    <!-- 项目头部：标题 + 角色徽章 + 时间 -->
    <div class="item-header">
      <h3 v-if="variant === 'project'" class="text-lg font-semibold text-primary m-0">
        {{ project.title }}
      </h3>
      <h4 v-else class="text-base font-semibold text-primary m-0">{{ project.title }}</h4>
      <div class="flex items-center gap-3 flex-wrap">
        <span v-if="project.role" class="role-chip">{{ project.role }}</span>
        <span v-if="project.duration" class="duration">{{ project.duration }}</span>
      </div>
    </div>

    <!-- 项目亮点 -->
    <ul class="highlights-list mt-3">
      <li
        v-for="(item, x) in flattenedHighlights"
        :key="x"
        :data-level="item.level"
        :style="{ paddingLeft: `${item.level * 1.5}em` }"
      >
        <span v-html="renderInlineMarkdown(item.content)"></span>
      </li>
    </ul>

    <!-- 技术栈 -->
    <div v-if="project.techStack?.length" class="tech-stack flex flex-wrap gap-2 mt-4">
      <span v-for="tech in project.techStack" :key="tech" class="tech-tag">
        {{ tech }}
      </span>
    </div>
  </article>
</template>

<style scoped lang="scss">
  .project-item {
    padding: var(--spacing-lg) 0;

    & + & {
      border-top: var(--border-width-1) solid var(--color-hairline);
    }

    /* 嵌套在工作经历中的项目：收紧间距 */
    &--nested {
      padding: var(--spacing-md) 0;
    }
  }
</style>
