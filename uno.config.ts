import { defineConfig, transformerDirectives } from 'unocss'
import presetWind3 from '@unocss/preset-wind3'
import presetIcons from '@unocss/preset-icons'

export default defineConfig({
  presets: [
    presetWind3(),
    presetIcons({
      scale: 1.2,
      warn: true,
    }),
  ],
  transformers: [transformerDirectives()],
  content: {
    pipeline: {
      // 默认规则不含纯 .ts 文件；图标类名集中在 TS 配置中（basic-info-fields.ts / useTheme.ts），需显式纳入扫描
      include: [/\.(vue|svelte|[jt]sx?|mdx?|astro|elm|php|phtml|html)($|\?)/],
    },
  },
  theme: {
    // 颜色映射到 CSS 设计令牌（src/styles/theme/_tokens.scss）
    // 使 text-primary / text-secondary 等成为真正的工具类
    colors: {
      primary: 'rgb(var(--color-text-primary) / <alpha-value>)',
      secondary: 'rgb(var(--color-text-secondary) / <alpha-value>)',
      'text-primary': 'rgb(var(--color-text-primary) / <alpha-value>)',
      'text-secondary': 'rgb(var(--color-text-secondary) / <alpha-value>)',
      accent: 'rgb(var(--color-secondary) / <alpha-value>)',
      success: 'rgb(var(--color-success) / <alpha-value>)',
      warning: 'rgb(var(--color-warning) / <alpha-value>)',
      error: 'rgb(var(--color-error) / <alpha-value>)',
      info: 'rgb(var(--color-info) / <alpha-value>)',
    },
    fontFamily: {
      sans: [
        'Inter',
        'system-ui',
        'PingFang SC',
        'Hiragino Sans GB',
        'Microsoft YaHei',
        'Noto Sans SC',
        'sans-serif',
      ],
      mono: ['JetBrains Mono', 'SFMono-Regular', 'Consolas', 'monospace'],
    },
  },
})
