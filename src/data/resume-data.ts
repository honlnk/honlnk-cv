export interface ResumeData {
  /** 基本信息 - 支持灵活的字段结构 */
  basicInfo?: {
    [key: string]: string | number
  }

  /** 兼容性：保持原有的name字段 */
  name: string
  /** 兼容性：保持原有的position字段 */
  position: string
  /** 兼容性：保持原有的contact字段 */
  contact: {
    phone: string
    email: string
    location: string
    salary: string
    website: string
    gitee: string
  }

  coreAdvantages: {
    title: string
    items: string[]
  }[]
  projects: {
    title: string
    duration: string
    role: string
    highlights: string[]
    techStack: string[]
  }[]
  education: {
    school: string
    major: string
    duration: string
    experiences: string[]
  }
  additionalValues: {
    icon: string
    title: string
    content: string[]
  }[]
}

export const resumeData: ResumeData = {
  name: "鸿影（网名）",
  position: "Java全栈开发工程师 | 21岁",
  contact: {
    phone: "19563491369",
    email: "jhshonlnk@gmail.com",
    location: "期望城市：济南",
    salary: "期望薪资：3-6K",
    website: "https://www.honlnk.top",
    gitee: "https://gitee.com/hong-ying-19"
  },
  coreAdvantages: [
    {
      title: "全栈开发",
      items: [
        "SpringBoot+Vue.js技术栈",
        "MySQL+Redis数据层",
        "独立完成2个全栈项目开发"
      ]
    },
    {
      title: "技术深度",
      items: [
        "SpringBoot3/MybatisPlus/SpringAI",
        "Vue3+Pinia+ElementPlus",
        "Hutool工具链"
      ]
    },
    {
      title: "工程能力",
      items: [
        "OCR/AI集成（百度智能云/通义百练）",
        "前后端部署经验",
        "跨端协同开发能力"
      ]
    }
  ],
  projects: [
    {
      title: "词砖·智能单词系统",
      duration: "2024.11-至今",
      role: "全栈开发",
      highlights: [
        "集成牛津/百度翻译API实现多维度单词解析，开发AI辅助学习场景（SpringAI+通义百练） ",
        "创新应用IndexedDB实现浏览器端数据缓存，响应速度拥有显著提升",
      ],
      techStack: ["Vue3", "ElementPlus", "SpringBoot3", "Mybatis", "Redis", "Hutool", "SpringDataRedis", "SpringMail"]
    },
    {
      title: "逐雁排程系统",
      duration: "2024.02-2024.05",
      role: "全栈开发",
      highlights: [
        "基于百度OCR实现表格智能识别，自主设计值班表排表算法，值班表生成效率提升90% ",
        "设计密钥认证体系替代传统登录，提升用户留存率",
        "https://schedule.honlnk.top"
      ],
      techStack: ["Vue3", "ElementPlus", "SpringBoot3", "Mybatis", "SpringMail"]
    },
    {
      title: "高考志愿系统",
      duration: "2023.05-2023.11",
      role: "独立前端",
      highlights: [
        "首创霍兰德测试与志愿推荐融合算法",
        "获省级二等奖/国家三等奖"
      ],
      techStack: ["Vue2", "Vuex", "Axios"]
    }
  ],
  education: {
    school: "山东商业职业技术学院",
    major: "软件技术 | 专科",
    duration: "2022-2025",
    experiences: [
      "自主学习15+项技术栈，独立开发2个项目，共落地4个项目",
      "获得技能类比赛，国奖1项，省奖多项",
      "担任云计算实训中心学生负责人，时长一年半，与部门师生合作管理学院的实训室",
      "与其他同学合作开发“实训室管理平台”",
      "积极与同学老师交流学习先进技术栈"
    ]
  },
  additionalValues: [
    {
      icon: "🚀",
      title: "技术视野",
      content: [
        "持续跟进SpringAI/大模型应用开发，落地2个AI集成项目",
        "对通用大模型使用与训练有较高的兴趣"
      ]
    },
    {
      icon: "🛡️",
      title: "质量保障",
      content: [
        '开发"实训室管理平台"实现全年0教学事故',
        '开发“逐雁排程”提升排表效率达90%'
      ]
    },
    {
      icon: "📚",
      title: "学习能力",
      content: ["自主学习15+技术栈，2年内从零基础到全栈开发者"]
    }
  ]
}
