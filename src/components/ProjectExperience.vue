<script setup lang="ts">
  import type { ResumeData } from '@/types/types'
  import { ref } from 'vue'
  import TypewriterMarkdown from './TypewriterMarkdown.vue'

  defineProps<{
    projects: ResumeData['projects']
  }>()

  // 简化状态管理：只控制展开/收起状态
  const expandedProjects = ref<Set<string>>(new Set())
  const typewriterRefs = ref<{ [key: string]: InstanceType<typeof TypewriterMarkdown> }>({})

  const toggleDetails = (title: string) => {
    console.log('ProjectExperience: toggleDetails called for', title)

    if (expandedProjects.value.has(title)) {
      // 收起操作
      expandedProjects.value.delete(title)
      console.log('ProjectExperience: Closed project', title)

      // 暂停打字效果（如果正在打字）
      const typewriter = typewriterRefs.value[title]
      if (typewriter && typewriter.isTyping) {
        typewriter.pauseTyping()
      }
    } else {
      // 展开操作
      expandedProjects.value.add(title)
      console.log('ProjectExperience: Opened project', title)

      const typewriter = typewriterRefs.value[title]
      if (typewriter) {
        // 检查是否已经完成过打字
        if (typewriter.isCompleted) {
          console.log('ProjectExperience: Typewriter already completed for', title)
          // 如果已经完成过，不需要重新开始，内容已经完整显示
        } else {
          // 如果还没有完成，延迟开始打字
          setTimeout(() => {
            console.log('ProjectExperience: Starting typewriter for', title)
            typewriter.startTyping()
          }, 400)
        }
      } else {
        console.log('ProjectExperience: No typewriter ref found for', title)
      }
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
      @click="toggleDetails(project.title)"
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
      <div class="drawer-wrapper" :class="{ expanded: expandedProjects.has(project.title) }">
        <div class="drawer-content px-6 pb-6 border-t border-b-[rgb(var(--card-border))]">
          <!-- 项目亮点 - 使用打字机效果 -->
          <div class="highlights-section my-4">
            <TypewriterMarkdown
              :ref="
                el =>
                  (typewriterRefs[project.title] = el as InstanceType<typeof TypewriterMarkdown>)
              "
              :markdown="project.highlights"
              :speed="25"
              :auto-start="false"
              :show-cursor="true"
              :show-skip-button="true"
              :show-progress="false"
            />
          </div>

          <!-- 技术栈 -->
          <div
            v-if="project.techStack && project.techStack.length > 0"
            class="tech-stack flex flex-wrap gap-2 mt-4"
          >
            <span
              v-for="(tech, index) in project.techStack"
              :key="`${tech}-${project.title}`"
              class="tech-tag"
              v-motion
              :initial="{ opacity: 0, x: -30 }"
              :visible-once="expandedProjects.has(project.title)"
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

<style scoped>
  /* 抽屉动画样式 */
  .drawer-wrapper {
    overflow: hidden;
    max-height: 0;
    opacity: 0;
    transition:
      max-height 0.4s ease-out,
      opacity 0.3s ease-out;
  }

  .drawer-wrapper.expanded {
    max-height: 3000px; /* 设置一个足够大的值来容纳内容 */
    opacity: 1;
  }

  /* 技术标签样式 */
  .tech-tag {
    @apply px-3 py-1 text-sm rounded-full bg-[rgb(var(--color-secondary))] text-[rgb(var(--color-gray-50))];
  }

  /* 项目卡片基本样式 */
  .project-card {
    @apply bg-[rgb(var(--card-bg))] border border-[rgb(var(--card-border))] rounded-lg shadow-sm hover:shadow-md transition-all duration-200;
  }

  .project-card .card-header {
    transition: background-color 0.2s ease;
  }

  .project-card:hover .card-header {
    background-color: rgba(var(--color-primary), 0.02);
  }

  /* 高亮部分样式 */
  .highlights-section {
    line-height: 1.6;
  }

  .highlights-section :deep(.typewriter-content) {
    margin-top: 0;
  }

  .highlights-section :deep(.typewriter-content > *:first-child) {
    margin-top: 0;
  }
</style>
