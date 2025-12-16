<script setup lang="ts">
  import { onMounted } from 'vue'
  import { useResumeData } from '@/composables/useResumeData'
  import Header from '@/components/Header.vue'
  import CoreAdvantages from '@/components/CoreAdvantages.vue'
  import ProjectExperience from '@/components/ProjectExperience.vue'
  import EducationBackground from '@/components/EducationBackground.vue'
  import AdditionalValue from '@/components/AdditionalValue.vue'

  const { resumeData, isLoading, hasError, isEmpty, loadResumeData } = useResumeData()

  // 页面加载时获取简历数据
  onMounted(() => {
    loadResumeData()
  })
</script>

<template>
  <div class="resume-container">
    <!-- 加载状态 -->
    <div v-if="isLoading" class="loading-state">
      <p>正在加载简历数据...</p>
    </div>

    <!-- 错误状态 -->
    <div v-else-if="hasError" class="error-state">
      <p>❌ 加载简历数据失败</p>
      <button @click="loadResumeData" class="retry-btn">重试</button>
    </div>

    <!-- 空数据状态 -->
    <div v-else-if="isEmpty" class="empty-state">
      <p>📝 暂无简历数据</p>
    </div>

    <!-- 正常内容 -->
    <template v-else-if="resumeData">
      <Header :data="resumeData" />

      <main class="content">
        <CoreAdvantages :advantages="resumeData.coreAdvantages" />
        <ProjectExperience :projects="resumeData.projects" />
        <EducationBackground :data="resumeData.education" />
        <AdditionalValue :values="resumeData.additionalValues" />
      </main>
    </template>
  </div>
</template>

<style>
  @import '@/assets/styles/variables.css';
  @import '@/assets/styles/main.css';

  .resume-container {
    /* max-width: 660px; */
    margin: 0 10rem;
    padding: 2rem;
  }

  .content {
    margin-top: 2rem;
  }

  /* 状态样式 */
  .loading-state,
  .error-state,
  .empty-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 200px;
    text-align: center;
  }

  .error-state p {
    color: rgb(var(--error));
    margin-bottom: 1rem;
  }

  .retry-btn {
    @apply btn-primary;
  }

  .empty-state p {
    color: rgb(var(--text-secondary));
  }
</style>
