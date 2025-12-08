// @ts-check
import { defineConfig } from 'astro/config';
import path from 'node:path';
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
import AutoImport from "astro-auto-import";
import remarkCollapse from "remark-collapse";
import remarkToc from "remark-toc";
import config from "./src/config/config.json";
import svelte from '@astrojs/svelte';



// https://astro.build/config 
export default defineConfig({
  site: config.site.base_url ? config.site.base_url : "http://gelseyland.neocities.org",
  base: config.site.base_path ? config.site.base_path : "/",
  trailingSlash: config.site.trailing_slash ? "ignore" : "ignore",
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve('.', 'src')
      },
    },
  },
  
  integrations: [
    svelte(),
    react(),
    AutoImport({
      imports: [
        "@/shortcodes/Button",
        "@/shortcodes/Accordion",
        "@/shortcodes/Notice",
        "@/shortcodes/Video",
        "@/shortcodes/Youtube",
        "@/shortcodes/Tabs",
        "@/shortcodes/Tab",
      ],
    }),
  ],
  markdown: {
    remarkPlugins: [remarkToc, [remarkCollapse, { test: "Table of contents" }]],
  },
});

