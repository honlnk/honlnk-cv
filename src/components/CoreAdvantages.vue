<script setup lang="ts">
import type { ResumeData } from '@/types/types'

defineProps<{
  advantages: ResumeData['coreAdvantages']
}>()
</script>

<template>
  <section class="section core-advantages" id="core">
    <h2 class="section-title">🔍 核心优势</h2>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="(item, index) in advantages"
        :key="index"
        class="card card-hover"
        v-motion
        :initial="{ opacity: 0, y: 30, scale: 0.95 }"
        :visible-once="{ opacity: 1, y: 0, scale: 1 }"
        :transition="{
          delay: index * 150,
          duration: 600,
          type: 'spring',
          stiffness: 100
        }"
      >
        <h3 class="text-lg font-semibold text-secondary mb-4">{{ item.title }}</h3>
        <ul class="space-y-0">
          <li
            v-for="(point, pIndex) in item.items"
            :key="pIndex"
            class="relative pl-6 py-3 border-b border-gray-100 last:border-b-0"
          >
            <span class="absolute left-0 text-secondary">▹</span>
            <span>{{ point }}</span>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>
