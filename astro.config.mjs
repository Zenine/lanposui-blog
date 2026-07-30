// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// 正文 Markdown 图片默认懒加载、异步解码
function rehypeLazyImages() {
  /** @param {any} node */
  const walk = (node) => {
    if (node.type === 'element' && node.tagName === 'img') {
      node.properties.loading ??= 'lazy';
      node.properties.decoding ??= 'async';
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
  base: '/lanposui-blog',
  integrations: [sitemap()],
  markdown: {
    rehypePlugins: [rehypeLazyImages],
  },
});
