<script setup lang="ts">
import type { ResumeData } from '@/data/resume-data'

defineProps<{
  data: ResumeData['education']
}>()
</script>

<template>
  <section class="section education" id="education">
    <h2 class="section-title">🎓 教育背景</h2>

    <div
      class="card card-hover"
      v-motion
      :initial="{ opacity: 0, y: 30 }"
      :visible-once="{ opacity: 1, y: 0 }"
      :transition="{
        delay: 300,
        duration: 600,
        type: 'spring',
        stiffness: 100
      }"
    >
      <div class="school-info mb-6">
        <h3 class="text-xl font-semibold text-primary mb-2">{{ data.school }}</h3>
        <div class="flex flex-wrap gap-4 text-sm text-text-secondary">
          <span class="major">{{ data.major }}</span>
          <span class="duration">{{ data.duration }}</span>
        </div>
      </div>

      <ul class="space-y-0">
        <li
          v-for="(exp, index) in data.experiences"
          :key="index"
          class="flex items-start py-3 border-b border-gray-100 last:border-b-0"
        >
          <span class="text-secondary font-bold mr-3 mt-1">•</span>
          <span class="flex-1">{{ exp }}</span>
        </li>
      </ul>
    </div>
  </section>
</template>
