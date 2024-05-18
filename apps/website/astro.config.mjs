import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
// https://astro.build/config
import svelte from '@astrojs/svelte';

// https://astro.build/config
export default defineConfig({
  site: 'https://uptownhr.com',
  integrations: [
    mdx(),
    sitemap({
      filter(page) {
        console.log('page', page);
        return !page.includes('draft');
      },
    }),
    svelte(),
  ],
});
