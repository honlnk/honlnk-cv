<script setup lang="ts">
  import type { WorkExperienceData } from '@/types/types'
  import { renderInlineMarkdown, renderNestedList } from '@/utils/markdown-renderer'
  import { ref } from 'vue'

  defineProps<{
    workExperience: WorkExperienceData[]
  }>()

  // 工作经历展开状态
  const expandedWork = ref<Set<string>>(new Set())
  const expandingHeight = ref<{ [key: string]: number }>({})

  // 项目展开状态
  const expandedProjects = ref<Set<string>>(new Set())
  const projectHeight = ref<{ [key: string]: number }>({})

  const toggleWorkDetails = (company: string, event: MouseEvent) => {
    const card = (event.currentTarget as HTMLElement).closest('.work-card') as HTMLElement
    const details = card?.querySelector('.work-drawer-content') as HTMLElement

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
  }

  const toggleProjectDetails = (projectKey: string, event: MouseEvent) => {
    event.stopPropagation() // 防止触发工作经历的点击
    const projectCard = (event.currentTarget as HTMLElement).closest('.project-card') as HTMLElement
    const content = projectCard?.querySelector('.project-content') as HTMLElement

    if (expandedProjects.value.has(projectKey)) {
      if (content) {
        projectHeight.value[projectKey] = content.scrollHeight
      }
      expandedProjects.value.delete(projectKey)
    } else {
      if (content) {
        projectHeight.value[projectKey] = content.scrollHeight
      }
      expandedProjects.value.add(projectKey)
    }
  }

  const getDrawerHeight = (company: string) => {
    if (expandedWork.value.has(company)) {
      return expandingHeight.value[company] ? `${expandingHeight.value[company]}px` : 'auto'
    }
    return '0px'
  }

  const getProjectHeight = (projectKey: string) => {
    if (expandedProjects.value.has(projectKey)) {
      return projectHeight.value[projectKey] ? `${projectHeight.value[projectKey]}px` : 'auto'
    }
    return '0px'
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
    >
      <!-- 工作经历头部（始终可见） -->
      <div
        class="card-header flex justify-between items-center p-6 cursor-pointer"
        @click="toggleWorkDetails(work.company, $event)"
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
        class="drawer-wrapper overflow-hidden transition-all duration-500 ease-in-out"
        :style="{
          height: getDrawerHeight(work.company),
          opacity: expandedWork.has(work.company) ? 1 : 0,
        }"
      >
        <div
          class="drawer-content work-drawer-content px-6 pb-6 border-t border-b-[rgb(var(--card-border))]"
        >
          <!-- 项目列表 -->
          <div v-if="work.projects && work.projects.length > 0" class="projects-section">
            <h4 class="work-section-title">
              <span class="icon">📁</span>
              项目经验
            </h4>

            <div
              v-for="(project, projIndex) in work.projects"
              :key="`${work.company}-${project.title}`"
              class="project-card"
              :class="{ 'mt-4': projIndex > 0 }"
              v-motion
              :initial="{ opacity: 0, y: 20 }"
              :visible-once="{ opacity: 1, y: 0 }"
              :transition="{
                delay: projIndex * 100,
                duration: 400,
              }"
            >
              <!-- 项目头部 -->
              <div
                class="project-header flex justify-between items-center p-4 cursor-pointer hover:bg-[rgb(var(--color-gray-50))] rounded-lg transition-colors"
                @click="toggleProjectDetails(`${work.company}-${project.title}`, $event)"
              >
                <h5 class="project-title m-0 font-semibold text-lg">{{ project.title }}</h5>
                <span
                  class="expand-icon text-text-secondary transition-transform"
                  :class="{
                    'rotate-180': expandedProjects.has(`${work.company}-${project.title}`),
                  }"
                >
                  ▼
                </span>
              </div>

              <!-- 项目内容（可展开/收起） -->
              <div
                class="project-wrapper overflow-hidden transition-all duration-300 ease-in-out"
                :style="{
                  height: getProjectHeight(`${work.company}-${project.title}`),
                  opacity: expandedProjects.has(`${work.company}-${project.title}`) ? 1 : 0,
                }"
              >
                <div class="project-content px-4 pb-4">
                  <!-- 项目职责（嵌套列表） -->
                  <div
                    v-if="project.responsibilities && project.responsibilities.length > 0"
                    class="responsibilities-section"
                  >
                    <h6 class="subsection-title">📋 职责描述</h6>
                    <div
                      v-html="renderNestedList(project.responsibilities)"
                      class="nested-list-container my-3"
                    ></div>
                  </div>
                </div>
              </div>
            </div>
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
            <ul class="achievements-list my-4">
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
  .nested-list {
    list-style: none;
    padding-left: 0;
    margin: 0;
  }

  .nested-list-item {
    margin-bottom: 0.5rem;
    position: relative;
  }

  .nested-list-item .nested-list {
    padding-left: 1.5rem;
    margin-top: 0.5rem;
  }

  .nested-list-item::before {
    content: '•';
    color: rgb(var(--color-primary));
    font-weight: bold;
    display: inline-block;
    width: 1em;
    margin-left: -1em;
    position: absolute;
    left: 0.5em;
  }

  .nested-list .nested-list-item::before {
    content: '◦';
    color: rgb(var(--color-text-secondary));
  }

  .list-content {
    display: inline;
    margin-left: 1em;
  }

  .subsection-title {
    font-size: 0.95rem;
    font-weight: 600;
    color: rgb(var(--color-text-primary));
    margin-bottom: 0.5rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .project-title {
    color: rgb(var(--color-primary));
    flex: 1;
  }

  .expand-icon {
    font-size: 0.75rem;
    transition: transform 0.3s ease;
  }

  .achievements-list {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .achievements-list li {
    margin-bottom: 0.75rem;
    line-height: 1.6;
  }

  .star-icon {
    flex-shrink: 0;
    margin-top: 0.125rem;
  }
</style>
