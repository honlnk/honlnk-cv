<script setup lang="ts">
  import type { WorkExperienceData } from '@/types/types'
  import { renderInlineMarkdown } from '@/utils/markdown-renderer'
  import { ref } from 'vue'
  import BaseProjectCard from './BaseProjectCard.vue'

  const props = defineProps<{
    workExperience: WorkExperienceData[]
  }>()

  // 工作经历展开状态
  const expandedWork = ref<Set<string>>(new Set())
  const expandingHeight = ref<{ [key: string]: number }>({})

  // 防抖定时器存储：为每个公司维护独立的定时器
  const toggleTimers = ref<{ [key: string]: ReturnType<typeof setTimeout> | null }>({})

  const toggleWorkDetails = (company: string, event: MouseEvent) => {
    // 清除该公司的之前定时器
    if (toggleTimers.value[company]) {
      clearTimeout(toggleTimers.value[company]!)
      toggleTimers.value[company] = null
    }

    const card = (event.currentTarget as HTMLElement).closest('.work-card') as HTMLElement
    const details = card?.querySelector('.work-drawer-content') as HTMLElement

    // 延迟执行，等待双击检测
    toggleTimers.value[company] = setTimeout(() => {
      if (expandedWork.value.has(company)) {
        if (details) {
          expandingHeight.value[company] = details.scrollHeight
        }
        expandedWork.value.delete(company)
      } else {
        if (details) {
          expandingHeight.value[company] = details.scrollHeight
        }
        expandedWork.value.add(company)
      }
    }, 250) // 250ms 延迟，足够检测是否为双击
  }

  const getDrawerHeight = (company: string) => {
    if (expandedWork.value.has(company)) {
      return expandingHeight.value[company] ? `${expandingHeight.value[company]}px` : 'auto'
    }
    return '0px'
  }

  // 计算项目的全局索引（用于动画延迟）
  const getProjectIndex = (workIndex: number, projectIndex: number) => {
    let previousProjects = 0
    for (let i = 0; i < workIndex; i++) {
      previousProjects += props.workExperience[i].projects.length
    }
    return previousProjects + projectIndex
  }
</script>

<template>
  <section class="section work-experience" id="work">
    <h2 class="section-title">💼 工作经历</h2>

    <div
      v-for="(work, workIndex) in workExperience"
      :key="work.company"
      class="work-card"
      :class="{
        'mb-4': workIndex !== workExperience.length - 1,
      }"
      v-motion
      :initial="{ opacity: 0, x: -30 }"
      :visible-once="{ opacity: 1, x: 0 }"
      :transition="{
        delay: workIndex * 200,
        duration: 600,
        type: 'spring',
        stiffness: 80,
      }"
      @dblclick="toggleWorkDetails(work.company, $event)"
    >
      <!-- 工作经历头部（始终可见） -->
      <div
        class="card-header flex justify-between items-center p-6 cursor-pointer"
        @click.stop="toggleWorkDetails(work.company, $event)"
      >
        <div class="header-left flex-1">
          <h3 class="text-xl font-semibold text-primary m-0">{{ work.company }}</h3>
          <span class="duration text-text-secondary text-sm">{{ work.duration }}</span>
        </div>
        <span
          class="role-tag bg-[rgb(var(--accent-work))] text-[rgb(var(--color-gray-50))] px-3 py-1 rounded-full text-sm"
        >
          {{ work.position }}
        </span>
      </div>

      <!-- 工作经历详情抽屉 -->
      <div
        class="drawer-wrapper overflow-hidden transition-all duration-500 ease-in-out relative"
        :style="{
          height: getDrawerHeight(work.company),
          opacity: expandedWork.has(work.company) ? 1 : 0,
        }"
      >
        <!-- 固定的顶部边框 -->
        <div class="absolute top-0 left-0 right-0 h-px z-1 bg-[rgb(var(--card-border))]"></div>

        <div
          class="drawer-content work-drawer-content px-6 overflow-y-auto"
          :style="{
            maxHeight: '100%',
            boxSizing: 'border-box',
          }"
        >
          <!-- 项目列表 -->
          <div v-if="work.projects && work.projects.length > 0" class="projects-section">
            <h4 class="work-section-title">
              <span class="icon">📁</span>
              项目经验
            </h4>

            <BaseProjectCard
              v-for="(project, projectIndex) in work.projects"
              :key="project.title"
              :project="project"
              :index="getProjectIndex(workIndex, projectIndex)"
              variant="work-nested"
            />
          </div>

          <!-- 公司级主要成就 -->
          <div
            v-if="work.companyAchievements && work.companyAchievements.length > 0"
            class="company-achievements-section mt-6"
          >
            <h4 class="work-section-title">
              <span class="icon">🏆</span>
              主要成就
            </h4>
            <ul class="achievements-list mb-0">
              <li
                v-for="(achievement, achIndex) in work.companyAchievements"
                :key="achIndex"
                class="flex items-start"
              >
                <span class="star-icon text-warning mr-2">⭐</span>
                <span v-html="renderInlineMarkdown(achievement)"></span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <!-- 空状态 -->
    <div
      v-if="!workExperience || workExperience.length === 0"
      class="card-base empty-state text-center py-12 text-text-secondary"
      v-motion
      :initial="{ opacity: 0 }"
      :visible-once="{ opacity: 1 }"
    >
      <div class="text-4xl mb-4">💼</div>
      <p>暂无工作经历信息</p>
    </div>
  </section>
</template>

<style scoped>
  /* 覆盖全局的 border-top，使用固定的顶部边框元素 */
  .work-drawer-content {
    border-top: none !important;
  }

  /* 自定义滚动条 - Webkit 浏览器 (Chrome, Safari, Edge) */
  .work-drawer-content::-webkit-scrollbar {
    width: 6px;
  }

  .work-drawer-content::-webkit-scrollbar-track {
    background: transparent;
    border-radius: 10px;
  }

  .work-drawer-content::-webkit-scrollbar-thumb {
    background: rgb(var(--accent-work));
    border-radius: 10px;
    transition: background 0.3s ease;
  }

  .work-drawer-content::-webkit-scrollbar-thumb:hover {
    background: rgb(var(--color-primary));
  }

  /* Firefox 浏览器滚动条样式 */
  .work-drawer-content {
    scrollbar-width: thin;
    scrollbar-color: rgb(var(--accent-work)) transparent;
  }

  /* 暗色模式适配 */
  [data-theme='dark'] .work-drawer-content::-webkit-scrollbar-thumb {
    opacity: 0.6;
  }

  [data-theme='dark'] .work-drawer-content::-webkit-scrollbar-thumb:hover {
    opacity: 1;
  }
</style>
