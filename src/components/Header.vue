<script setup lang="ts">
import type { ResumeData } from '@/data/resume-data'

defineProps<{
  data: ResumeData
}>()
</script>

<template>
  <header class="header-section">
    <div class="name-group">
      <h1 class="name">{{ data.name }}</h1>
      <h2 class="position">{{ data.position }}</h2>
    </div>

    <div class="contact-group">
      <div class="contact-item">
        <span class="icon">📍</span>
        <span>{{ data.contact.location }}</span>
      </div>
      <div class="contact-item">
        <span class="icon">💰</span>
        <span>{{ data.contact.salary }}</span>
      </div>
      <a class="contact-item" :href="`mailto:${data.contact.email}`">
        <span class="icon">✉️</span>
        <span>{{ data.contact.email }}</span>
      </a>
      <a class="contact-item" :href="`tel:${data.contact.phone}`">
        <span class="icon">📱</span>
        <span>{{ data.contact.phone }}</span>
      </a>
      <a rel="noopener noreferrer" class="contact-item" :href="data.contact.website" target="_blank">
        <span class="icon">🌐</span>
        <span>{{data.contact.website}}</span>
      </a>
      <a rel="noopener noreferrer" class="contact-item" :href="data.contact.gitee" target="_blank">
        <span class="icon">🐱</span>
        <span>{{data.contact.gitee}}</span>
      </a>
    </div>
  </header>
</template>

<style scoped>
.header-section {
  background: var(--header-bg);
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.name-group {
  margin-bottom: 1.5rem;
  text-align: center;
}

.name {
  font-size: 2.5rem;
  color: var(--primary-color);
  margin: 0;
}

.position {
  font-size: 1.2rem;
  color: var(--secondary-color);
  margin: 0.5rem 0;
}

.contact-group {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-top: 1.5rem;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  padding: 0.8rem;
  background: rgba(255,255,255,0.9);
  border-radius: 8px;
  transition: transform 0.2s ease;
  color: var(--text-primary);
  text-decoration: none;
}

.contact-item:hover {
  transform: translateY(-2px);
  background: rgba(255,255,255,1);
}

.icon {
  font-size: 1.2em;
}

@media (max-width: 768px) {
  .name {
    font-size: 2rem;
  }

  .contact-group {
    grid-template-columns: 1fr;
  }
}
</style>
