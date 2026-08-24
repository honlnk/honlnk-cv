<script setup lang="ts">
  import type { WorkExperienceData } from '@/types/types'
  import { renderInlineMarkdown } from '@/utils/markdown-renderer'
  import BaseProjectCard from './BaseProjectCard.vue'

  defineProps<{
    workExperience: WorkExperienceData[]
  }>()
</script>

<template>
  <section class="section work-experience" id="work">
    <h2 class="section-title"><span class="section-index">02</span>工作经历</h2>

    <div
      v-for="(work, workIndex) in workExperience"
      :key="work.company"
      class="work-item"
      :class="{ 'mt-10': workIndex > 0 }"
    >
      <!-- 工作经历头部 -->
      <div class="item-header">
        <h3 class="text-lg font-semibold text-primary m-0">{{ work.company }}</h3>
        <div class="flex items-center gap-3 flex-wrap">
          <span class="role-chip">{{ work.position }}</span>
          <span class="duration">{{ work.duration }}</span>
        </div>
      </div>

      <div class="mt-5">
        <!-- 项目列表 -->
        <template v-if="work.projects && work.projects.length > 0">
          <BaseProjectCard
            v-for="project in work.projects"
            :key="project.title"
            :project="project"
            variant="work-nested"
          />
        </template>

        <!-- 公司级主要成就 -->
        <template v-if="work.companyAchievements && work.companyAchievements.length > 0">
          <h4 class="subsection-title">主要成就</h4>
          <ul class="marker-list">
            <li v-for="(achievement, achIndex) in work.companyAchievements" :key="achIndex">
              <span v-html="renderInlineMarkdown(achievement)"></span>
            </li>
          </ul>
        </template>
      </div>
    </div>

    <!-- 空状态 -->
    <div
      v-if="!workExperience || workExperience.length === 0"
      class="empty-state text-center py-12 text-text-secondary"
    >
      <span class="state-icon i-lucide:briefcase" aria-hidden="true"></span>
      <p>暂无工作经历信息</p>
    </div>
  </section>
</template>

<style scoped lang="scss">
  .subsection-title {
    font-size: var(--font-size-base);
    font-weight: var(--font-weight-semibold);
    color: rgb(var(--color-text-primary));
    margin: var(--spacing-lg) 0 var(--spacing-sm);
  }
</style>
