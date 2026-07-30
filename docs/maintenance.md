# 维护手册

本文档说明 `蓝破碎半圆` 公开博客的项目结构、内容维护、验证和部署流程。根目录 `README.md` 面向第一次看到博客的人；维护细节集中放在这里。

线上地址：https://zenine.github.io/lanposui-blog/

## 站点职责

本仓库是公开博客发布层，用来发布已经确认可以公开的文章、图片和页面。

站点不保存草稿、审读意见、内部附录、Prompt、TODO、客户或公司细节，也不直接同步未做公开边界审查的私有写作材料。

## 品牌与入口

- 站点名称：蓝破碎半圆
- 作者标识：ZENINEXU
- Hero 文案：`在破碎信息里，留下判断的现场。`
- 签名视觉：「蓝破碎半圆」品牌弧，出现在页眉品牌位（内联 SVG）、首页 Hero 大弧、全站 kicker 小弧刻度、文章页右下角阅读进度弧。叙事方向是"半圆碎掉"（完整蓝色半圆自左向右碎裂、弧段位移散开），不是"碎片拼成半圆"；用户 2026-07-30 拍板，改图前先确认。
- 暗色模式：跟随系统 `prefers-color-scheme`，色板集中在 `src/layouts/BaseLayout.astro` 的 `:root` 变量与其暗色覆写块；新增颜色一律走变量，不写死色值。
- 公众号 Logo：`public/images/wechat-logo.jpg`
- 公众号二维码：`public/images/wechat-qr.jpg`
- 公众号入口：顶部导航的“公众号”，鼠标悬停或键盘聚焦时浮出二维码。
- GitHub 首页：顶部导航和页脚的 `GitHub` 入口，指向 `https://github.com/Zenine`。

## 功能

- `/`：首页，展示最新文章、文章入口、分类、合集和推荐阅读。
- `/articles/`：全部文章列表。
- `/articles/<slug>/`：文章详情页。
- `/categories/`：分类索引。
- `/categories/<slug>/`：分类详情页。
- `/collections/`：合集索引。
- `/collections/<slug>/`：合集详情页。
- `/search/`：站内全文检索。
- `/rss.xml`：RSS 订阅。
- `/sitemap-index.xml`：站点地图。
- `/robots.txt`：爬虫入口。

文章页包含 canonical、Open Graph、Twitter Card 和 BlogPosting JSON-LD。

## 技术架构

| 模块 | 说明 |
| --- | --- |
| Astro | 静态站点框架 |
| Astro Content Collections | 校验 Markdown 文章 frontmatter |
| Markdown | 文章正文格式 |
| Pagefind | 构建期生成站内搜索索引 |
| `@astrojs/rss` | 生成 RSS |
| `@astrojs/sitemap` | 生成 sitemap |
| GitHub Actions | 构建并部署到 GitHub Pages |

关键目录：

| 路径 | 说明 |
| --- | --- |
| `src/content/articles/` | 公开文章 Markdown 源文件 |
| `src/content.config.ts` | 内容集合 schema |
| `src/data/posts.ts` | 首页、列表、分类、合集、RSS 和推荐使用的文章元数据 |
| `src/data/blog.ts` | 站点信息、排序、分类分组、合集分组和相关推荐工具 |
| `src/layouts/BaseLayout.astro` | 全站 SEO、页眉、公众号二维码浮层和页脚 |
| `src/layouts/PostLayout.astro` | 文章页布局和结构化数据 |
| `src/pages/` | Astro 页面和动态路由 |
| `public/images/` | 可公开访问的图片资源 |
| `scripts/check-public-output.mjs` | 构建产物检查脚本 |
| `.github/workflows/deploy.yml` | GitHub Pages 部署工作流 |

## 本地开发

需要 Node.js `>=22.12.0`。

```sh
npm install
```

项目规则要求开发服务使用 Astro 后台模式：

```sh
npm run astro -- dev --background
npm run astro -- dev status
npm run astro -- dev logs
npm run astro -- dev stop
```

本地访问：

```text
http://localhost:4321/lanposui-blog/
```

## 手动更新文章

新增或修改文章时，需要同时维护 Markdown 正文和展示元数据。

1. 在 `src/content/articles/` 新建或编辑 `.md` 文件。

   文件名建议使用稳定 slug，例如：

   ```text
   src/content/articles/003-example-title.md
   ```

2. 检查文章 frontmatter。

   当前 schema 要求：

   ```md
   ---
   layout: "../../layouts/PostLayout.astro"
   title: "文章标题"
   date: "2026-07-30"
   description: "一句话摘要"
   issue: 3
   category: "分类名称"
   cover: "/lanposui-blog/images/example-cover.jpg"
   source: "公开来源说明"
   wechat: "https://mp.weixin.qq.com/..."
   ---
   ```

   `cover` 和 `wechat` 可选。公众号原文链接暂时没有时，可以不写 `wechat`，并在 `TODO.md` 留下待补事项。

3. 把公开图片放到 `public/images/`。

   正文里的站内图片路径使用：

   ```md
   ![图片说明](/lanposui-blog/images/example.jpg)
   ```

   frontmatter 的 `cover` 使用：

   ```yaml
   cover: "/lanposui-blog/images/example-cover.jpg"
   ```

4. 更新 `src/data/posts.ts`。

   这里决定首页、文章列表、分类、合集、RSS 和推荐区如何展示文章。新增文章至少要补齐：

   - `issue`
   - `title`
   - `href`
   - `date`
   - `category`
   - `categorySlug`
   - `collection`
   - `collectionSlug`
   - `description`
   - `tags`
   - `cover`，在 `src/data/posts.ts` 中写 `/images/example-cover.jpg`
   - `wechat`

5. 运行完整验证。

   ```sh
   npm test
   ```

6. 本地预览。

   ```sh
   npm run astro -- dev --background
   ```

7. 提交并推送。

   ```sh
   git status
   git add src/content/articles src/data/posts.ts public/images TODO.md CHANGELOG.md
   git commit -m "更新文章内容"
   git push origin main
   ```

## 公开边界

从私有写作材料同步到本仓库前，必须确认：

- 只同步已经确认公开的正文和必要图片。
- 删除库内编辑附录、审读记录、Prompt、内部 TODO 和来源核对。
- 删除或改写不适合公开的个人、客户、公司、内部项目和未核实投资内容。
- 图片路径改为博客公开路径。
- 公众号原文链接、发布日期、标题和摘要与公开口径一致。
- 用户明确删除或不再公开的文章不重新同步。

## 验证

```sh
npm test
```

`npm test` 会执行：

1. `npm run build`
2. `astro build`
3. `pagefind --site dist`
4. 复制 Pagefind 静态资源到 `public/pagefind/`
5. `node scripts/check-public-output.mjs`

公开输出检查覆盖：

- 首页、文章列表、分类、合集、检索页是否生成。
- RSS、robots、sitemap、Pagefind 索引是否生成。
- 公众号二维码入口是否存在。
- 首页是否包含分类、推荐阅读和 canonical。
- 文章列表不展示文章编号或“旧文”字样。
- 品牌弧、首页 Hero 大弧、页脚色带是否产出。
- 文章页是否包含阅读进度弧和阅读时长。
- 样式产物是否包含暗色模式、选中色、键盘焦点和 hover 反馈。

## 部署

推送到 `main` 后，GitHub Actions 会运行 `.github/workflows/deploy.yml`。

部署流程：

1. Checkout 仓库。
2. 使用 `withastro/action` 安装依赖并运行 `npm test`。
3. 上传静态站点产物。
4. 使用 `actions/deploy-pages` 部署到 GitHub Pages。

站点配置在 `astro.config.mjs`：

```js
site: "https://zenine.github.io"
base: "/lanposui-blog"
```

部署完成后访问：

```text
https://zenine.github.io/lanposui-blog/
```

## 维护清单

提交前确认：

- `README.md`、`TODO.md`、`CHANGELOG.md` 是否需要同步更新。
- 新文章是否已同时更新 Markdown 和 `src/data/posts.ts`。
- 图片是否只放入 `public/images/`，且不包含私有素材。
- `npm test` 是否通过。
- 提交信息保持人工维护口径，不添加额外署名。
