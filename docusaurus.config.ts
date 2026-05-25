import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";
import type { MDXPlugin } from "@docusaurus/mdx-loader";
const { readFileSync } = require('fs');
const { join } = require('path');
import rehypeShiki, { RehypeShikiOptions } from "@shikijs/rehype";
import { BundledLanguage, bundledLanguages } from "shiki";
import {
  transformerMetaHighlight,
  transformerNotationDiff,
  transformerNotationHighlight,
  transformerNotationFocus,
} from "@shikijs/transformers";

const nbclGrammar = JSON.parse(
  readFileSync(join(__dirname, 'src/grammars/nbcl.tmLanguage.json'), 'utf8')
);

const shikiOptions = {
  themes: {
    light: "github-light",
    dark: "github-dark"
  },
  langs: [
    {
      name: 'nbcl',
      aliases: ['nbcl'],
      scopeName: nbclGrammar.scopeName,
      ...nbclGrammar,
    },
    ...Object.keys(bundledLanguages) as BundledLanguage[]
  ],
  transformers: [
    transformerMetaHighlight(),
    transformerNotationDiff(),
    transformerNotationHighlight(),
    transformerNotationFocus(),
  ],
} satisfies RehypeShikiOptions;

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: "Ewwii docs",
  tagline: "The documentation of ewwii",
  favicon: "img/EwwiiLogo.png",

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: "https://ewwii-sh.github.io",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/docs/",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "Ewwii-sh", // Usually your GitHub org/user name.
  projectName: "ewwii", // Usually your repo name.

  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      {
        sitemap: {
          lastmod: 'date',
          changefreq: 'weekly',
          priority: 0.5,
          ignorePatterns: ['/tags/**'],
          filename: 'sitemap.xml',
        },
        docs: {
          sidebarPath: "./sidebars.ts",
          routeBasePath: "/",
          beforeDefaultRehypePlugins: [
            [
              rehypeShiki, shikiOptions
            ] satisfies MDXPlugin,
          ],
        },
        theme: {
          customCss: "./src/css/custom.css",
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: "img/docusaurus-social-card.jpg",
    navbar: {
      title: "Ewwii Docs",
      logo: {
        alt: "Ewwii Logo",
        src: "img/EwwiiLogo.png",
      },
      items: [
        {
          type: "docsVersionDropdown",
          position: "left",
          dropdownActiveClassDisabled: true,
        },
        {
          href: "https://ewwii-sh.github.io",
          label: "Home",
          position: "right",
        },
        {
          href: "https://github.com/Ewwii-sh",
          label: "GitHub",
          position: "right",
        },
      ],
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "Community",
          items: [
            {
              label: "Discord",
              href: "https://discord.com/invite/63bKPx3Wb6",
            },
          ],
        },
        {
          title: "More",
          items: [
            {
              label: "Home",
              href: "https://ewwii-sh.github.io",
            },
            {
              label: "GitHub",
              href: "https://github.com/Ewwii-sh/",
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Ewwii, All rights served.`,
    },
  } satisfies Preset.ThemeConfig,

  themes: [
    [
      require.resolve("@easyops-cn/docusaurus-search-local"),
      {
        hashed: true,
        language: ["en"],
        indexDocs: true,
        indexBlog: true,
        docsRouteBasePath: "/",
      },
    ],
  ],
};

export default config;
