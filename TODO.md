# TODO

按优先级排序（2026-07-30 梳理；2026-09-07 更新 148—150 公众号链接项；2026-09-08 并入三份只读审阅产物的全部未决条目，源文件已删除，本文件是唯一待办入口）。

条目来源标注：`审阅-0904` 指 2026-09-04 全量只读审阅，`跨库-0905` 指 2026-09-05 跨库消融与冗余整改分析，`文档-0905` 指 2026-09-05 文档检索效率与描述冲突审阅。三份来源文件已于 2026-09-08 逐条复核仍成立后并入本文件并删除。

## P0 · 内容合规阻塞（内容已公开，建议优先处理）

- [x] **公开承诺提供规避境外访问封锁的资源** —— 用户 2026-09-09 选 A，两句「后台回复」已全部删除（`ps1` 领取论文、`ps2` 突破封锁）。第 142 行「四重封锁」属描述性表述，按讨论保留。验证：`grep -rn '阿拉霍洞开\|后台回复' src/content/articles/` 无命中。
- [x] **雇主内部信息披露** —— 用户 2026-09-08 决定按现状定稿：岗位称谓已脱敏为「公司战略技术领导」（工作树改动，尚未提交），同段的「医院和我们自己都承受不了」、`:15-17` 客户质疑原话、`:100-104` 产品策略陈述、`:62-68` 院内数据流字段层级**均保留原样**，不再改写。本条销账。

## P1 · 需用户登录或本人拍板

- [ ] SEO 站外提交：Google Search Console 已完成站点验证；首页 `https://zenine.github.io/lanposui-blog/` 于 2026-08-03 21:52 通过实际网址测试，允许抓取且可编入索引。已提交 `https://zenine.github.io/lanposui-blog/sitemap-index.xml`，若仍显示无法抓取则补交 `https://zenine.github.io/lanposui-blog/sitemap-0.xml`；第 077 / 078 / 108 / 148 / 149 / 150 期已同步到博客源码，部署后需在 Search Console 用「网址检查」请求对应纯语义文章 URL 编入索引。Bing 站长工具仍需验证并提交 sitemap。百度不做（GitHub Pages 屏蔽 Baiduspider 且无备案域名）。
- [ ] 第 078 期公众号正式链接待作者从后台提供后回填：`https://mp.weixin.qq.com/s/...`。届时同步 `src/content/articles/medical-ai-hospital-budget.md`、`src/data/posts.ts` 与 `writing-craft/docs/publishing/正式发布跟踪清单.md`；首发时间已按用户确认的 2026-09-15 19:00 记录，无需另追页面实测。
- [x] **正文单一事实源** —— 用户 2026-09-09 裁决：**以公众号版为准，回退博客正文**。执行前先抓公众号线上原文核实，确认 `writing-craft/published/` 存的就是公众号发出的那一版（逐句吻合），而博客版自首次提交 `4878df5` 起就是另一版、并非同步漂移。已把 6 篇分叉正文对齐（第 005 期整篇重写，其余五篇差异主要是首行标题与内嵌封面）；7 对可配对文章现已全部一致。规则连同五条发布层例外已写入本库 `AGENTS.md`「与 writing-craft 的同步流程」首条。**遗留**：同一段措辞尚未写进 `writing-craft/AGENTS.md`，需在对方库按其 PR 流程补。
- [x] **导航公众号入口** —— 用户 2026-09-09 选 B，并确认公众号没有长期网页地址、只有二维码。2026-09-09 实测该短链已失效：返回 200 但内容是跳转脚本，中文用户被送到微信下载页 `weixin.qq.com/d`，不再通向公众号。处理：文字链改为不可导航的 `<button class="wechat-trigger">`，沿用导航视觉且保持可聚焦，使键盘用户仍能通过 `:focus-within` 唤出二维码；悬停二维码与页脚二维码两个入口原样保留。新增断言 `assertExcludes(html, "weixin.qq.com/r/mp/")` 锁死此类会过期的短链，加断言时确认过它在旧代码下失败。验证：全站 33 个页面短链残留归零，`npm test` 通过。
- [x] **第 108 期补记录** —— 用户 2026-09-09 提供链接 `https://mp.weixin.qq.com/s/ncUE_SVwpa-ddvvaPuyN3Q`，已抓取线上页面核对：标题《企业 AI 部署的新瓶颈：以前等模型，现在等硬件》逐字吻合，摘要开头即本文正文首句。`wechat` 已双源回填（md frontmatter 与 `posts.ts`）。同时按 `CHANGELOG.md` 2026-08-06 已确立的「以平台实测时间为准」口径，把 `publishAt` 由 21:00 更正为平台实测的 19:00（双源同改）。至此 14 篇文章的 `wechat` 字段全部齐全。**遗留**：`writing-craft/docs/publishing/正式发布跟踪清单.md` 第 39 行仍是「状态待补账」全横杠，需在对方库结清。
- [x] **作者本人健康信息** —— 用户 2026-09-09 选 B：`2023-chatgpt-traditional-nlp.md:51` 的新冠经历**保留原文**，不改写。本条销账。
- [x] **不做（用户 2026-09-09 决定）·favicon 品牌弧候选长期悬置**。`public/favicon-arc.svg`（亮暗自适应）自 2026-07-30 生成后一直未启用，当前默认仍是公众号 Logo。一次性拍板：启用则改 `BaseLayout.astro` 两行 favicon link 并更新版本参数；放弃则删文件并移除本条。

## P1 · 内容与双写残留

- [x] **文章页重复的一级标题** —— 2026-09-09 处理完毕。先加断言「每个文章页恰好一个 `<h1>`」并确认其报红，再删除重复标题。其中第 100 期在正文对齐时顺带解决，其余 5 篇单独删除（只删与 frontmatter `title` 一致的重复标题，内容型 H1 不动）。验证：全部文章页 `<h1>` 数为 1，旧期号重定向页为 0（断言已排除）。
- [x] **不做（用户 2026-09-09 决定）·`2021-meta-start` 文末的迁移残留区块**（审阅-0904）。`:169` 起是一个 `## 本地图片` 小节，不带说明地罗列 5 张归档图，其中 `image-001.jpg` 与第 11 行文首图重复。它是这篇唯一的二级标题，所以文章页目录里只有「本地图片」一项。动作：删除整节，把真正需要的 image-002 到 image-005 按原文语境插回正文并补写 alt；评估是否补几个二级小标题让目录有意义。
- [x] **不做（用户 2026-09-09 决定）·`2021-meta-start` 的 cover 双源不对称**（审阅-0904 / 跨库-0905）。md frontmatter 无 `cover`，`src/data/posts.ts:230` 有 `cover: "/images/archive/2021-meta-start/image-001.jpg"`。这是 14 篇里唯一一处双写不对称，列表页有封面、文章页没有头图。二选一补齐，注意两侧前缀规则不同。
- [x] **归档旧文配图** —— 用户 2026-09-09 决定。`image-001.webp` 选 A：已从 720 裁到 624 像素高，去掉底部「杭州 · 创业智慧大厦」定位行与「2019 年 9 月 7 日 18:36 删除」时间行，保留昵称、文案与港剧配图，体积由 28.4KB 降至 27.2KB，已目视复核。`image-005.webp` 选 C 保留原样：三张附图无任何可辨认第三方，风险属作者本人职场表述。本条销账。
- [x] **不做（用户 2026-09-09 决定）·frontmatter `source` 字段携带内部排期备注**（审阅-0904）。9 篇文章的 `source` 写的是运营内幕，例如「2026-08-06 08:00 实际发送，早于原定 21:00」「博客先行发布，公众号链接已回填」「已发布；计划 2026-09-02 19:00」。`source` 不渲染到页面，但源码仓库是公开的。动作：统一精简为中性来源说明（如「公众号第 150 期」），或整体移出 frontmatter 放进私有笔记。`source` 是 schema 可选字段，删除不影响构建。

## P2 · 规则与文档整理（`AGENTS.md` 一次做薄做准）

- [x] **加「文档地图」**（文档-0905）。`AGENTS.md` 全文没有指向 `README.md` / `TODO.md` / `CHANGELOG.md` / `docs/maintenance.md` 的显式链接，agent 需通读 57 行才知道维护细节在哪。动作：顶部加 6 行文档地图（同步文章→`docs/maintenance.md` 手动更新文章；验证→`npm test`；待办→本文件；历史→`CHANGELOG.md`）。验证：新会话只读 `AGENTS.md` 前 15 行即可定位任一任务入口。 **2026-09-09 完成**：已加入 `AGENTS.md` 顶部，六行表格覆盖同步文章、验证、待办、历史、README 与消融报告六个入口。
- [x] **同一规则重复三次，漂移风险高**（文档-0905）。cover 前缀不对称写在 `AGENTS.md` 第 12、20、28 行（`grep -c '/lanposui-blog/images' AGENTS.md` 当前为 3）；「>150KB 转 WebP」写在第 19、32 行；定时发布机制在 `AGENTS.md:13`、`docs/maintenance.md:166`、`docs/maintenance.md:251` 各有一份长段落。动作：每条规则只保留一处（建议留第 28—30 行「双源字段」那组），其余改为「见 §工程规范」；定时发布机制只在 `docs/maintenance.md` 保留一份。验证：`grep -c '/lanposui-blog/images' AGENTS.md` 降到 1。 **2026-09-09 完成**：cover 前缀权威表述收敛为「工程与视觉规范」一处（`grep -c '/lanposui-blog/images' AGENTS.md` 由 3 降为 2，其中一处是同步规则里的路径改写说明，非重复规则）；150KB 规约去重。
- [x] **删掉 Astro 脚手架英文样板**（文档-0905）。`AGENTS.md:36-57` 的 Development 与 Documentation 两节是模板残留，其中 `astro dev --background` 是裸命令（本仓库无全局 astro，`docs/maintenance.md:81` 的正确写法是 `npm run astro -- dev --background`），6 条 docs.astro.build 外链对本仓库无特定价值。动作：删掉两节，或压成一行指向 `docs/maintenance.md` 本地开发。验证：`AGENTS.md` 不再出现裸 `astro dev`。 **2026-09-09 完成**：Development 与 Documentation 两节已删，压成「本地开发」一条并写明本仓库无全局 astro、命令走 `npm run astro -- dev --background`。
- [x] **`AGENTS.md:9` 写死另一台机器的绝对路径**（审阅-0904 / 文档-0905 同条）。写着 `writing-craft` 默认路径为 `/Users/zeninexu/github/writing-craft`，这是公开仓库，既暴露本机用户名又与本机实际路径 `~/github/writing-craft` 不符，跨机协作时会误导 agent。动作：改成相对描述或 `~/github/writing-craft`。验证：`grep -n '/Users/' AGENTS.md` 为空。 **2026-09-09 完成**：已改为 `~/github/writing-craft`，`grep -c '/Users/' AGENTS.md` 为 0。
- [x] **小节标题的日期误导**（文档-0905）。`AGENTS.md:23` 是「工程与视觉规范（2026-07-30 确立）」，但内容实含 08-06 双源事故与 08-14 运行时过滤的增补，标题日期让 agent 误判该节陈旧。动作：改为「（2026-07-30 确立，持续更新）」或去掉日期。 **2026-09-09 完成**：已改为「工程与视觉规范（2026-07-30 确立，持续更新）」。
- [x] **slug 口径首次成文**（跨库-0905 / 文档-0905）。文章 slug 不带期号前缀（2026-08-25 起的实际做法），改 slug 必须在 `astro.config.mjs` 的 `redirects` 登记旧路径。`AGENTS.md` 全文无 slug 或重定向规则。`writing-craft` 侧仍有 6 个文件写着 `077-medical-ai-benchmark`（`docs/publishing/正式发布跟踪清单.md`、`文章永久期号清单.md`、`选题看板.md`、`process-archive/077-*.md`、`drafts/00-发布队列.md`、`published/2026-08-23-*.md`），坏链修在对方库，口径在本库定。验证：`grep -n '期号' AGENTS.md` 有命中；`grep -rn '077-medical-ai-benchmark' ~/github/writing-craft --include='*.md'` 为空。 **2026-09-09 完成**：已写入 `AGENTS.md`：slug 不带期号前缀，改动或新增必须在 `astro.config.mjs` 的 `redirects` 登记；跨库未登记 slug 由 `check-content-consistency.mjs` 报警告。**遗留**：`writing-craft` 侧 6 个文件仍写旧 slug，修在对方库（链接因重定向仍可达，非死链）。
- [x] **验证链路描述与 `package.json` 不一致**（文档-0905）。实际是 `check-scheduled-publishing.mjs` → `npm run build`（astro build + pagefind + cp）→ `check-public-output.mjs` 三步；但 `AGENTS.md:25` 只写「构建 + Pagefind + check-public-output.mjs」，`docs/maintenance.md:228-234` 列 5 步、把 `npm run build` 和 `astro build` 重复列为两步、漏了 `check-scheduled-publishing.mjs`。动作：以 `package.json` 为准，两处改为逐字对应的 3 步。 **2026-09-09 完成**：`AGENTS.md` 与 `docs/maintenance.md` 两处均改为与 `package.json` 逐字对应的四步（接入内容一致性检查后由三步变四步）。
- [x] **`docs/maintenance.md` 三处口径漂移**（审阅-0904 / 文档-0905）。
  - `:102` 文件名示例仍是 `003-example-title.md`，与无期号 slug 规范冲突。改为 `example-title.md` 并补一句旧期号 URL 需在 `redirects` 登记。
  - `:129` 写「文章页封面会按此比例裁切展示」，而 2026-08-22 `6f82d32` 已改为 `object-fit: contain` 完整展示（检查脚本有对应断言）。改为「按 1.82 出图，页面完整展示不裁切」。
  - `:18` 说页眉品牌位是内联 SVG，`:20` 又列「公众号 Logo：`public/images/wechat-logo.jpg`」，而该文件在 `src/` 下零引用，已成孤儿资产。用户 2026-09-09 决定不动文件，故只改文档：注明「仅作备份，页眉已改用内联品牌弧，`src/` 下无引用」。 **2026-09-09 完成**：文件名示例去期号；封面「裁切展示」改为 `object-fit: contain` 完整展示；`wechat-logo.jpg` 按用户决定不删文件，文档注明仅作备份且 `src/` 下无引用。
- [x] **`CHANGELOG.md` 07-30 一节冗长**（文档-0905）。第 104 行起约 60 行，其中「文档」小节 12 条是同日多次 README 重写的流水账，占全文近半，读历史的 agent 要翻很久。动作：压成 2—3 条结论性记录（README 拆为读者版加 `docs/maintenance.md`；favicon 改公众号 Logo），保留视觉方向、robots 暂缓、作者实体三项关键决策。 **2026-09-09 完成**：「文档」小节 12 条流水账压成 3 条结论，robots 暂缓、视觉方向、作者实体三项关键决策原样保留，该节由约 60 行降至 55 行。
- [x] **`CHANGELOG.md` 旧 slug 加一句注记**（文档-0905）。`:25` 与 `:35` 的历史条目仍用 `077-medical-ai-benchmark`、`100-open-models-negotiation`（当时事实，不必改），但 agent 按 slug grep 会先撞到旧名。动作：在 08-27「跟进文章 URL 去期号规则」那条后补一句「此前 CHANGELOG 中的期号 slug 均已重定向，以 `astro.config.mjs` `redirects` 为准」，不改历史。

## P2 · 测试与构建

### 消融实验直接产出（2026-09-08）

五条整改已于 2026-09-08 全部完成并验证，做法与证据见 `docs/assertion-ablation-2026-09-08.md`：滚动显现改为安全失败（`js` 类改由 `site.js` 添加，脚本失联时内容默认可见）；新增脚本存活断言；断言覆盖面扩到全部文章详情页；修掉三条可被无关文本兜住的假断言；`docs/maintenance.md` 补记 `node_modules/.astro` 缓存陷阱。原先逃逸的六次消融现已全部被 `npm test` 抓到。剩余未做的消融相关项： **2026-09-09 完成**：已在 08-27「跟进文章 URL 去期号规则」条后补注记，历史条目不改。
- [x] **检查脚本重新写死了具体文章 slug**（审阅-0904 / 文档-0905 同条）。`scripts/check-public-output.mjs:165/184/185` 三处硬编码 `cordis-context-ledger`，断言标签写的是 `archive scheduled future post`，而 149 的 `publishAt` 是 08-30，早已不是未来文章。`CHANGELOG.md` 2026-08-06 曾专门清理过这类数据绑定断言，本次是回归。将来若删除或重命名 149，`npm test` 会以一个语义已失效的理由假红。动作：改成数据驱动断言（归档页包含 `posts.ts` 每一篇的 href；每篇非重定向文章都有对应 OG 图，后者脚本已有可复用）。验证：`grep -c 'cordis-context-ledger' scripts/check-public-output.mjs` 为 0 且 `npm test` 通过。 **2026-09-09 完成**：三处硬编码已删，改为数据驱动：归档页必须包含 `posts.ts` 中每一篇的 href。`grep -c 'cordis-context-ledger' scripts/check-public-output.mjs` 为 0。
- [x] **wechat 外链弱校验**（跨库-0905）。公众号链接全靠人工核对。加一条不联网的格式校验：非空篇目必须能解析出 `mp.weixin.qq.com` 域名。 **2026-09-09 完成**：已并入新增的 `scripts/check-content-consistency.mjs`：非空篇目必须能解析出 `mp.weixin.qq.com` 域名。
- [x] **跨库 slug 一致性校验**（跨库-0905）。`writing-craft` 存在时，校验对方跟踪清单里的 slug 都能对应到本库文件；对方库不存在时 skip。 **2026-09-09 完成**：已并入 `check-content-consistency.mjs`：已登记重定向的旧 slug 视为有效，真正指不到的只警告不阻断（修复在对方库，不应卡本仓库部署）；`writing-craft` 不存在时跳过。
- [x] **本地 `public/pagefind` 跨构建累积陈旧分片**（审阅-0904）。build 脚本结尾是 `cp -R dist/pagefind public/`，GNU `cp -R` 对已存在目录走递归合并而非覆盖，旧分片不会被清除。实测索引 33 页，而 `public/pagefind/fragment` 当前有 118 个文件，约为实际需要的 3.5 倍；`astro build` 又会把 `public/` 整个拷进 `dist/`，陈旧分片被带回。只影响本机开发目录（两者都在 `.gitignore`，CI 是全新 checkout），但会让本地与线上产物不完全等价。动作：改为 `... && rm -rf public/pagefind && cp -R dist/pagefind public/`。验证：`ls public/pagefind/fragment | wc -l` 回到 33 量级。

## P2 · 内容打磨（可选） **2026-09-09 完成**：build 脚本改为在 `astro build` **之前**清 `public/pagefind`——只在末尾清无效，因为 astro 会先把陈旧目录整个拷进 `dist`。分片数由 132 降至 33，与实际索引页数一致。
- [x] **真实姓氏「小许」** —— 用户 2026-09-09 选 C：`2022-chopping-herding-meta-herding.md:33` 的称呼**保留原文**，不做去标识改写。本条销账。
- [x] **公众号落款与失效行为召唤残留** —— 用户 2026-09-09 选 A：2022 与 2023 两篇末尾的「原创 蓝破碎 蓝破碎半圆 …… 浙江」落款连同其上的分隔线已删除；2023 篇的「后续本公众号将继续分享」已改为「后续这个博客将继续分享」。验证：`grep -rn '原创 蓝破碎\|本公众号' src/content/articles/` 无命中。
- [x] **不做（用户 2026-09-08 决定）·第 100 期数据来源自相矛盾**（审阅-0904）。`open-models-negotiation.md:60` 称数据出自「一份长期私有测评榜单」，而 `:62` 的配图注写的是「Artificial Analysis Intelligence Index v4.1」（公开榜单）。若实为公开来源，「私有」措辞平白损伤可信度；若实为非公开数据，则涉及引用未授权的私有测评结果。二者必居其一，澄清并统一措辞。
- [x] **不做（用户 2026-09-08 决定）·精确数字大量缺引用**（审阅-0904）。全站文章正文外链为 0。`medical-ai-benchmark.md` 有「MedBench v4 综合能力均分 54.1、安全与伦理 18.4」「96.3% 属于信息遗漏」「GPT-4 准确率从 82% 掉到 63%」；`open-models-negotiation.md` 有「token 份额从约 9% 到近 20%」「7.22 万亿 token」等，均无出处。这是可信度风险，而博客定位恰恰是「留下判断的现场、写清依据」。动作：给关键数字补 Reference 小节或行内链接，`2023-chatgpt-traditional-nlp.md` 已有 `## Reference` 的现成范式。
- [x] **不做（用户 2026-09-09 决定）·两张 GIF 超出体积规约，且一张 alt 与实际不符**（审阅-0904）。`archive/2022-chopping-herding-meta-herding/image-001.gif` 783KB、`archive/2023-chatgpt-traditional-nlp/image-007.gif` 507KB，远超「超过约 150KB 先转 WebP」规约（CHANGELOG 记载当时决定 GIF 保留原格式），两张占 `public/images` 总量 3.6MB 中的 1.3MB。783KB 那张的 alt 写「树新风讨论截图」，实际是《武林外传》「你要是唠这个我可就不困了」表情包。动作：转 WebP 动图或静帧；修正 alt；评估是否给第三方素材补来源。验证：`find public/images -type f -size +150k` 无输出。
- [x] **不做（用户 2026-09-09 决定）·第 077 期全篇使用半角标点**（审阅-0904）。标题「医疗大模型高分之后,为什么还不能直接用?」及正文用半角 `,` `?`，与其余 13 篇的全角标点不一致。该标题同时出现在 md、`posts.ts`、OG 图、结构化数据、RSS 五处。改标题时 md 与 `posts.ts` 的 `title` 必须同步，否则 `PostLayout.astro` 的 `sortedPosts.find(post => post.title === title)` 匹配失败，相关推荐区会消失。验证：`npm test` 通过且 `dist/articles/medical-ai-benchmark/index.html` 仍有相关推荐区块。

## 暂缓（有明确决策）

- 域根 `robots.txt`（需新建 `Zenine/zenine.github.io` 根仓库）暂缓：Search Console / Bing 手动提交 sitemap 后它无增量价值，且根仓库会占据 github.io 根路径，属域级决策；未来做根域个人主页时捎带。项目内 `/lanposui-blog/robots.txt` 爬虫不读（robots 协议只认域根），保留仅作声明。
- **约 60 条产物断言的对照实验（消融）已于 2026-09-08 完成**，报告见 `docs/assertion-ablation-2026-09-08.md`。原提案要用读者侧数据判断「读者价值」，但该度量已于 2026-08-31 裁决不再回填，改用变异测试：逐项破坏功能后重建，看 `npm test` 是否变红。27 次消融 12 次抓到、15 次漏掉。结论是这套断言保护构建期产物的结构完整性，不保护任何运行时行为。整改项见下方「测试与构建」。**读者价值那一问仍未回答**，仍需先接上 Search Console 展现与点击数据。
- **不要削弱 `npm test`**（跨库-0905）：链路是 `check-scheduled-publishing.mjs`（定时发布过滤，3 条 fixture）→ `astro build && pagefind` → `check-public-output.mjs`（约 60 条产物断言）。`AGENTS.md` 记录的第 005 期「半残页面」事故就是它抓到的。CI 把它接在 `.github/workflows/deploy.yml` 的部署门上，这个设计是对的。

## 长期约定

- [ ] 后续从 `writing-craft` 同步新文章时，先做公开边界审查，再复制正文和图片；图片按维护手册转 WebP。
- [ ] 凡使用未来 `publishAt` 的文章，到点后必须补触发一次部署，否则构建期过滤的 RSS 会漏发（列表页是运行时过滤，不受影响）。2026-09-08 实测线上 RSS 为 14 个 item、14 篇齐全，本轮已由 2026-09-07 23:49 的提交顺带满足，无需补触发。

## 主线提示（跨库）

- 本仓库（公开发布层）视觉与 SEO 基建已就绪。公众号发布**不建自动回路，人工手动触发**（用户 2026-07-30 拍板）；后续主线是持续手动发布存稿，并按公开边界流程同步到本博客。
- 三份审阅中「已核实、当前可接受、不需要动作」的结论不再逐条留存，要点是：14 篇 md 与 `posts.ts` 一一对应无孤儿；cover 前缀不对称不造成任何 404；11 条历史期号 URL 的重定向覆盖完整且未进 sitemap；仓库无密钥、无 `.env`、无第三方追踪脚本；部署工作流权限为最小集；全部提交无 AI 署名；私有库内部标记（库内编辑附录、Prompt、审读意见）在文章正文零残留。
