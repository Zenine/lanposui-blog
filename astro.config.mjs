// @ts-check
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { unified } from '@astrojs/markdown-remark';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import { imageSize } from 'image-size';

const base = '/lanposui-blog';

// 正文 Markdown 图片默认懒加载、异步解码；本地图片构建期补 width/height 消除 CLS
function rehypeLazyImages() {
  /** @param {any} node */
  const walk = (node) => {
    if (node.type === 'element' && node.tagName === 'img') {
      node.properties.loading ??= 'lazy';
      node.properties.decoding ??= 'async';
      const src = typeof node.properties.src === 'string' ? node.properties.src : '';
      if (src.startsWith(`${base}/`) && node.properties.width == null) {
        const file = join(process.cwd(), 'public', src.slice(base.length));
        if (existsSync(file)) {
          try {
            const size = imageSize(readFileSync(file));
            if (size.width && size.height) {
              node.properties.width = size.width;
              node.properties.height = size.height;
            }
          } catch {
            // 尺寸读取失败时跳过，不阻断构建
          }
        }
      }
    }
    for (const child of node.children ?? []) {
      walk(child);
    }
  };
  return walk;
}

// https://astro.build/config
export default defineConfig({
  site: 'https://zenine.github.io',
  base,
  redirects: {
    '/articles/001-lanposui-banyuan/': `${base}/articles/lanposui-banyuan/`,
    '/articles/002-chopping-herding-ai/': `${base}/articles/chopping-herding-ai/`,
    '/articles/003-ai-chopping-value/': `${base}/articles/chopping-value/`,
    '/articles/004-ai-assets/': `${base}/articles/ai-assets/`,
    '/articles/005-agent-work-organization/': `${base}/articles/agent-work-organization/`,
    '/articles/077-medical-ai-benchmark/': `${base}/articles/medical-ai-benchmark/`,
    '/articles/100-open-models-negotiation/': `${base}/articles/open-models-negotiation/`,
    '/articles/108-enterprise-ai-hardware/': `${base}/articles/enterprise-ai-hardware/`,
    '/articles/148-deepseek-harness-plugin-runtime/': `${base}/articles/deepseek-harness-plugin-runtime/`,
    '/articles/149-cordis-context-ledger/': `${base}/articles/cordis-context-ledger/`,
    '/articles/150-cordis-boundary-safety/': `${base}/articles/cordis-boundary-safety/`,
  },
  integrations: [sitemap()],
  markdown: {
    shikiConfig: {
      themes: {
        light: 'github-light',
        dark: 'github-dark',
      },
    },
    processor: unified({
      rehypePlugins: [
        rehypeLazyImages,
        rehypeSlug,
        [
          rehypeAutolinkHeadings,
          {
            behavior: 'append',
            properties: {
              className: ['heading-anchor'],
              ariaLabel: '链接到本小节',
            },
            // 用 SVG 小弧做锚点图标(无文本节点,不会污染 Astro 提取的 heading text)
            content: {
              type: 'element',
              tagName: 'svg',
              properties: {
                className: ['anchor-icon'],
                viewBox: '0 0 22 11',
                ariaHidden: 'true',
              },
              children: [
                {
                  type: 'element',
                  tagName: 'path',
                  properties: {
                    d: 'M2 11 A 9 9 0 0 1 11 2',
                    fill: 'none',
                    stroke: 'currentColor',
                    strokeWidth: 2.4,
                  },
                  children: [],
                },
                {
                  type: 'element',
                  tagName: 'path',
                  properties: {
                    d: 'M15.5 3.2 A 9 9 0 0 1 19.2 7.2',
                    fill: 'none',
                    stroke: 'currentColor',
                    strokeWidth: 2.4,
                    transform: 'translate(1.6 -1.2) rotate(10 17 5)',
                  },
                  children: [],
                },
              ],
            },
          },
        ],
      ],
    }),
  },
});
