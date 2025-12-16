/**
 * 主题切换 Composable
 * 提供主题切换功能，支持系统偏好检测和手动切换
 */

import { onMounted, onUnmounted, ref } from 'vue'

type ThemeMode = 'light' | 'dark' | 'auto'

export function useTheme() {
  // 当前主题模式
  const theme = ref<ThemeMode>('auto')

  // 实际应用的主题
  const appliedTheme = ref<'light' | 'dark'>('light')

  // 检测系统主题偏好
  const getSystemTheme = (): 'light' | 'dark' => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    }
    return 'light'
  }

  // 应用主题到DOM
  const applyTheme = (newTheme: 'light' | 'dark') => {
    if (typeof document !== 'undefined') {
      const root = document.documentElement

      // 移除所有主题数据属性
      root.removeAttribute('data-theme')

      // 如果是手动指定的主题，设置data-theme属性
      if (theme.value !== 'auto') {
        root.setAttribute('data-theme', newTheme)
      }

      // 更新实际应用的主题
      appliedTheme.value = newTheme

      // 存储用户偏好
      localStorage.setItem('theme-preference', theme.value)
    }
  }

  // 切换主题
  const toggleTheme = () => {
    const modes: ThemeMode[] = ['light', 'dark', 'auto']
    const currentIndex = modes.indexOf(theme.value)
    const nextMode = modes[(currentIndex + 1) % modes.length]
    setTheme(nextMode)
  }

  // 设置特定主题
  const setTheme = (newTheme: ThemeMode) => {
    theme.value = newTheme

    let targetTheme: 'light' | 'dark'
    if (newTheme === 'auto') {
      targetTheme = getSystemTheme()
    } else {
      targetTheme = newTheme
    }

    applyTheme(targetTheme)
  }

  // 监听系统主题变化
  let mediaQuery: MediaQueryList | null = null

  const handleSystemThemeChange = (e: MediaQueryListEvent) => {
    if (theme.value === 'auto') {
      applyTheme(e.matches ? 'dark' : 'light')
    }
  }

  // 初始化主题
  const initTheme = () => {
    // 从localStorage读取用户偏好
    const savedPreference = localStorage.getItem('theme-preference') as ThemeMode

    if (savedPreference && ['light', 'dark', 'auto'].includes(savedPreference)) {
      theme.value = savedPreference
    } else {
      // 首次加载，使用系统偏好
      theme.value = 'auto'
    }

    let targetTheme: 'light' | 'dark'
    if (theme.value === 'auto') {
      targetTheme = getSystemTheme()
    } else {
      targetTheme = theme.value
    }

    applyTheme(targetTheme)
  }

  // 获取主题图标
  const getThemeIcon = (mode?: ThemeMode) => {
    const currentMode = mode || theme.value
    switch (currentMode) {
      case 'light':
        return '☀️'
      case 'dark':
        return '🌙'
      case 'auto':
        return '🔄'
      default:
        return '🔄'
    }
  }

  // 获取主题标签
  const getThemeLabel = (mode?: ThemeMode) => {
    const currentMode = mode || theme.value
    switch (currentMode) {
      case 'light':
        return '浅色模式'
      case 'dark':
        return '深色模式'
      case 'auto':
        return '跟随系统'
      default:
        return '跟随系统'
    }
  }

  // 获取下一个主题模式
  const getNextTheme = (): ThemeMode => {
    const modes: ThemeMode[] = ['light', 'dark', 'auto']
    const currentIndex = modes.indexOf(theme.value)
    return modes[(currentIndex + 1) % modes.length]
  }

  onMounted(() => {
    initTheme()

    // 监听系统主题变化
    if (typeof window !== 'undefined' && window.matchMedia) {
      mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
      mediaQuery.addEventListener('change', handleSystemThemeChange)
    }
  })

  onUnmounted(() => {
    // 清理事件监听器
    if (mediaQuery) {
      mediaQuery.removeEventListener('change', handleSystemThemeChange)
    }
  })

  return {
    theme,
    appliedTheme,
    toggleTheme,
    setTheme,
    getThemeIcon,
    getThemeLabel,
    getNextTheme,
  }
}
