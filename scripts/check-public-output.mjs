import { readFileSync } from "node:fs";
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

function assertIncludes(html, expected, page) {
  if (!html.includes(expected)) {
    throw new Error(`${page} is missing ${expected}`);
  }
}

function assertExcludes(html, unexpected, page) {
  if (html.includes(unexpected)) {
    throw new Error(`${page} should not include ${unexpected}`);
  }
}
