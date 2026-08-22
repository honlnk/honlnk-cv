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
  theme: {
    // 颜色映射到 CSS 设计令牌（src/styles/theme/_tokens.scss）
    // 使 text-primary / text-secondary 等成为真正的工具类
    colors: {
      primary: 'rgb(var(--color-text-primary) / <alpha-value>)',
      secondary: 'rgb(var(--color-text-secondary) / <alpha-value>)',
      'text-primary': 'rgb(var(--color-text-primary) / <alpha-value>)',
      'text-secondary': 'rgb(var(--color-text-secondary) / <alpha-value>)',
      success: 'rgb(var(--color-success) / <alpha-value>)',
      warning: 'rgb(var(--color-warning) / <alpha-value>)',
      error: 'rgb(var(--color-error) / <alpha-value>)',
      info: 'rgb(var(--color-info) / <alpha-value>)',
    },
    fontFamily: {
      sans: ['Inter', 'system-ui', 'sans-serif'],
      mono: ['JetBrains Mono', 'monospace'],
    },
  },
  shortcuts: {
    // 章节标题基础排版（完整样式见 styles/components/_cards.scss 的 .section-title）
    'section-title': 'text-2xl font-bold mb-6 relative pb-3',
    // 玻璃态效果（完整样式见 styles/components/_cards.scss 的 .glass-effect）
    'glass-effect': 'backdrop-blur-md border',
  },
})
