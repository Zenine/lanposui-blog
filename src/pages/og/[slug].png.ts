import { existsSync } from "node:fs";
import type { APIRoute, GetStaticPaths } from "astro";
import { getCollection } from "astro:content";
import sharp from "sharp";

// 构建期为每篇文章生成带标题与蓝弧母题的 og:image。
// 文本光栅化依赖系统中文字体（macOS PingFang SC / Linux Noto CJK 等）；
// 探测不到字体时退化为纯品牌弧 + 英文标识，保证任何环境下构建都能通过。

const FONT_CANDIDATES: { family: string; paths: string[] }[] = [
  { family: "PingFang SC", paths: ["/System/Library/Fonts/PingFang.ttc"] },
  { family: "Hiragino Sans GB", paths: ["/System/Library/Fonts/Hiragino Sans GB.ttc"] },
  {
    family: "Noto Sans CJK SC",
    paths: [
      "/usr/share/fonts/opentype/noto/NotoSansCJK-Regular.ttc",
      "/usr/share/fonts/noto-cjk/NotoSansCJK-Regular.ttc",
      "/usr/share/fonts/truetype/noto/NotoSansCJK-Regular.ttc",
    ],
  },
  { family: "WenQuanYi Micro Hei", paths: ["/usr/share/fonts/truetype/wqy/wqy-microhei.ttc"] },
  { family: "Microsoft YaHei", paths: ["C:\\Windows\\Fonts\\msyh.ttc", "C:\\Windows\\Fonts\\msyh.ttf"] },
];

function detectCjkFont() {
  for (const candidate of FONT_CANDIDATES) {
    if (candidate.paths.some(path => existsSync(path))) return candidate.family;
  }
  return null;
}

function escapeXml(text: string) {
  return text
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

// 按全角字符粗粒度换行，最多两行，超出截断加省略号
function wrapTitle(title: string, perLine = 11) {
  const chars = [...title];
  if (chars.length <= perLine) return [title];
  const first = chars.slice(0, perLine).join("");
  let rest = chars.slice(perLine, perLine * 2).join("");
  if (chars.length > perLine * 2) rest = `${rest.slice(0, -1)}…`;
  return [first, rest];
}

export const getStaticPaths: GetStaticPaths = async () => {
  const articles = await getCollection("articles");
  return articles.map(article => ({
    params: { slug: article.id },
    props: {
      title: article.data.title,
      category: article.data.category,
      date: article.data.date,
    },
  }));
};

export const GET: APIRoute = async ({ props }) => {
  const { title, category, date } = props as { title: string; category: string; date: string };
  const font = detectCjkFont();

  const textBlocks: string[] = [];
  if (font) {
    const lines = wrapTitle(title).map(escapeXml);
    const titleTspans = lines
      .map((line, i) => `<tspan x="84" dy="${i === 0 ? 0 : 88}">${line}</tspan>`)
      .join("");
    textBlocks.push(`
      <text x="84" y="238" font-family="${font}" font-size="30" font-weight="600" fill="#4f8dff" letter-spacing="2">${escapeXml(category)} · ${escapeXml(date)}</text>
      <text x="84" y="330" font-family="${font}" font-size="64" font-weight="700" fill="#e9eef4">${titleTspans}</text>
      <text x="84" y="560" font-family="${font}" font-size="28" font-weight="600" fill="#e9eef4" opacity="0.9">蓝破碎半圆</text>
      <text x="84" y="596" font-family="${font}" font-size="17" fill="#93a1ae" letter-spacing="3">ZENINEXU · 判断笔记</text>`);
  } else {
    textBlocks.push(`
      <text x="84" y="330" font-family="sans-serif" font-size="44" font-weight="700" fill="#e9eef4" letter-spacing="6">ZENINEXU</text>
      <text x="84" y="384" font-family="sans-serif" font-size="20" fill="#93a1ae" letter-spacing="3">JUDGMENT NOTES · LANPOSUI-BLOG</text>`);
  }

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <radialGradient id="glow-blue" cx="0.16" cy="0" r="0.9">
      <stop offset="0" stop-color="#1268f3" stop-opacity="0.32"/>
      <stop offset="1" stop-color="#1268f3" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="glow-cyan" cx="0.95" cy="0.2" r="0.8">
      <stop offset="0" stop-color="#5cd6e8" stop-opacity="0.2"/>
      <stop offset="1" stop-color="#5cd6e8" stop-opacity="0"/>
    </radialGradient>
    <pattern id="grid" width="34" height="34" patternUnits="userSpaceOnUse">
      <path d="M34 0 H0 V34" fill="none" stroke="#e6ecf2" stroke-opacity="0.05" stroke-width="1"/>
    </pattern>
  </defs>
  <rect width="1200" height="630" fill="#081724"/>
  <rect width="1200" height="630" fill="url(#grid)"/>
  <rect width="1200" height="630" fill="url(#glow-blue)"/>
  <rect width="1200" height="630" fill="url(#glow-cyan)"/>
  <g transform="translate(830 320) scale(2)">
    <path d="M22 100 A 78 78 0 0 1 178 100" fill="none" stroke="#4f8dff" stroke-width="1" opacity="0.3" stroke-dasharray="2 4"/>
    <path d="M22 100 A 78 78 0 0 1 100 22" fill="none" stroke="#4f8dff" stroke-width="5"/>
    <g transform="translate(3 -8) rotate(5 123 27)">
      <path d="M110.9 22.8 A 78 78 0 0 1 136.6 31.1" fill="none" stroke="#4f8dff" stroke-width="5"/>
    </g>
    <g transform="translate(10 -9) rotate(10 156 47)">
      <path d="M148 38.5 A 78 78 0 0 1 164.7 56.4" fill="none" stroke="#5cd6e8" stroke-width="4"/>
    </g>
    <g transform="translate(18 -5) rotate(16 174 76)">
      <path d="M171.3 68.3 A 78 78 0 0 1 176.3 83.8" fill="none" stroke="#4f8dff" stroke-width="3.5" opacity="0.8"/>
    </g>
    <g transform="translate(24 4) rotate(22 178 97)">
      <path d="M177.8 94.6 A 78 78 0 0 1 178 100" fill="none" stroke="#4f8dff" stroke-width="3" opacity="0.55"/>
    </g>
    <line x1="6" y1="100" x2="194" y2="100" stroke="#93a1ae" stroke-width="0.7" opacity="0.5"/>
  </g>
  ${textBlocks.join("\n")}
</svg>`;

  const png = await sharp(Buffer.from(svg)).png().toBuffer();
  return new Response(new Uint8Array(png), {
    headers: { "Content-Type": "image/png", "Cache-Control": "public, max-age=31536000, immutable" },
  });
};
