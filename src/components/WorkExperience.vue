<script setup lang="ts">
  import type { WorkExperienceData } from '@/types/types'
  import { ref } from 'vue'

  defineProps<{
    workExperience: WorkExperienceData[]
  }>()

  const expandedWork = ref<Set<string>>(new Set())
  const expandingHeight = ref<{ [key: string]: number }>({})

  const toggleDetails = (company: string, event: MouseEvent) => {
    const card = (event.currentTarget as HTMLElement).closest('.work-card') as HTMLElement
    const details = card?.querySelector('.work-drawer-content') as HTMLElement

    if (expandedWork.value.has(company)) {
      // 收起时保存当前高度
      if (details) {
        expandingHeight.value[company] = details.scrollHeight
      }
      expandedWork.value.delete(company)
    } else {
      // 展开时计算并设置高度
      if (details) {
        expandingHeight.value[company] = details.scrollHeight
      }
      expandedWork.value.add(company)
    }
  }

  const getDrawerHeight = (company: string) => {
    if (expandedWork.value.has(company)) {
      return expandingHeight.value[company] ? `${expandingHeight.value[company]}px` : 'auto'
    }
    return '0px'
  }
</script>

<template>
  <section class="section">
    <h2 class="section-title">💼 工作经历</h2>

    <div
      v-for="(work, index) in workExperience"
      :key="work.company"
      class="work-card"
      :class="{
        'before:opacity-0 after:opacity-100': expandedWork.has(work.company),
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
      @click="toggleDetails(work.company, $event)"
    >
      <div class="work-card-header">
        <div class="work-card-header-left">
          <h3 class="work-card-company">{{ work.company }}</h3>
          <span class="work-card-duration">{{ work.duration }}</span>
        </div>
        <span class="position-tag">
          {{ work.position }}
        </span>
      </div>

      <!-- 抽屉容器 -->
      <div
        class="work-drawer-wrapper overflow-hidden transition-all duration-500 ease-in-out"
        :style="{
          height: getDrawerHeight(work.company),
          opacity: expandedWork.has(work.company) ? 1 : 0,
        }"
      >
        <div class="work-drawer-content">
          <!-- 工作职责 -->
          <div
            v-if="work.responsibilities && work.responsibilities.length > 0"
            class="work-section"
          >
            <h4 class="work-section-title">
              <span class="icon">📋</span>
              工作职责
            </h4>
            <ul class="work-list">
              <li v-for="(item, index) in work.responsibilities" :key="index">
                <span>{{ item }}</span>
              </li>
            </ul>
          </div>

          <!-- 主要成就 -->
          <div v-if="work.achievements && work.achievements.length > 0" class="work-section">
            <h4 class="work-section-title">
              <span class="icon">🏆</span>
              主要成就
            </h4>
            <ul class="work-list">
              <li v-for="(achievement, index) in work.achievements" :key="index" class="">
                <span class="star-icon">⭐</span>
                <span>{{ achievement }}</span>
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
  .empty-state {
    @apply border-2 border-dashed;
  }

  /* 打印样式 */
  @media print {
    .work-card {
      @apply break-inside-avoid shadow-none border;
    }

    .work-drawer-wrapper {
      @apply opacity-100;
    }

    .work-card-header {
      @apply cursor-default;
    }
  }
</style>
