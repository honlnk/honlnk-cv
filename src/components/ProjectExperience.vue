<script setup lang="ts">
  import type { ResumeData } from '@/types/types'
  import { ref } from 'vue'

  defineProps<{
    projects: ResumeData['projects']
  }>()

  const expandedProject = ref<string | null>(null)
  const expandingHeight = ref<{ [key: string]: number }>({})

  const toggleDetails = (title: string, event: MouseEvent) => {
    const card = (event.currentTarget as HTMLElement).closest('.project-card') as HTMLElement
    const details = card?.querySelector('.drawer-content') as HTMLElement

    if (expandedProject.value === title) {
      // 收起时保存当前高度
      if (details) {
        expandingHeight.value[title] = details.scrollHeight
      }
      expandedProject.value = null
    } else {
      // 展开时计算并设置高度
      if (details) {
        expandingHeight.value[title] = details.scrollHeight
      }
      expandedProject.value = title
    }
  }

  const getDrawerHeight = (title: string) => {
    if (expandedProject.value === title) {
      return expandingHeight.value[title] ? `${expandingHeight.value[title]}px` : 'auto'
    }
    return '0px'
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
        'ring-2 ring-secondary/20': expandedProject === project.title,
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
      @click="toggleDetails(project.title, $event)"
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
          height: getDrawerHeight(project.title),
          opacity: expandedProject === project.title ? 1 : 0,
        }"
      >
        <div class="drawer-content px-6 pb-6 border-t border-b-[rgb(var(--card-border))]">
          <!-- 项目亮点 -->
          <ul class="highlights my-4">
            <li
              v-for="(item, index) in project.highlights"
              :key="index"
              class="text-text-primary flex items-start"
            >
              <span class="text-secondary mr-2 mt-1">•</span>
              <span>{{ item }}</span>
            </li>
          </ul>
          <div class="tech-stack flex flex-wrap gap-2">
            <span v-for="tech in project.techStack" :key="tech" class="tech-tag">
              {{ tech }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
