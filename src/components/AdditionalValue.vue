<script setup lang="ts">
import type { ResumeData } from '@/data/resume-data'

defineProps<{
  values: ResumeData['additionalValues']
}>()
</script>

<template>
  <section class="section additional-value" id="additional">
    <h2 class="section-title">🌟 附加价值</h2>

    <div class="value-grid">
      <div
        v-for="(item, index) in values"
        :key="index"
        class="value-card"
      >
        <div class="card-icon">{{ item.icon }}</div>
        <h3 class="card-title">{{ item.title }}</h3>
        <div class="card-content">
          <p v-for="(line, lIndex) in item.content" :key="lIndex">
            {{ line }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.value-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}

.value-card {
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  text-align: center;
}

.card-icon {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.card-title {
  color: var(--secondary-color);
  margin: 0.5rem 0;
}

.card-content {
  color: var(--text-secondary);
  line-height: 1.6;
  margin: 0;
}

@media (max-width: 768px) {
  .value-grid {
    grid-template-columns: 1fr;
  }
}
</style>
