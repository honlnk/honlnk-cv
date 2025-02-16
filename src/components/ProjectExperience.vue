<script setup lang="ts">
import { ref } from 'vue'
import type { Project } from '@/data/resume-data'

defineProps<{
  projects: Project[]
}>()

const expandedProject = ref<string | null>(null)

const toggleDetails = (title: string) => {
  expandedProject.value = expandedProject.value === title ? null : title
}
</script>

<template>
  <section class="section projects">
    <h2 class="section-title">🚀 项目经历</h2>

    <div
      v-for="project in projects"
      :key="project.title"
      class="project-card"
      :class="{ expanded: expandedProject === project.title }"
    >
      <div class="card-header" @click="toggleDetails(project.title)">
        <div class="header-left">
          <h3>{{ project.title }}</h3>
          <span class="duration">{{ project.duration }}</span>
        </div>
        <span class="role-tag">{{ project.role }}</span>
      </div>

      <transition name="slide">
        <div v-if="expandedProject === project.title" class="card-details">
          <ul class="highlights">
            <li v-for="(item, index) in project.highlights" :key="index">
              {{ item }}
            </li>
          </ul>
          <div class="tech-stack">
            <span v-for="tech in project.techStack" :key="tech" class="tech-tag">
              {{ tech }}
            </span>
          </div>
        </div>
      </transition>
    </div>
  </section>
</template>

<style scoped>
.projects {
  margin: 2rem 0;
}

.project-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  margin-bottom: 1rem;
  transition: all 0.3s ease;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  cursor: pointer;
}

.header-left h3 {
  margin: 0;
  color: #2c3e50;
}

.duration {
  color: #7f8c8d;
  font-size: 0.9em;
}

.role-tag {
  background: #3498db;
  color: white;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.9em;
}

.card-details {
  padding: 0 1.5rem 1.5rem;
  border-top: 1px solid #eee;
}

.highlights li {
  margin: 0.8rem 0;
  color: #34495e;
}

.tech-tag {
  display: inline-block;
  background: #ecf0f1;
  padding: 4px 12px;
  margin: 4px;
  border-radius: 4px;
  font-size: 0.85em;
}

.slide-enter-active {
  transition: all 0.3s ease-out;
}

.slide-leave-active {
  transition: all 0.2s ease-in;
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
