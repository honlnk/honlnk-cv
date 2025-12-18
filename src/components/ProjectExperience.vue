<script setup lang="ts">
  import type { ResumeData } from '@/types/types'
  import { ref } from 'vue'

  const props = defineProps<{
    projects: ResumeData['projects']
  }>()

  const projectsTemplate = ref<any>([])
  initTemplate()
  function initTemplate() {
    projectsTemplate.value = []
    props.projects.forEach(project => {
      projectsTemplate.value.push({
        title: project.title,
        highlights: project.highlights.map(() => ''),
      })
    })
  }

  const expandedProjects = ref<Set<string>>(new Set())
  const expandingHeight = ref<{ [key: string]: number }>({})
  const activeTimers = ref<{ [key: string]: any[] }>({})
  const removeTimers = ref<{ [key: string]: any[] }>({})
  const toggleDetails = async (title: string, event: MouseEvent, index: number) => {
    const card = (event.currentTarget as HTMLElement).closest('.project-card') as HTMLElement
    const details = card?.querySelector('.drawer-content') as HTMLElement

    if (expandedProjects.value.has(title)) {
      /** 请求输入定时器 */
      if (activeTimers.value[index] != undefined) {
        activeTimers.value[index].forEach(timer => clearTimeout(timer))
      }

      if (details) {
        expandingHeight.value[title] = details.scrollHeight
      }
      expandedProjects.value.delete(title)

      console.log(projectsTemplate.value[index])
      const len = projectsTemplate.value[index].highlights.length
      removeTimers.value[index] = []
      setTimeout(() => {
        if (removeTimers.value[index] != undefined) {
          removeTimers.value[index].forEach(timer => clearTimeout(timer))
        }
      }, 500)
      for (const [row, word] of projectsTemplate.value[index].highlights.entries()) {
        const promiseList: Promise<void>[] = []
        const text = projectsTemplate.value[index].highlights[len - 1 - row]
        if (text) {
          text.split('').forEach((char, i) => {
            promiseList.push(
              new Promise(resolve => {
                const timer = setTimeout(() => {
                  projectsTemplate.value[index].highlights[len - 1 - row] = text.slice(
                    0,
                    text.length - 1 - i
                  )
                  console.log(projectsTemplate.value[index].highlights[len - 1 - row])
                  resolve()
                }, i * 50)
                removeTimers.value[index].push(timer)
              })
            )
          })
          await Promise.all(promiseList)
        }
      }
    } else {
      // 展开时计算并设置高度
      if (details) {
        expandingHeight.value[title] = details.scrollHeight
      }
      expandedProjects.value.add(title)

      /** ====================    ==================== */
      // 清空当前项目的高亮模板
      initTemplate()

      if (removeTimers.value[index] != undefined) {
        removeTimers.value[index].forEach(timer => clearTimeout(timer))
      }
      // 初始化当前项目的定时器数组
      activeTimers.value[index] = []

      for (const [row, word] of props.projects[index].highlights.entries()) {
        const promiseList: Promise<void>[] = []
        word.split('').forEach((char: string, ip: number) => {
          promiseList.push(
            new Promise<void>(resolve => {
              const timer = setTimeout(() => {
                const text = projectsTemplate.value[index].highlights[row]
                projectsTemplate.value[index].highlights[row] = text + char
                console.log(projectsTemplate.value[index].highlights[row])
                resolve()
              }, 50 * ip)
              activeTimers.value[index].push(timer)
            })
          )
        })
        await Promise.all(promiseList)
      }
    }
  }

  const getDrawerHeight = (title: string) => {
    if (expandedProjects.value.has(title)) {
      return expandingHeight.value[title] ? `${expandingHeight.value[title]}px` : 'auto'
    }
    return '0px'
  }
</script>

<template>
  <section class="section projects">
    <h2 class="section-title">🚀 项目经历</h2>

    <div
      v-for="(project, index) in projects"
      :key="project.title"
      class="project-card"
      :class="{
        'mb-4': index !== projects.length - 1,
        'before:opacity-0 after:opacity-100': expandedProjects.has(project.title),
      }"
      v-motion
      :initial="{ opacity: 0, x: -30 }"
      :visible-once="{ opacity: 1, x: 0 }"
      :transition="{
        delay: index * 200,
        duration: 600,
        type: 'spring',
        stiffness: 80,
      }"
      @click="toggleDetails(project.title, $event, index)"
    >
      <div class="card-header flex justify-between items-center p-6 cursor-pointer">
        <div class="header-left flex-1">
          <h3 class="text-xl font-semibold text-primary m-0">{{ project.title }}</h3>
          <span class="duration text-text-secondary text-sm">{{ project.duration }}</span>
        </div>
        <span
          class="role-tag bg-[rgb(var(--color-secondary))] text-[rgb(var(--color-gray-50))] px-3 py-1 rounded-full text-sm"
        >
          {{ project.role }}
        </span>
      </div>

      <!-- 抽屉容器 -->
      <div
        class="drawer-wrapper overflow-hidden transition-all duration-500 ease-in-out"
        :style="{
          height: getDrawerHeight(project.title),
          opacity: expandedProjects.has(project.title) ? 1 : 0,
        }"
      >
        <div
          class="drawer-content project-drawer-content px-6 pb-6 border-t border-b-[rgb(var(--card-border))]"
        >
          <!-- 项目亮点 -->
          <ul class="highlights-list my-4">
            <template v-for="(item, x) in projectsTemplate[index].highlights" :key="x">
              <li v-if="item.length">
                <span>{{ item }}</span>
              </li>
            </template>
          </ul>
          <div class="tech-stack flex flex-wrap gap-2">
            <span
              v-for="(tech, index) in project.techStack"
              :key="`${tech}-${expandedProjects.has(project.title)}`"
              class="tech-tag"
              v-motion
              :initial="{ opacity: 0, x: -30 }"
              :enter="{
                opacity: 1,
                x: 0,
                transition: {
                  delay: 200 + index * 100,
                  duration: 600,
                  type: 'spring',
                  stiffness: 100,
                },
              }"
            >
              {{ tech }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
