<script setup lang="ts">
  import type { ResumeData } from '@/types/types'
  import BaseProjectCard from './BaseProjectCard.vue'

  defineProps<{
    projects: ResumeData['projects']
  }>()
</script>

<template>
  <section class="section projects">
    <h2 class="section-title">🚀 项目经历</h2>

    <BaseProjectCard
      v-for="(project, index) in projects"
      :key="project.title"
      :project="project"
      :index="index"
    />
  </section>
</template>
