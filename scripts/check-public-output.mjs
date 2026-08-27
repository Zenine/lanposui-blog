import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

const root = new URL("..", import.meta.url).pathname;

const pages = [
  join(root, "dist", "index.html"),
  join(root, "dist", "articles", "index.html"),
  join(root, "dist", "categories", "index.html"),
  join(root, "dist", "collections", "index.html"),
  join(root, "dist", "search", "index.html"),
];

for (const page of pages) {
  const html = readFileSync(page, "utf8");

  assertIncludes(html, "wechat-qr", page);
  assertIncludes(html, "/lanposui-blog/images/wechat-qr.jpg", page);
  assertIncludes(html, "公众号二维码", page);
  assertExcludes(html, ">001<", page);
  assertExcludes(html, ">002<", page);
  assertExcludes(html, `>${["旧", "文"].join("")}<`, page);
}

const requiredFiles = [
  join(root, "dist", "rss.xml"),
  join(root, "dist", "robots.txt"),
  join(root, "dist", "sitemap-index.xml"),
  join(root, "dist", "google2240070b3808c919.html"),
  join(root, "dist", "pagefind", "pagefind.js"),
];

for (const file of requiredFiles) {
  readFileSync(file, "utf8");
}

const home = readFileSync(join(root, "dist", "index.html"), "utf8");
assertIncludes(home, "按分类阅读", "home");
assertIncludes(home, "继续读相关判断", "home");
assertIncludes(home, 'rel="canonical"', "home");

const search = readFileSync(join(root, "dist", "search", "index.html"), "utf8");
assertIncludes(search, "PagefindUI", "search page");

// 品牌签名元素:页眉品牌弧、首页大弧、深色页脚带
assertIncludes(home, "brand-arc", "home");
assertIncludes(home, "hero-arc", "home");
for (const page of pages) {
  const html = readFileSync(page, "utf8");
  assertIncludes(html, "footer-inner", page);
  assertIncludes(html, "footer-qr", page);
  assertExcludes(html, 'href="http://', page);
}
assertIncludes(home, "fetchpriority", "home");

// 文章页:阅读进度弧 + 阅读时长
const articleDirs = readdirSync(join(root, "dist", "articles"), { withFileTypes: true })
  .filter(entry => entry.isDirectory())
  .filter(entry => {
    const html = readFileSync(join(root, "dist", "articles", entry.name, "index.html"), "utf8");
    return !html.includes('http-equiv="refresh"');
  });
if (articleDirs.length === 0) {
  throw new Error("dist/articles has no article pages");
}
for (const dir of articleDirs) {
  const article = readFileSync(join(root, "dist", "articles", dir.name, "index.html"), "utf8");
  assertIncludes(article, "progress-arc", `article ${dir.name}`);
  assertIncludes(article, "分钟", `article ${dir.name}`);
  assertIncludes(article, "article-share", `article ${dir.name}`);
  assertIncludes(article, "data-share-url=", `article ${dir.name}`);
  assertIncludes(article, "复制链接", `article ${dir.name}`);
  assertIncludes(article, ">分享<", `article ${dir.name}`);
  assertIncludes(article, "公众号", `article ${dir.name}`);
}

// SEO:404 页、作者实体、站点/面包屑结构化数据、WebP 封面、正文图懒加载
readFileSync(join(root, "dist", "404.html"), "utf8");
assertIncludes(home, '"@type":"WebSite"', "home");
assertIncludes(home, '"name":"ZENINEXU"', "home");
assertIncludes(home, ".webp", "home");
assertExcludes(home, '"name":"Azen"', "home");
let lazyImageSeen = false;
let bodyImageDimensionsSeen = false;
for (const dir of articleDirs) {
  const article = readFileSync(join(root, "dist", "articles", dir.name, "index.html"), "utf8");
  assertIncludes(article, '"name":"ZENINEXU"', `article ${dir.name}`);
  assertIncludes(article, '"@type":"BreadcrumbList"', `article ${dir.name}`);
  assertExcludes(article, '"name":"Azen"', `article ${dir.name}`);
  const lazyImageTags = [...article.matchAll(/<img\b[^>]*loading="lazy"[^>]*>/g)].map(match => match[0]);
  if (lazyImageTags.length > 0) {
    lazyImageSeen = true;
    for (const tag of lazyImageTags) {
      assertMatches(tag, /\bwidth="\d+"/, `article ${dir.name} lazy image width`);
      assertMatches(tag, /\bheight="\d+"/, `article ${dir.name} lazy image height`);
      bodyImageDimensionsSeen = true;
    }
  }
}
if (!lazyImageSeen) {
  throw new Error("no article page has lazy-loaded body images");
}
if (!bodyImageDimensionsSeen) {
  throw new Error("no article page has dimensioned body images");
}
const webpCovers = [
  join(root, "dist", "images", "001-blue-broken-semicircle-cover.webp"),
  join(root, "dist", "images", "002-chopping-vs-herding-cover.webp"),
];
for (const file of webpCovers) {
  readFileSync(file);
}

// 全局样式:暗色模式、选中色、键盘焦点、hover 反馈
const cssDir = join(root, "dist", "_astro");
const cssBundle = readdirSync(cssDir)
  .filter(name => name.endsWith(".css"))
  .map(name => readFileSync(join(cssDir, name), "utf8"))
  .join("\n");
assertMatches(cssBundle, /prefers-color-scheme:\s*dark/, "css bundle dark mode");
assertMatches(cssBundle, /::selection/, "css bundle selection color");
assertMatches(cssBundle, /:focus-visible/, "css bundle focus outline");
assertMatches(cssBundle, /:hover/, "css bundle hover feedback");

// 亮/暗主题手动切换:防闪烁脚本、切换按钮、手动主题选择器、阴影 token
for (const page of pages) {
  const html = readFileSync(page, "utf8");
  assertIncludes(html, "theme-toggle", page);
  assertIncludes(html, "theme-toggle-text", page);
  assertIncludes(html, ">跟随<", page);
  assertIncludes(html, "theme-choice", page);
}
assertMatches(cssBundle, /data-theme/, "css bundle manual theme selector");
assertMatches(cssBundle, /--shadow-hover/, "css bundle shadow token");

// 页脚:构建日期与 RSS 引导
assertIncludes(home, "最近更新于", "home");
assertIncludes(home, "订阅 RSS", "home");

// 滚动显现与首页 Hero 弧生长动画
assertIncludes(home, "data-reveal", "home");
assertMatches(cssBundle, /arc-draw/, "css bundle hero arc draw");
assertMatches(cssBundle, /\.feature[^{]* img[^{]*\{[^}]*object-fit:contain/, "css bundle home feature image contains full cover");
assertMatches(cssBundle, /\.lead-cover[^{]*\{[^}]*object-fit:contain/, "css bundle home lead cover contains full cover");
assertMatches(
  home,
  /class="lead-post"[\s\S]*?<img[^>]+class="lead-cover"[^>]+width="\d+"[^>]+height="\d+"/,
  "home lead post cover image dimensions",
);
assertNotEqual(
  extractCardHref(home, "feature"),
  extractCardHref(home, "lead-post"),
  "home hero feature and article lead post href",
);

// 灯箱与代码块复制按钮样式
assertMatches(cssBundle, /lightbox/, "css bundle lightbox");
assertMatches(cssBundle, /copy-code/, "css bundle copy button");

// 归档页:按年份分组 + 封面缩略图
const archive = readFileSync(join(root, "dist", "articles", "index.html"), "utf8");
assertIncludes(archive, "year-block", "archive");
assertMatches(archive, /year-block[\s\S]*?>\d{4}</, "archive year headings");
assertIncludes(archive, 'class="thumb', "archive");
assertIncludes(archive, "/lanposui-blog/articles/cordis-context-ledger/", "archive scheduled future post");
assertIncludes(archive, "data-publish-at=", "archive scheduled publish metadata");

const collectionsIndex = readFileSync(join(root, "dist", "collections", "index.html"), "utf8");
assertIncludes(collectionsIndex, "/lanposui-blog/collections/agent-harness/", "collections scheduled collection");
assertIncludes(collectionsIndex, "data-publish-at=", "collections scheduled publish metadata");

const categoriesIndex = readFileSync(join(root, "dist", "categories", "index.html"), "utf8");
assertIncludes(categoriesIndex, "/lanposui-blog/categories/ai-engineering/", "categories scheduled category");
assertIncludes(categoriesIndex, "data-publish-at=", "categories scheduled publish metadata");

// 文章页:目录、标题锚点、构建期 OG 图
for (const dir of articleDirs) {
  const article = readFileSync(join(root, "dist", "articles", dir.name, "index.html"), "utf8");
  assertIncludes(article, "toc-list", `article ${dir.name}`);
  assertIncludes(article, "heading-anchor", `article ${dir.name}`);
  assertIncludes(article, `/lanposui-blog/og/${dir.name}.png`, `article ${dir.name}`);
  readFileSync(join(root, "dist", "og", `${dir.name}.png`));
}
readFileSync(join(root, "dist", "articles", "cordis-context-ledger", "index.html"), "utf8");
readFileSync(join(root, "dist", "og", "cordis-context-ledger.png"));

// OG 模板:右侧蓝弧应完整落在 1200px 画布内,避免社交卡片右缘裁切。
const ogTemplate = readFileSync(join(root, "src", "pages", "og", "[slug].png.ts"), "utf8");
const ogArcTransform = ogTemplate.match(/<g transform="translate\((\d+(?:\.\d+)?) 320\) scale\((\d+(?:\.\d+)?)\)">/);
if (!ogArcTransform) {
  throw new Error("OG template is missing the brand arc transform");
}
const ogArcLeft = Number(ogArcTransform[1]);
const ogArcScale = Number(ogArcTransform[2]);
const ogArcRight = ogArcLeft + 194 * ogArcScale;
if (ogArcRight > 1200) {
  throw new Error(`OG brand arc is clipped at right edge: ${ogArcRight}px > 1200px`);
}

// 图片宽高属性:首页封面与正文图构建期补齐,消除 CLS
assertMatches(
  home,
  /class="feature"[\s\S]*?<img[^>]+width="\d+"[^>]+height="\d+"/,
  "home feature image dimensions",
);
function assertIncludes(html, expected, page) {
  if (!html.includes(expected)) {
    throw new Error(`${page} is missing ${expected}`);
  }
}

function assertMatches(text, pattern, label) {
  if (!pattern.test(text)) {
    throw new Error(`${label} is missing ${pattern}`);
  }
}

function assertExcludes(html, unexpected, page) {
  if (html.includes(unexpected)) {
    throw new Error(`${page} should not include ${unexpected}`);
  }
}

function assertNotEqual(actual, unexpected, label) {
  if (actual === unexpected) {
    throw new Error(`${label} should not be duplicated: ${actual}`);
  }
}

function extractCardHref(html, className) {
  const match = html.match(new RegExp(`<a class="${className}" href="([^"]+)"`));
  if (!match) {
    throw new Error(`home is missing href for ${className}`);
  }
  return match[1];
}
