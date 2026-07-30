export type Post = {
  issue: number;
  title: string;
  href: string;
  date: string;
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
    issue: 2,
    title: "砍柴人与放羊人都遇到了 AI",
    href: "/articles/002-chopping-herding-ai/",
    date: "2026-07-29",
    category: "创作与职业",
    categorySlug: "creation-career",
    collection: "砍柴与放羊",
    collectionSlug: "chopping-herding",
    tags: ["AI", "职业", "系统积累"],
    description:
      "AI 时代最大的差距，不是会不会用工具，而是有没有把一次性劳动沉淀成能够持续积累的系统。",
    cover: "/images/002-chopping-vs-herding-cover.png",
    wechat: "http://weixin.qq.com/r/mp/njrl-WTEHTlirSCe92_M",
  },
  {
    issue: 1,
    title: "发刊词｜为什么这个号叫「蓝破碎半圆」？",
    href: "/articles/001-lanposui-banyuan/",
    date: "2026-07-30",
    category: "公众号品牌",
    categorySlug: "brand",
    collection: "蓝破碎半圆",
    collectionSlug: "lanposui",
    tags: ["发刊词", "判断", "品牌"],
    description:
      "蓝破碎半圆的长期底稿：说明这个号是谁、相信什么，以及如何在 AI 时代作出判断。",
    cover: "/images/001-blue-broken-semicircle-cover.png",
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
    wechat:
      "http://mp.weixin.qq.com/s?__biz=MzI1MDQ2OTE5Mg==&mid=100000018&idx=1&sn=97c600511e848244014a212d03f5c0bd&chksm=69808f355ef7062300322b2627f303fa413304067723786248474d0be1a8d250e78d3d60549f#rd",
  },
];
