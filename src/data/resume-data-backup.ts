export interface Project {
  title: string
  duration: string
  role: string
  highlights: string[]
  techStack: string[]
}

export interface ResumeData {
  name: string
  position: string
  contact: {
    phone: string
    email: string
    location: string
    salary: string
  }
  projects: Project[]
  education: {
    school: string
    major: string
    duration: string
    experiences: string[]
  }
}

export const resumeData: ResumeData = {
  name: "纪洪申",
  position: "Java全栈开发工程师 | 21岁",
  contact: {
    phone: "15066637145",
    email: "jihongshen1@outlook.com",
    location: "济南",
    salary: "3-6K"
  },
  projects: [
    {
      title: "词砖·智能单词系统",
      duration: "2024.11-至今",
      role: "全栈开发",
      highlights: [
        "集成牛津/百度翻译API实现多维度单词解析",
        "创新应用IndexedDB实现浏览器端数据缓存，响应速度提升显著"
      ],
      techStack: ["Vue3", "ElementPlus", "SpringBoot3", "Mybatis", "Redis", "Hutool"]
    },
    {
      title: "逐雁排程系统",
      duration: "2024.02-2024.05",
      role: "全栈开发",
      highlights: [
        "基于百度OCR实现表格智能识别，自主设计值班表排表算法，值班表生成效率提升90% ",
        "设计密钥认证体系替代传统登录，提升用户留存率",
      ],
      techStack: ["Vue3", "ElementPlus", "SpringBoot3", "Mybatis", "Hutool"]
    },
    {
      title: "高考志愿系统",
      duration: "2023.05-2023.11",
      role: "独立前端",
      highlights: [
        "首创霍兰德测试与志愿推荐融合算法，获省级二等奖/国家三等奖",
      ],
      techStack: ["Vue2", "Vuex", "Axios"]
    }
  ],
  education: {
    school: "山东商业职业技术学院",
    major: "软件技术 | 专科",
    duration: "2022-2025",
    experiences: [
      "担任云计算实训中心学生负责人",
      "获得省级二等奖/国家三等奖",
      "自主学习10+技术栈"
    ]
  }
}
