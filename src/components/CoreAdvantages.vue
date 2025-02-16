<script setup lang="ts">
import type { ResumeData } from '@/data/resume-data'

defineProps<{
  advantages: ResumeData['coreAdvantages']
}>()
</script>

<template>
  <section class="section core-advantages" id="core">
    <h2 class="section-title">🔍 核心优势</h2>

    <div class="advantage-grid">
      <div
        v-for="(item, index) in advantages"
        :key="index"
        class="advantage-card"
      >
        <h3 class="card-title">{{ item.title }}</h3>
        <ul class="advantage-list">
          <li
            v-for="(point, pIndex) in item.items"
            :key="pIndex"
            class="advantage-item"
          >
            {{ point }}
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<style scoped>
.advantage-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.advantage-card {
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.card-title {
  color: var(--secondary-color);
  margin: 0 0 1rem 0;
  font-size: 1.2em;
}

.advantage-list {
  list-style: none;
  padding: 0;
}

.advantage-item {
  padding: 0.8rem 0;
  border-bottom: 1px solid #eee;
  position: relative;
  padding-left: 1.5rem;
}

.advantage-item:last-child {
  border-bottom: none;
}

.advantage-item::before {
  content: "▹";
  position: absolute;
  left: 0;
  color: var(--secondary-color);
}

@media (max-width: 768px) {
  .advantage-grid {
    grid-template-columns: 1fr;
  }
}
</style>
