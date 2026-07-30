import { readFileSync } from "node:fs";
import { join } from "node:path";

const root = new URL("..", import.meta.url).pathname;

const pages = [
  join(root, "dist", "index.html"),
  join(root, "dist", "articles", "index.html"),
];

for (const page of pages) {
  const html = readFileSync(page, "utf8");

  assertIncludes(html, "wechat-qr", page);
  assertIncludes(html, "/lanposui-blog/images/wechat-qr.jpg", page);
  assertIncludes(html, "公众号二维码", page);
  assertExcludes(html, ">001<", page);
  assertExcludes(html, ">002<", page);
  assertExcludes(html, ">旧文<", page);
}

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
