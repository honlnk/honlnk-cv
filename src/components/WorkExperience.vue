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
  <section class="section work-experience" id="work">
    <h2 class="section-title">💼 工作经历</h2>

    <div
      v-for="(work, index) in workExperience"
      :key="work.company"
      class="work-card"
      :class="{
        'mb-4': index !== workExperience.length - 1,
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
      <div class="card-header flex justify-between items-center p-6 cursor-pointer">
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

      <!-- 抽屉容器 -->
      <div
        class="drawer-wrapper overflow-hidden transition-all duration-500 ease-in-out"
        :style="{
          height: getDrawerHeight(work.company),
          opacity: expandedWork.has(work.company) ? 1 : 0,
        }"
      >
        <div class="drawer-content work-drawer-content px-6 pb-6 border-t border-b-[rgb(var(--card-border))]">
          <!-- 工作职责 -->
          <div
            v-if="work.responsibilities && work.responsibilities.length > 0"
            class="work-section"
          >
            <h4 class="work-section-title">
              <span class="icon">📋</span>
              工作职责
            </h4>
            <ul class="highlights-list my-4">
              <li
                v-for="(item, index) in work.responsibilities"
                :key="index"
              >
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
            <ul class="highlights-list my-4">
              <li v-for="(achievement, index) in work.achievements" :key="index" class="flex items-start">
                <span class="star-icon text-warning mr-2">⭐</span>
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
