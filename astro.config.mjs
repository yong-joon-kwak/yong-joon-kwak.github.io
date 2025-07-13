// @ts-check
import { defineConfig } from 'astro/config';
import vue from '@astrojs/vue';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  site: 'https://your-username.github.io',
//   base: '/dev-blog', // GitHub Pages 배포 시 필요
  integrations: [vue(), tailwind()],
});
