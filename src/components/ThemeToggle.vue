<template>
  <button
    @click="toggleTheme"
    :class="['theme-toggle', { 'theme-toggle--active': true }]"
    :title="`${getThemeLabel()} (点击切换)`"
    aria-label="主题切换"
    type="button"
  >
    <span class="theme-toggle__icon">{{ getThemeIcon() }}</span>
    <span class="theme-toggle__label">{{ getThemeLabel() }}</span>
  </button>
</template>

<script setup lang="ts">
  import { useTheme } from '@/composables/useTheme'

  const { toggleTheme, getThemeIcon, getThemeLabel } = useTheme()
</script>

<style scoped>
  .theme-toggle {
    @apply flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium;
    background-color: rgb(var(--color-section-bg));
    color: rgb(var(--color-text-secondary));
    border: var(--border-width-1) solid rgb(var(--card-border));
    cursor: pointer;
    transition: all var(--duration-normal) var(--ease-out);
    backdrop-filter: var(--backdrop-blur-sm);
    position: relative;
    overflow: hidden;
  }

  .theme-toggle:hover {
    background-color: rgb(var(--color-secondary) / 0.1);
    color: rgb(var(--color-secondary));
    transform: translateY(-1px);
    box-shadow: var(--shadow-md);
  }

  .theme-toggle:focus {
    outline: none;
    box-shadow: 0 0 0 var(--border-width-2) rgba(var(--color-secondary), 0.5);
  }

  .theme-toggle:active {
    transform: translateY(0);
  }

  .theme-toggle__icon {
    font-size: var(--font-size-lg);
    line-height: 1;
    display: inline-block;
    transition: transform var(--duration-normal) var(--ease-out);
  }

  .theme-toggle:hover .theme-toggle__icon {
    transform: rotate(20deg);
  }

  .theme-toggle__label {
    font-size: var(--font-size-sm);
    font-weight: var(--font-weight-medium);
    white-space: nowrap;
  }

  /* 主题切换动画 */
  .theme-toggle::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(var(--color-secondary), 0.3) 0%, transparent 70%);
    transform: translate(-50%, -50%);
    transition: all var(--duration-normal) var(--ease-out);
    pointer-events: none;
  }

  .theme-toggle:active::before {
    width: 100px;
    height: 100px;
  }

  /* 暗色模式适配 */
  @media (prefers-color-scheme: dark) {
    :root:not([data-theme='light']) .theme-toggle {
      background-color: rgb(var(--color-dark-bg-secondary));
      border-color: rgb(var(--color-gray-200));
    }

    :root:not([data-theme='light']) .theme-toggle:hover {
      background-color: rgba(var(--color-secondary), 0.2);
    }
  }

  /* 响应式调整 */
  @media (max-width: 640px) {
    .theme-toggle__label {
      display: none;
    }

    .theme-toggle {
      padding: var(--spacing-sm);
    }

    .theme-toggle__icon {
      font-size: var(--font-size-xl);
    }
  }
</style>
