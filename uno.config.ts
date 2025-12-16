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
    colors: {
      primary: '#2c3e50',
      secondary: '#3498db',
      accent: '#34495e',
      success: '#27ae60',
      warning: '#f39c12',
      error: '#e74c3c',
      'section-bg': '#f8f9fa',
      'text-primary': '#2c3e50',
      'text-secondary': '#7f8c8d',
      'header-bg': '#f8f9fa',
    },
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
    'card-base': 'bg-white shadow-card rounded-card p-6 border border-gray-100',
    'card-hover': 'hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300',
    'section-title': 'text-2xl font-bold mb-6 text-text-primary relative pb-3',
    'btn-primary':
      'bg-secondary text-white px-6 py-3 rounded-lg hover:bg-secondary/90 transition-all duration-300',
    'text-gradient': 'bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent',
    'glass-effect': 'backdrop-blur-md bg-white/80 dark:bg-gray-900/80 border border-white/20',
    'hover-lift': 'transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl',
  },
  rules: [
    // 自定义渐变背景规则
    [
      'header-gradient',
      {
        background: 'linear-gradient(135deg, var(--header-bg) 0%, #e9ecef 100%)',
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
