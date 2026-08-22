<script setup lang="ts">
  import type { ListItem, ProjectData } from '@/types/types'
  import { hideTemplate, initTemplate, showTemplate } from '@/utils/better-typing'
  import { renderInlineMarkdown } from '@/utils/markdown-renderer'
  import { ref } from 'vue'

  interface Props {
    project: ProjectData
    index?: number
    variant?: 'project' | 'work-nested'
  }

  const props = withDefaults(defineProps<Props>(), {
    index: 0,
    variant: 'project',
  })

  // 展开状态和高度管理
  const expanded = ref(false)
  const componentsHeight = ref<Record<number, number>>({})
  const projectsTemplate = ref<string[][]>([])

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

  // 转换 highlights 格式以适配 better-typing
  const flattenedHighlights = flattenHighlights(props.project.highlights)
  const adaptedProject = {
    title: props.project.title,
    highlights: flattenedHighlights.map(item => item.content), // 提取纯文本用于打字机
  }

  // 初始化模板
  initTemplate(projectsTemplate.value, [adaptedProject], componentsHeight.value)

  const toggleDetails = async (event: MouseEvent) => {
    const card = (event.currentTarget as HTMLElement).closest(`.${cardClass}`) as HTMLElement
    const details = card?.querySelector('.drawer-content') as HTMLElement

    if (expanded.value) {
      if (details) {
        componentsHeight.value[0] = details.scrollHeight
      }
      expanded.value = false
      // 隐藏模板
      hideTemplate(projectsTemplate.value, [adaptedProject], 0, componentsHeight.value, 500)
    } else {
      // 展开时计算并设置高度
      if (details) {
        componentsHeight.value[0] = details.scrollHeight
      }
      expanded.value = true
      // 显示模板
      showTemplate(projectsTemplate.value, [adaptedProject], 0, details, componentsHeight.value)
    }
  }

  const getDrawerHeight = () => {
    if (expanded.value) {
      return componentsHeight.value[0] ? `${componentsHeight.value[0]}px` : 'auto'
    }
    return '0px'
  }

  const cardClass = props.variant === 'project' ? 'project-card' : 'work-nested-project-card'
</script>

<template>
  <div
    :class="[
      cardClass,
      {
        'mb-4': variant === 'project',
        'mt-4': variant === 'work-nested',
        'before:opacity-0 after:opacity-100': expanded,
      },
    ]"
    v-motion
    :initial="{ opacity: 0, x: -30 }"
    :visible-once="{ opacity: 1, x: 0 }"
    :transition="{
      delay: index * 200,
      duration: 600,
      type: 'spring',
      stiffness: 80,
    }"
    @dblclick.stop="toggleDetails"
  >
    <!-- 卡片头部 -->
    <div
      class="card-header flex justify-between items-center p-6 cursor-pointer"
      @click.stop="toggleDetails"
    >
      <div class="header-left flex-1">
        <h3 class="text-xl font-semibold text-primary m-0">{{ project.title }}</h3>
        <span v-if="project.duration" class="duration text-text-secondary text-sm">
          {{ project.duration }}
        </span>
      </div>
      <span
        v-if="project.role"
        class="role-tag bg-[rgb(var(--color-secondary))] text-[rgb(var(--color-gray-50))] px-3 py-1 rounded-full text-sm"
      >
        {{ project.role }}
      </span>
    </div>

    <!-- 抽屉容器 -->
    <div
      class="drawer-wrapper overflow-hidden transition-all duration-500 ease-in-out"
      :style="{
        height: getDrawerHeight(),
        opacity: expanded ? 1 : 0,
      }"
    >
      <div
        class="drawer-content project-drawer-content px-6 pb-6 border-t border-b-[rgb(var(--card-border))]"
      >
        <!-- 项目亮点 -->
        <ul class="highlights-list my-[16px]">
          <template v-for="(item, x) in projectsTemplate[0]" :key="x">
            <li
              v-if="item.length"
              :data-level="flattenedHighlights[x].level"
              :style="{ paddingLeft: `${flattenedHighlights[x].level * 1.5}em` }"
              class="highlight-item"
            >
              <span v-html="renderInlineMarkdown(item)"></span>
            </li>
          </template>
        </ul>

        <!-- 技术栈 -->
        <div v-if="project.techStack?.length" class="tech-stack flex flex-wrap gap-2">
          <span
            v-for="(tech, techIndex) in project.techStack"
            :key="`${tech}-${expanded}`"
            class="tech-tag"
            v-motion
            :initial="{ opacity: 0, x: -30 }"
            :enter="{
              opacity: 1,
              x: 0,
              transition: {
                delay: 200 + techIndex * 100,
                duration: 600,
                type: 'spring',
                stiffness: 100,
              },
            }"
          >
            {{ tech }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
  /* 仅保留工作经历嵌套项目的特殊样式 */
  .work-nested-project-card {
    background-color: rgb(var(--card-bg));
    border-radius: var(--border-radius-card);
    border: var(--border-width-1) solid rgb(var(--card-border));
    overflow: hidden;
    transition: all var(--duration-normal) var(--ease-out);

    &:hover {
      background-color: rgb(var(--color-gray-50));
    }
  }
</style>
