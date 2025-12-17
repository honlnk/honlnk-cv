<script setup lang="ts">
  import type { ResumeData } from '@/types/types'
  import { ref } from 'vue'

  defineProps<{
    projects: ResumeData['projects']
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
      v-for="(project, index) in projects"
      :key="project.title"
      class="project-card"
      :class="{
        'mb-4': index !== projects.length - 1,
        'ring-2 ring-secondary/20': expandedProject === project.title
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
    >
      <div
        class="card-header flex justify-between items-center p-6 cursor-pointer"
        @click="toggleDetails(project.title)"
      >
        <div class="header-left flex-1">
          <h3 class="text-xl font-semibold text-primary m-0">{{ project.title }}</h3>
          <span class="duration text-text-secondary text-sm">{{ project.duration }}</span>
        </div>
        <span
          class="role-tag bg-[rgb(var(--color-secondary))] text-[rgb(var(--color-gray-50))] px-3 py-1 rounded-full text-sm"
        >
          {{ project.role }}
        </span>
      </div>

      <transition
        name="slide"
        enter-active-class="transition-all duration-300 ease-out"
        leave-active-class="transition-all duration-300 ease-in"
        enter-from-class="opacity-0 transform -translate-y-2"
        enter-to-class="opacity-100 transform translate-y-0"
        leave-from-class="opacity-100 transform translate-y-0"
        leave-to-class="opacity-0 transform -translate-y-2"
      >
        <div
          v-if="expandedProject === project.title"
          class="card-details px-6 pb-6 border-t border-b-[rgb(var(--card-border))]"
        >
          <ul class="highlights my-4 ">
            <li
              v-for="(item, index) in project.highlights"
              :key="index"
              class="text-text-primary flex items-start"
            >
              <span class="text-secondary mr-2 mt-1">•</span>
              <span>{{ item }}</span>
            </li>
          </ul>
          <div class="tech-stack flex flex-wrap gap-2">
            <span v-for="tech in project.techStack" :key="tech" class="tech-tag">
              {{ tech }}
            </span>
          </div>
        </div>
      </transition>
    </div>
  </section>
</template>
