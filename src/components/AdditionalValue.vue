<script setup lang="ts">
import type { ResumeData } from '@/types/types'
import { getSafeEmoji } from '@/utils/emoji-parser'

defineProps<{
  values: ResumeData['additionalValues']
}>()
</script>

<template>
  <section class="section additional-value" id="additional">
    <h2 class="section-title">{{ getSafeEmoji('🌟') }} 附加价值</h2>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="(item, index) in values"
        :key="index"
        class="card card-hover text-center"
        v-motion
        :initial="{ opacity: 0, scale: 0.9, y: 20 }"
        :visible-once="{ opacity: 1, scale: 1, y: 0 }"
        :transition="{
          delay: index * 150,
          duration: 700,
          type: 'spring',
          stiffness: 120
        }"
      >
        <div class="text-4xl mb-4">{{ getSafeEmoji(item.icon) }}</div>
        <h3 class="card-title text-lg font-semibold text-secondary mb-2">{{ item.title }}</h3>
        <div class="card-content text-text-secondary leading-relaxed space-y-2">
          <p v-for="(line, lIndex) in item.content" :key="lIndex" class="m-0">
            {{ line }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
