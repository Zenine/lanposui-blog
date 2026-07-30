# 蓝破碎半圆博客

公开博客发布仓库。这里是 `writing-craft` 的发布层，只放已经确认可以公开的文章、页面和图片，不保存草稿、审读意见、库内附录、TODO 或私有素材。

线上地址：https://zenine.github.io/lanposui-blog/

## 技术栈

- Astro
- Markdown 文章页
- GitHub Pages 部署
- Node.js >= 22.12.0

## 本地开发

```sh
npm install
npm run astro -- dev --background
npm run astro -- dev status
npm run astro -- dev logs
npm run astro -- dev stop
npm run build
```

本仓库启动开发服务时使用 Astro 后台模式，便于在 agent 会话中查看状态、日志并停止服务。

验证入口：

```sh
npm test
```

当前 `npm test` 会先运行 `npm run build`，再检查首页和文章列表的关键公开输出。

## 内容边界

- 私有写作工作台：`/Users/zeninexu/github/writing-craft`
- 公开博客仓库：`/Users/zeninexu/github/lanposui-blog`
- 公开文章放在 `src/pages/articles/`
- 公开图片放在 `public/images/`
- 过往公众号文章也放在 `src/pages/articles/`，用“旧文”标签展示，不占用新公众号编号。

首页和文章列表使用 `src/data/posts.ts` 维护展示数据；新增或修改文章时，需要同步更新该文件中的标题、日期、摘要、分类、封面和公众号原文链接。

从 `writing-craft` 同步文章前，必须确认：

- 删除“库内编辑附录”
- 删除审读记录、Prompt、TODO、内部来源核对
- 图片路径改为博客公开路径
- 涉及个人、公司、客户、股票或医疗内容时，先做公开边界审查
- 过往文章中用户明确删除或不再公开的文章不重新同步。

## 发布流程

1. 从 `writing-craft` 只同步已经确认公开的正文和必要图片。
2. 将文章保存到 `src/pages/articles/`，并检查 frontmatter。
3. 将公开图片保存到 `public/images/`；文章正文中的站内图片路径使用 `/lanposui-blog/images/...`。
4. 更新 `src/data/posts.ts`，确保首页和文章列表可见。
5. 运行 `npm test`。
6. 同步更新 `TODO.md` 和 `CHANGELOG.md`。

## 部署

推送到 `main` 后，GitHub Actions 使用 Astro 官方 action 构建并部署到 GitHub Pages。

站点配置在 `astro.config.mjs`：

- `site`: `https://zenine.github.io`
- `base`: `/lanposui-blog`

线上地址：https://zenine.github.io/lanposui-blog/
