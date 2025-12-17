<script setup lang="ts">
  import type { ResumeData } from '@/types/types'

  defineProps<{
    data: ResumeData['education']
  }>()
</script>

<template>
  <section class="section education" id="education">
    <h2 class="section-title">🎓 教育背景</h2>

    <div
      class="education-card"
      v-motion
      :initial="{ opacity: 0, y: 30 }"
      :visible-once="{ opacity: 1, y: 0 }"
      :transition="{
        delay: 300,
        duration: 600,
        type: 'spring',
        stiffness: 100,
      }"
    >
      <div class="school-info mb-6">
        <h3 class="text-xl font-semibold text-primary mb-2">{{ data.school }}</h3>
        <div class="flex flex-wrap gap-4 text-sm text-text-secondary">
          <span class="major">{{ data.major }}</span>
          <span class="duration">{{ data.duration }}</span>
        </div>
      </div>

      <ul class="education-experience-list">
        <li
          v-for="(exp, index) in data.experiences"
          :key="index"
        >
          <span>{{ exp }}</span>
        </li>
      </ul>
    </div>
  </section>
</template>
