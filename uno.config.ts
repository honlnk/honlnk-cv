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
      // UnoCSS 颜色现在由 CSS 变量管理，不在此处定义
      // 所有的颜色定义请参考: src/styles/theme/tokens.css
    fontFamily: {
      sans: ['Inter', 'system-ui', 'sans-serif'],
      mono: ['JetBrains Mono', 'monospace'],
    },
    boxShadow: {
      card: '0 4px 16px rgba(0, 0, 0, 0.1)',
      'card-hover': '0 8px 32px rgba(0, 0, 0, 0.15)',
    },
    borderRadius: {
      card: '12px',
    },
  },
  shortcuts: {
    'card-base': 'shadow-card rounded-card p-6 border',
    'card-hover': 'hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300',
    'section-title': 'text-2xl font-bold mb-6 relative pb-3',
    'btn-primary': 'px-6 py-3 rounded-lg transition-all duration-300',
    'text-gradient': 'bg-gradient-to-r bg-clip-text text-transparent',
    'glass-effect': 'backdrop-blur-md border',
    'hover-lift': 'transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl',
  },
  rules: [
    // 自定义渐变背景规则
    [
      'header-gradient',
      {
        background: 'linear-gradient(135deg, var(--header-bg) 0%, var(--color-gray-100) 100%)',
      },
    ],
    // 卡片悬浮效果
    [
      'card-float',
      {
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      },
    ],
    // 文本阴影效果
    [
      'text-shadow',
      {
        'text-shadow': '0 2px 4px rgba(0, 0, 0, 0.1)',
      },
    ],
    // 文字闪光动画样式（配合自定义 CSS 使用）
    [
      'text-shimmer',
      {
        background:
          'linear-gradient(90deg, currentColor 0%, rgba(255,255,255,0.3) 50%, currentColor 100%)',
        'background-size': '200% auto',
        'background-clip': 'text',
        '-webkit-background-clip': 'text',
        color: 'transparent',
      },
    ],
    // 鼠标跟随效果
    [
      'mouse-glow',
      {
        position: 'fixed',
        'pointer-events': 'none',
        'z-index': '9999',
        width: '20px',
        height: '20px',
        background: 'radial-gradient(circle, rgba(52,152,219,0.3) 0%, transparent 70%)',
        'border-radius': '50%',
        transform: 'translate(-50%, -50%)',
        transition: 'all 0.1s ease-out',
      },
    ],
  ],
})
