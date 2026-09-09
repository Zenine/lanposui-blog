// 内容一致性检查:不联网,只看源码。
// 由 2026-09-04 审阅与 2026-09-05 跨库分析提出:md frontmatter 与 src/data/posts.ts 是硬性双写,
// 而 npm test 此前只能靠 JSON-LD 断言间接兜住(AGENTS.md 记录的第 005 期「半残页面」事故即由此而来)。
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { join } from "node:path";

const root = new URL("..", import.meta.url).pathname;
const articlesDir = join(root, "src", "content", "articles");
const errors = [];

function frontmatter(text) {
  const m = text.match(/^---\n([\s\S]*?)\n---/);
  if (!m) return null;
  const fm = {};
  for (const line of m[1].split("\n")) {
    const kv = line.match(/^(\w+):\s*(.*)$/);
    if (kv) fm[kv[1]] = kv[2].trim().replace(/^"(.*)"$/, "$1");
  }
  return fm;
}

// --- 收集 md ---
const mdBySlug = new Map();
for (const name of readdirSync(articlesDir).filter(n => n.endsWith(".md"))) {
  const slug = name.replace(/\.md$/, "");
  const fm = frontmatter(readFileSync(join(articlesDir, name), "utf8"));
  if (!fm) { errors.push(`${name} has no frontmatter`); continue; }
  mdBySlug.set(slug, fm);
}

// --- 收集 posts.ts ---
const postsSource = readFileSync(join(root, "src", "data", "posts.ts"), "utf8");
const entries = [...postsSource.matchAll(/\{\s*\n\s*issue:[\s\S]*?\n\s*\},/g)].map(m => m[0]);
const tsBySlug = new Map();
for (const entry of entries) {
  const href = entry.match(/href:\s*"\/articles\/([^/"]+)\/?"/);
  if (!href) continue;
  const get = key => {
    const m = entry.match(new RegExp(`${key}:\\s*"([^"]*)"`));
    return m ? m[1] : undefined;
  };
  tsBySlug.set(href[1], {
    issue: (entry.match(/issue:\s*(\d+)/) ?? [])[1],
    title: get("title"), date: get("date"),
    publishAt: get("publishAt"), wechat: get("wechat"),
  });
}

// --- 1) 双向配对,不能有孤儿 ---
for (const slug of mdBySlug.keys()) {
  if (!tsBySlug.has(slug)) errors.push(`${slug}.md has no entry in posts.ts`);
}
for (const slug of tsBySlug.keys()) {
  if (!mdBySlug.has(slug)) errors.push(`posts.ts entry ${slug} has no markdown file`);
}

// --- 2) 双源字段逐字一致 ---
// 注:cover 不在此列。md 用 /lanposui-blog/ 前缀、posts.ts 用 /images/ 前缀,规则本就不同;
// 且 2021-meta-start 的 cover 只在 posts.ts 有,用户 2026-09-09 决定不修,不能拿它卡构建。
for (const [slug, fm] of mdBySlug) {
  const ts = tsBySlug.get(slug);
  if (!ts) continue;
  for (const key of ["title", "issue", "date", "publishAt", "wechat"]) {
    const a = fm[key] === undefined ? undefined : String(fm[key]);
    const b = ts[key] === undefined ? undefined : String(ts[key]);
    if (a !== b) errors.push(`${slug}: ${key} differs — md=${a ?? "(none)"} / posts.ts=${b ?? "(none)"}`);
  }
}

// --- 3) 公众号链接格式弱校验(不联网) ---
for (const [slug, fm] of mdBySlug) {
  if (!fm.wechat) continue;
  let host;
  try { host = new URL(fm.wechat).host; } catch { host = null; }
  if (host !== "mp.weixin.qq.com") {
    errors.push(`${slug}: wechat link is not an mp.weixin.qq.com article URL — ${fm.wechat}`);
  }
}

// --- 4) 图片引用必须指向实际存在的文件 ---
for (const name of readdirSync(articlesDir).filter(n => n.endsWith(".md"))) {
  const text = readFileSync(join(articlesDir, name), "utf8");
  for (const m of text.matchAll(/!\[[^\]]*\]\(([^)]+)\)/g)) {
    const src = m[1];
    if (!src.startsWith("/lanposui-blog/")) {
      errors.push(`${name}: image path is not a site path — ${src}`);
      continue;
    }
    if (!existsSync(join(root, "public", src.replace("/lanposui-blog/", "")))) {
      errors.push(`${name}: image file missing — ${src}`);
    }
  }
  const cover = frontmatter(text)?.cover;
  if (cover && !existsSync(join(root, "public", cover.replace("/lanposui-blog/", "")))) {
    errors.push(`${name}: cover file missing — ${cover}`);
  }
}

// --- 5) 跨库 slug 一致性:writing-craft 不存在时跳过 ---
// 已登记重定向的旧期号 slug 视为有效(链接仍可达)。真正指不到任何东西的只警告不阻断:
// 修复在对方库,不应该卡住本仓库的部署。
const redirectSlugs = new Set(
  [...readFileSync(join(root, "astro.config.mjs"), "utf8")
    .matchAll(/'\/articles\/([a-z0-9-]+)\/'\s*:/g)].map(m => m[1]),
);
const craft = join(process.env.HOME ?? "", "github", "writing-craft");
const tracking = join(craft, "docs", "publishing", "正式发布跟踪清单.md");
if (existsSync(tracking)) {
  const seen = new Set();
  for (const m of readFileSync(tracking, "utf8").matchAll(/lanposui-blog\/articles\/([a-z0-9-]+)/g)) {
    const slug = m[1];
    if (seen.has(slug) || mdBySlug.has(slug) || redirectSlugs.has(slug)) continue;
    seen.add(slug);
    console.warn(`警告:writing-craft 跟踪清单引用了本仓库不存在也未登记重定向的 slug — ${slug}`);
  }
} else {
  console.log("writing-craft 跟踪清单不存在,跳过跨库 slug 校验");
}

if (errors.length > 0) {
  console.error("内容一致性检查未通过:");
  for (const e of errors) console.error("  - " + e);
  process.exit(1);
}
console.log(`内容一致性检查通过:${mdBySlug.size} 篇文章,双源配对与字段一致`);
