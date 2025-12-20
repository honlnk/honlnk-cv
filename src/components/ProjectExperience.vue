<script setup lang="ts">
  import type { ResumeData } from '@/types/types'
  import { hideTemplate, initTemplate, showTemplate } from '@/utils/better-typing'
  import { renderInlineMarkdown } from '@/utils/markdown-renderer'
  import {  ref } from 'vue'

  const props = defineProps<{
    projects: ResumeData['projects']
  }>()

  const compontentsHeight = ref<Record<number, number>>({})
  const projectsTemplate = ref<string[][]>([])
  // 模板初始化
  initTemplate(projectsTemplate.value, props.projects, compontentsHeight.value)

  const expandedProjects = ref<Set<string>>(new Set())
  const expandingHeight = ref<{ [key: string]: number }>({})
  const toggleDetails = async (title: string, event: MouseEvent, index: number) => {
    const card = (event.currentTarget as HTMLElement).closest('.project-card') as HTMLElement
    const details = card?.querySelector('.drawer-content') as HTMLElement

    if (expandedProjects.value.has(title)) {
      if (details) {
        expandingHeight.value[title] = details.scrollHeight
      }
      expandedProjects.value.delete(title)

      // 隐藏模板
      hideTemplate(projectsTemplate.value, props.projects, index, compontentsHeight.value, 500)
    } else {
      // 展开时计算并设置高度
      if (details) {
        expandingHeight.value[title] = details.scrollHeight
      }
      expandedProjects.value.add(title)

      // 显示模板
      showTemplate(projectsTemplate.value, props.projects, index, details, compontentsHeight.value)
    }
  }
</script>

<template>
  <section class="section projects">
    <h2 class="section-title">🚀 项目经历</h2>

    <div
      v-for="(project, index) in projects"
      :key="project.title"
      class="project-card"
      :class="{
        'mb-4': index !== projects.length - 1,
        'before:opacity-0 after:opacity-100': expandedProjects.has(project.title),
      }"
      v-motion
      :initial="{ opacity: 0, x: -30 }"
      :visible-once="{ opacity: 1, x: 0 }"
      :transition="{
        delay: index * 200,
        duration: 600,
        type: 'spring',
        stiffness: 80,
      }"
      @click="toggleDetails(project.title, $event, index)"
    >
      <div class="card-header flex justify-between items-center p-6 cursor-pointer">
        <div class="header-left flex-1">
          <h3 class="text-xl font-semibold text-primary m-0">{{ project.title }}</h3>
          <span class="duration text-text-secondary text-sm">{{ project.duration }}</span>
        </div>
        <span
          class="role-tag bg-[rgb(var(--color-secondary))] text-[rgb(var(--color-gray-50))] px-3 py-1 rounded-full text-sm"
        >
          {{ project.role }}
        </span>
      </div>
      <!-- 抽屉容器 -->
      <div
        class="drawer-wrapper overflow-hidden transition-all duration-500 ease-in-out"
        :style="{
          height: compontentsHeight[index] + 'px',
          opacity: expandedProjects.has(project.title) ? 1 : 0,
        }"
      >
        <div
          class="drawer-content project-drawer-content px-6 pb-6 border-t border-b-[rgb(var(--card-border))]"
        >
          <!-- 项目亮点 -->
          <ul class="highlights-list my-4">
            <template v-for="(item, x) in projectsTemplate[index]" :key="x">
              <li v-if="item.length">
                <span v-html="renderInlineMarkdown(item)"></span>
              </li>
            </template>
          </ul>
          <div class="tech-stack flex flex-wrap gap-2">
            <span
              v-for="(tech, index) in project.techStack"
              :key="`${tech}-${expandedProjects.has(project.title)}`"
              class="tech-tag"
              v-motion
              :initial="{ opacity: 0, x: -30 }"
              :enter="{
                opacity: 1,
                x: 0,
                transition: {
                  delay: 200 + index * 100,
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
  </section>
</template>
