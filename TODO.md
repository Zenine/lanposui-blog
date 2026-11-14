# TODO

## 搜索引擎提交（需本人登录）

- [ ] 092 搜索引擎提交：2026-11-12 已部署且 sitemap 含新 URL。下一步：Search Console 刷新 sitemap，请求 `https://zenine.github.io/lanposui-blog/articles/hospital-agent-ready/` 编入索引；Bing 已启用则同步提交 sitemap。验证：网址检查显示已编入索引。
- [ ] 115 搜索收录跟踪：2026-11-05 已请求编入索引并补交 `sitemap-0.xml`，后台仍显示“无法抓取”（线上 XML 返回 200 且含新文章）。下一步：复查抓取状态。验证：Search Console 显示 sitemap 抓取成功、文章已编入索引。
- [ ] 158 搜索引擎提交：确认 sitemap 含 `https://zenine.github.io/lanposui-blog/articles/medical-ai-next-bet/`，Search Console 刷新 sitemap 并请求编入索引；Bing 已启用时同步提交。验证：网址检查显示已编入索引。
- [ ] SEO 站外提交：Search Console 已验证站点，首页 2026-08-03 21:52 实际网址测试通过，已提交 `https://zenine.github.io/lanposui-blog/sitemap-index.xml`（无法抓取时补交 `https://zenine.github.io/lanposui-blog/sitemap-0.xml`）。下一步：为第 077 / 078 / 108 / 115 / 148 / 149 / 150 / 158 期纯语义 URL 请求编入索引；Bing 站长工具验证并提交 sitemap。百度不做（GitHub Pages 屏蔽 Baiduspider 且无备案域名）。验证：Search Console / Bing 后台状态。

## 内容待补

- [ ] 第 078 期公众号正式链接回填：作者从后台提供 `https://mp.weixin.qq.com/s/...` 后，同步 `src/content/articles/medical-ai-hospital-budget.md`、`src/data/posts.ts` 与 `writing-craft/docs/publishing/正式发布跟踪清单.md`；首发时间 2026-09-15 19:00 已记录。验证：`npm test`。

## 跨库遗留（修在 writing-craft）

- [ ] 「正文以公众号版为准」规则尚未写进 `writing-craft/AGENTS.md`，需按对方库 PR 流程补。
- [ ] `writing-craft/docs/publishing/正式发布跟踪清单.md` 第 39 行第 108 期仍是「状态待补账」，需在对方库结清。
- [ ] `writing-craft` 侧 6 个文件仍写旧 slug `077-medical-ai-benchmark`（`docs/publishing/正式发布跟踪清单.md`、`文章永久期号清单.md`、`选题看板.md`、`process-archive/077-*.md`、`drafts/00-发布队列.md`、`published/2026-08-23-*.md`）；重定向下仍可达。验证：`grep -rn '077-medical-ai-benchmark' ~/github/writing-craft --include='*.md'` 为空。

## 暂缓（有明确决策）

- 域根 `robots.txt`（需新建 `Zenine/zenine.github.io` 根仓库）暂缓：手动提交 sitemap 后无增量价值，且根仓库占据 github.io 根路径；未来做根域个人主页时捎带。项目内 `/lanposui-blog/robots.txt` 爬虫不读，保留作声明。
- 产物断言的「读者价值」未回答：读者侧度量于 2026-08-31 裁决不再回填，需先接上 Search Console 展现与点击数据。消融结论见 `docs/assertion-ablation-2026-09-08.md`。
- 不要削弱 `npm test`：链路见 `AGENTS.md`「工程与视觉规范」，CI 接在 `.github/workflows/deploy.yml` 的部署门上。

## 已裁定不做（勿再列为待办）

- 雇主内部信息（2026-09-08）：岗位称谓已脱敏为「公司战略技术领导」，同段「医院和我们自己都承受不了」、`:15-17` 客户质疑原话、`:100-104` 产品策略、`:62-68` 院内数据流字段层级保留原样。
- 2023 篇第 142 行「四重封锁」描述保留；`2023-chatgpt-traditional-nlp.md:51` 新冠经历保留原文（2026-09-09）。
- `2022-chopping-herding-meta-herding.md:33`「小许」称呼保留；`archive/2023-chatgpt-traditional-nlp/image-005.webp` 保留原样（2026-09-09）。
- `public/favicon-arc.svg` 不启用，favicon 仍为公众号 Logo；`public/images/wechat-logo.jpg` 不删（2026-09-09）。
- `2021-meta-start` 文末 `## 本地图片` 小节不改；其 cover 双源不对称（`src/data/posts.ts:230` 有、md 无）不修（2026-09-09）。
- frontmatter `source` 字段的排期备注不精简（2026-09-09）。
- 第 100 期「私有测评榜单」与 Artificial Analysis Intelligence Index v4.1 图注措辞不改；文章精确数字不补引用（2026-09-08）。
- 两张 GIF（`archive/2022-chopping-herding-meta-herding/image-001.gif` 783KB、`archive/2023-chatgpt-traditional-nlp/image-007.gif` 507KB）不转 WebP、不改 alt（2026-09-09）。
- 第 077 期半角标点不改（2026-09-09）。

## 长期约定

- 从 `writing-craft` 同步新文章时，先做公开边界审查，再复制正文和图片；图片按维护手册转 WebP。
- 使用未来 `publishAt` 的文章，到点后须补触发一次部署，否则构建期过滤的 RSS 会漏发（列表页运行时过滤不受影响）。
- 公众号发布不建自动回路，人工手动触发（2026-07-30 定）；主线是持续手动发布存稿并同步到本博客。
