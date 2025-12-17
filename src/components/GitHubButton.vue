<script setup lang="ts">
  import { computed } from 'vue'

  interface Props {
    githubUrl?: string
    size?: 'sm' | 'md' | 'lg'
    variant?: 'primary' | 'secondary' | 'ghost'
    showText?: boolean
  }

  const props = withDefaults(defineProps<Props>(), {
    githubUrl: 'https://github.com/honlnk/honlnk-cv',
    size: 'md',
    variant: 'primary',
    showText: true,
  })

  const sizeClasses = computed(() => {
    const sizeMap = {
      sm: 'px-3 py-1.5 text-sm gap-2',
      md: 'px-4 py-2 text-base gap-2',
      lg: 'px-5 py-3 text-lg gap-3',
    } as const
    return sizeMap[props.size] || sizeMap.md
  })

  const variantClasses = computed(() => {
    const variantMap = {
      primary: 'bg-[rgb(var(--color-secondary))] text-white hover:bg-[rgb(var(--color-primary))]',
      secondary:
        'bg-[rgb(var(--color-gray-100))] text-[rgb(var(--color-text-primary))] hover:bg-[rgb(var(--color-gray-200))]',
      ghost:
        'bg-transparent text-[rgb(var(--color-text-secondary))] hover:bg-[rgb(var(--color-gray-100))]',
    } as const
    return variantMap[props.variant] || variantMap.primary
  })
</script>

<template>
  <a
    :href="githubUrl"
    target="_blank"
    rel="noopener noreferrer"
    :class="[
      'inline-flex items-center justify-center font-medium rounded-full border border-[rgb(var(--color-gray-200))] transition-all duration-200 hover:scale-105 hover:shadow-md active:scale-95',
      sizeClasses,
      variantClasses,
    ]"
    v-motion
    :initial="{ opacity: 0, y: -20 }"
    :enter="{ opacity: 1, y: 0, transition: { delay: 400, duration: 800 } }"
  >
    <!-- GitHub 图标 -->
    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.341-3.369-1.341-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z"
      />
    </svg>

    <!-- 按钮文本 -->
    <span v-if="showText" class="whitespace-nowrap"> View on GitHub </span>

    <!-- 外链图标 -->
    <svg
      v-if="showText"
      class="w-3.5 h-3.5 opacity-70"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
      />
    </svg>
  </a>
</template>

<style scoped>
  /* 确保按钮在暗色模式下样式正确 */
  @media (prefers-color-scheme: dark) {
    :root:not([data-theme='light']) .github-button {
      border-color: rgb(var(--color-gray-600));
    }
  }

  :root[data-theme='dark'] .github-button {
    border-color: rgb(var(--color-gray-600));
  }
</style>
