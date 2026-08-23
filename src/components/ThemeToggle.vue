<template>
  <button
    @click="toggleTheme"
    class="theme-toggle"
    :title="`${getThemeLabel()} (点击切换)`"
    aria-label="主题切换"
    type="button"
  >
    <!-- Lucide 官方 SVG（sun / moon / monitor） -->
    <svg
      class="theme-toggle__icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      <template v-if="theme === 'light'">
        <circle cx="12" cy="12" r="4" />
        <path
          d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M2 12h2m16 0h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"
        />
      </template>
      <template v-else-if="theme === 'dark'">
        <path
          d="M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401"
        />
      </template>
      <template v-else>
        <rect width="20" height="14" x="2" y="3" rx="2" />
        <path d="M8 21h8m-4-4v4" />
      </template>
    </svg>
    <span class="theme-toggle__label">{{ getThemeLabel() }}</span>
  </button>
</template>

<script setup lang="ts">
  import { useTheme } from '@/composables/useTheme'

  const { theme, toggleTheme, getThemeLabel } = useTheme()
</script>

<style scoped lang="scss">
  .theme-toggle {
    display: inline-flex;
    align-items: center;
    gap: var(--spacing-sm);
    padding: var(--spacing-sm) var(--spacing-md);
    border-radius: var(--border-radius-lg);
    font-size: var(--font-size-sm);
    font-weight: var(--font-weight-medium);
    background-color: rgb(var(--card-bg));
    color: rgb(var(--color-text-secondary));
    border: var(--border-width-1) solid var(--color-hairline);
    cursor: pointer;
    transition:
      color var(--duration-fast) var(--ease-out),
      border-color var(--duration-fast) var(--ease-out),
      background-color var(--duration-fast) var(--ease-out);

    &:hover {
      color: rgb(var(--color-secondary));
      border-color: rgb(var(--color-secondary) / 0.35);
    }

    &:focus {
      outline: none;
      box-shadow: 0 0 0 var(--border-width-2) rgb(var(--color-secondary) / 0.5);
    }

    &:active {
      transform: translateY(1px);
    }

    /* 响应式调整 */
    @media (max-width: 640px) {
      padding: var(--spacing-sm);
    }
  }

  .theme-toggle__icon {
    width: 1.125rem;
    height: 1.125rem;
    flex-shrink: 0;
  }

  .theme-toggle__label {
    font-size: var(--font-size-sm);
    font-weight: var(--font-weight-medium);
    white-space: nowrap;

    @media (max-width: 640px) {
      display: none;
    }
  }
</style>
