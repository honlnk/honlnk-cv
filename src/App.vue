<script setup lang="ts">
import { resumeData } from '@/data/resume-data'
import Header from '@/components/Header.vue'
import CoreAdvantages from '@/components/CoreAdvantages.vue'
import ProjectExperience from '@/components/ProjectExperience.vue'
import EducationBackground from '@/components/EducationBackground.vue'
import AdditionalValue from '@/components/AdditionalValue.vue'

// 章节配置
</script>

<template>
  <div class="resume-container">
      <Header :data="resumeData" />

    <main class="content">
      <CoreAdvantages :advantages="resumeData.coreAdvantages" />

        <ProjectExperience :projects="resumeData.projects" />

        <EducationBackground :data="resumeData.education" />

      <AdditionalValue :values="resumeData.additionalValues" />
    </main>
  </div>
</template>

<style>
@import '@/assets/styles/variables.css';
@import '@/assets/styles/main.css';


.resume-container {
  max-width: 660px;
  margin: 0 auto;
  padding: 2rem;
}

.content {
  margin-top: 2rem;
}
</style>
