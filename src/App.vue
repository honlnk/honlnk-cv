<script setup lang="ts">
  import AdditionalValue from '@/components/AdditionalValue.vue'
  import CoreAdvantages from '@/components/CoreAdvantages.vue'
  import EducationBackground from '@/components/EducationBackground.vue'
  import GitHubButton from '@/components/GitHubButton.vue'
  import Header from '@/components/Header.vue'
  import ProjectExperience from '@/components/ProjectExperience.vue'
  import ThemeToggle from '@/components/ThemeToggle.vue'
  import WorkExperience from '@/components/WorkExperience.vue'
  import { useResumeData } from '@/composables/useResumeData'
  import { onMounted } from 'vue'

  const { resumeData, isLoading, hasError, isEmpty, loadResumeData } = useResumeData()

  // 页面加载时获取简历数据
  onMounted(() => {
    loadResumeData()
  })
</script>

<template>
  <!-- 应用根容器 -->
  <div class="app-container">
    <!-- GitHub 按钮（fixed 定位 + 响应式 + 打印隐藏，均为简单样式，直接用工具类） -->
    <div
      class="fixed top-6 left-6 z-[1000] flex items-center justify-start max-[768px]:top-4 max-[768px]:left-4 max-[480px]:top-2 max-[480px]:left-2 print:hidden"
    >
      <GitHubButton show-text />
    </div>

    <!-- 主题切换按钮 -->
    <div
      class="fixed top-6 right-6 z-[1000] flex items-center justify-end max-[768px]:top-4 max-[768px]:right-4 max-[480px]:top-2 max-[480px]:right-2 print:hidden"
    >
      <ThemeToggle />
    </div>

    <!-- 简历容器 -->
    <div class="resume-container">
      <!-- 加载状态 -->
      <div v-if="isLoading" class="loading-state">
        <span class="state-icon i-lucide:loader-circle" aria-hidden="true"></span>
        <div class="loading-title">正在加载简历数据...</div>
      </div>

      <!-- 错误状态 -->
      <div v-else-if="hasError" class="error-state">
        <span class="state-icon i-lucide:triangle-alert" aria-hidden="true"></span>
        <div class="error-title">加载失败</div>
        <div class="error-message">抱歉，无法加载简历数据。请检查网络连接或稍后重试。</div>
        <button @click="loadResumeData" class="retry-btn">
          <span class="i-lucide:refresh-cw" aria-hidden="true"></span>
          <span>重新加载</span>
        </button>
      </div>

      <!-- 空数据状态 -->
      <div v-else-if="isEmpty" class="empty-state">
        <span class="state-icon i-lucide:inbox" aria-hidden="true"></span>
        <div class="empty-title">暂无简历数据</div>
        <div class="empty-message">请检查 README.md 文件是否存在并包含有效的简历信息。</div>
      </div>

      <!-- 正常内容 -->
      <template v-else-if="resumeData">
        <Header :data="resumeData" />

        <main class="content flex flex-col">
          <CoreAdvantages :advantages="resumeData.coreAdvantages" />
          <WorkExperience :work-experience="resumeData.workExperience" />
          <ProjectExperience :projects="resumeData.projects" />
          <EducationBackground :data="resumeData.education" />
          <AdditionalValue :values="resumeData.additionalValues" />
        </main>
      </template>
    </div>
  </div>
</template>

<style lang="scss">
  @use '@/styles/main.scss';
</style>
