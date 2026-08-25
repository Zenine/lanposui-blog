export type Post = {
  issue: number;
  title: string;
  href: string;
  date: string;
  publishAt?: string;
  category: string;
  categorySlug: string;
  collection: string;
  collectionSlug: string;
  description: string;
  tags: string[];
  cover?: string;
  wechat?: string;
};

export const posts: Post[] = [
  {
    issue: 77,
    title: "医疗大模型高分之后,为什么还不能直接用?",
    href: "/articles/077-medical-ai-benchmark/",
    date: "2026-08-22",
    publishAt: "2026-08-22T12:53:28+08:00",
    category: "AI 与工程",
    categorySlug: "ai-engineering",
    collection: "医疗 AI",
    collectionSlug: "medical-ai",
    tags: ["AI", "医疗AI", "大模型评测", "Agent"],
    description:
      "医疗大模型刷出高分，不代表真的能进诊室。真正危险的不是答错一道题，而是漏问关键病史、看不出风险边界，还给出一个很自信的结论。",
    cover: "/images/077-medical-ai-benchmark-cover.webp",
  },
  {
    issue: 108,
    title: "企业 AI 部署的新瓶颈：以前等模型，现在等硬件",
    href: "/articles/enterprise-ai-hardware/",
    date: "2026-08-14",
    publishAt: "2026-08-14T21:00:00+08:00",
    category: "AI 与工程",
    categorySlug: "ai-engineering",
    collection: "AI 商业战略",
    collectionSlug: "ai-business-strategy",
    tags: ["AI", "企业AI", "医疗信息化", "Agent"],
    description:
      "从医疗信息化的真实部署困境看企业 AI 的瓶颈转移：过去等模型能力追上来，现在模型够了但硬件、内网部署和合规条件还没到位。开源大模型改变的不只是价格，而是让以前做不了的院内 Agent 工作流第一次变成可落地的项目。",
    cover: "/images/108-enterprise-ai-hardware-cover.webp",
  },
  {
    issue: 100,
    title: "开源模型不再追赶，它开始讨价还价了",
    href: "/articles/open-models-negotiation/",
    date: "2026-08-10",
    publishAt: "2026-08-10T21:07:00+08:00",
    category: "AI 与工程",
    categorySlug: "ai-engineering",
    collection: "AI 商业战略",
    collectionSlug: "ai-business-strategy",
    tags: ["AI", "大模型", "开源模型", "Agent"],
    description:
      "从 Kimi K3、DeepSeek V4 Flash 和真实调用趋势看开源模型对闭源模型的价格压力：开源不是全面打赢，而是在足够多真实任务中越过够用线，逼闭源模型证明自己的溢价。",
    cover: "/images/100-open-models-negotiation-cover.webp",
    wechat: "https://mp.weixin.qq.com/s/gSt38U21VKemg2LccnfDUw",
  },
  {
    issue: 5,
    title: "Agent 不是聊天机器人，而是一种工作组织方式",
    href: "/articles/agent-work-organization/",
    date: "2026-08-06",
    publishAt: "2026-08-06T08:00:00+08:00",
    category: "AI 与工程",
    categorySlug: "ai-engineering",
    collection: "Agent 工作组织",
    collectionSlug: "agent-work-organization",
    tags: ["AI", "Agent", "工作组织"],
    description:
      "区分 Agent 和聊天机器人的，不是模型智商，而是有没有调工具、看结果、再决定的闭环。",
    cover: "/images/005-agent-work-organization-cover.webp",
    wechat: "https://mp.weixin.qq.com/s/hIYBAW9-Y8_bidc8p_y4bQ",
  },
  {
    issue: 4,
    title: "AI 时代，你真正要养的羊是什么？",
    href: "/articles/ai-assets/",
    date: "2026-08-04",
    publishAt: "2026-08-04T21:00:00+08:00",
    category: "创作与职业",
    categorySlug: "creation-career",
    collection: "砍柴与放羊",
    collectionSlug: "chopping-herding",
    tags: ["AI", "职业", "系统积累"],
    description:
      "真正值得养的羊，不是某个具体工具，而是价值不再与当下投入时间一比一绑定、能够持续复用和积累的资产与系统。",
    cover: "/images/004-five-layer-assets-cover.webp",
    wechat: "https://mp.weixin.qq.com/s/iP96mJMRHaYhCsVVGtEQpA",
  },
  {
    issue: 3,
    title: "当 AI 比你更会砍柴，你还剩什么价值？",
    href: "/articles/chopping-value/",
    date: "2026-08-01",
    category: "创作与职业",
    categorySlug: "creation-career",
    collection: "砍柴与放羊",
    collectionSlug: "chopping-herding",
    tags: ["AI", "职业", "负责人能力"],
    description:
      "当 AI 接走越来越多执行工作，人的价值会向目标、标准、判断、验收和责任上移。这里的负责人是一种能力，而不是管理头衔。",
    wechat: "https://mp.weixin.qq.com/s/un3uXTJlTIppb4DPj-iSeg",
    cover: "/images/003-responsibility-gate-cover.webp",
  },
  {
    issue: 2,
    title: "砍柴人与放羊人都遇到了 AI",
    href: "/articles/chopping-herding-ai/",
    date: "2026-07-29",
    category: "创作与职业",
    categorySlug: "creation-career",
    collection: "砍柴与放羊",
    collectionSlug: "chopping-herding",
    tags: ["AI", "职业", "系统积累"],
    description:
      "AI 时代最大的差距，不是会不会用工具，而是有没有把一次性劳动沉淀成能够持续积累的系统。",
    cover: "/images/002-chopping-vs-herding-cover.webp",
    wechat: "https://mp.weixin.qq.com/s/aZ5PIpgt-lHSOuZyjy8JTA",
  },
  {
    issue: 1,
    title: "发刊词｜为什么这个号叫「蓝破碎半圆」？",
    href: "/articles/lanposui-banyuan/",
    date: "2026-07-24",
    category: "公众号品牌",
    categorySlug: "brand",
    collection: "蓝破碎半圆",
    collectionSlug: "lanposui",
    tags: ["发刊词", "判断", "品牌"],
    description:
      "蓝破碎半圆的长期底稿：说明这个号是谁、相信什么，以及如何在 AI 时代作出判断。",
    cover: "/images/001-blue-broken-semicircle-cover.webp",
    wechat: "https://mp.weixin.qq.com/s/bLIRJjYUIY-KtdJlFkMFsA",
  },
  {
    issue: 20230408,
    title: "ChatGPT：都什么年代，谁在搞传统NLP？",
    href: "/articles/2023-chatgpt-traditional-nlp/",
    date: "2023-04-08",
    category: "AI 与工程",
    categorySlug: "ai-engineering",
    collection: "AI 早期观察",
    collectionSlug: "early-ai",
    tags: ["ChatGPT", "NLP", "大模型"],
    description:
      "ChatGPT 刚出现时，对传统 NLP、算法工程师和语言模型范式变化的一次早期记录。",
    wechat: "https://mp.weixin.qq.com/s/mv_QjtEXJZ_0EXMUokRobg",
  },
  {
    issue: 20220608,
    title: "2022-重拾写作1 —砍柴、放羊与元放羊",
    href: "/articles/2022-chopping-herding-meta-herding/",
    date: "2022-06-08",
    category: "写作与成长",
    categorySlug: "writing-growth",
    collection: "砍柴与放羊",
    collectionSlug: "chopping-herding",
    tags: ["写作", "愿景", "系统积累"],
    description:
      "旧版砍柴与放羊故事：公开写作的愿景、元放羊，以及把劳动变成持续系统的早期思考。",
    wechat: "https://mp.weixin.qq.com/s/3cCoRjTiBxdwAeLAQzAmTA",
  },
  {
    issue: 20210317,
    title: "2021从元开始",
    href: "/articles/2021-meta-start/",
    date: "2021-03-17",
    category: "认知与概念",
    categorySlug: "cognition",
    collection: "元认知",
    collectionSlug: "meta-cognition",
    tags: ["元认知", "学习", "概念"],
    description:
      "从 meta 的概念讲起，重新理解元认知、元学习和“关于什么的什么”。",
    cover: "/images/archive/2021-meta-start/image-001.jpg",
    wechat: "https://mp.weixin.qq.com/s/5wYIzmqW8G5g2NSbDwXJ5A",
  },
];
