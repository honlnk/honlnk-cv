<script setup lang="ts">
import type { ResumeData } from '@/data/resume-data'

defineProps<{
  data: ResumeData['education']
}>()
</script>

<template>
  <section class="section education" id="education">
    <h2 class="section-title">🎓 教育背景</h2>

    <div class="education-card">
      <div class="school-info">
        <h3 class="school-name">{{ data.school }}</h3>
        <div class="meta-info">
          <span class="major">{{ data.major }}</span>
          <span class="duration">{{ data.duration }}</span>
        </div>
      </div>

      <ul class="experience-list">
        <li
          v-for="(exp, index) in data.experiences"
          :key="index"
          class="experience-item"
        >
          <span class="bullet">•</span>
          {{ exp }}
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.education-card {
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.school-info {
  margin-bottom: 1.5rem;
}

.school-name {
  margin: 0 0 0.5rem 0;
  color: var(--primary-color);
}

.meta-info {
  display: flex;
  gap: 1rem;
  color: var(--text-secondary);
  font-size: 0.9em;
}

.experience-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.experience-item {
  padding: 0.8rem 0;
  display: flex;
  align-items: baseline;
  border-bottom: 1px solid #eee;
}

.bullet {
  color: var(--secondary-color);
  margin-right: 0.8rem;
  font-weight: bold;
}

.experience-item:last-child {
  border-bottom: none;
}
</style>
