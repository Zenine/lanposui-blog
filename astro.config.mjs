// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://zenine.github.io',
  base: '/lanposui-blog',
  integrations: [sitemap()],
});
