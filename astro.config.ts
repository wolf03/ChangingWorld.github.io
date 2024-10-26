import { defineConfig } from 'astro/config'
// Adapter
// if you want deploy on vercel
import vercel from '@astrojs/vercel/serverless'
// ---
// if you want deploy locally
// import node from '@astrojs/node'
// Integrations
import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import tailwind from '@astrojs/tailwind'
import icon from 'astro-icon'
// Markdown
import { remarkReadingTime } from './src/utils/remarkReadingTime.ts'
import remarkUnwrapImages from 'remark-unwrap-images'
import rehypeExternalLinks from 'rehype-external-links'
import expressiveCode from 'astro-expressive-code'
import { siteConfig } from './src/site.config.ts'
import { expressiveCodeOptions } from './src/site.config.ts'

// https://astro.build/config
export default defineConfig({
  // Top-Level Options
  site: siteConfig.site,
  // base: '/docs',
  trailingSlash: 'never',
  output: 'server',
  adapter: vercel({
    webAnalytics: {
      enabled: true
    }
  }),
  // ---
  // if you want deploy locally
  // adapter: node({
  //   mode: 'standalone'
  // }),
  integrations: [
    expressiveCode(expressiveCodeOptions),
    tailwind({ applyBaseStyles: false }),
    sitemap(),
    mdx(),
    icon()
    // (await import('@playform/compress')).default({
//   SVG: false,
//   Exclude: ['index.*.js']
// })
  ],
  // root: './my-project-directory',

  // Prefetch Options
  prefetch: true,
  // Server Options
  server: {
    host: true
  },
  // Markdown Options
  markdown: {
    remarkPlugins: [remarkUnwrapImages, remarkReadingTime],
    rehypePlugins: [
      [
        rehypeExternalLinks,
        {
          target: '_blank',
          rel: ['nofollow, noopener, noreferrer']
        }
      ]
    ],
    remarkRehype: {
      footnoteLabelProperties: {
        className: ['']
      }
    }
  }
})
