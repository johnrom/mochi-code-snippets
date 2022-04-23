import CodeSnippetsRemarkPlugin from '@nmbl/code-snippets-remark-plugin';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeHighlight from 'rehype-highlight';

const remarkCodeImport = require('@johnrom/remark-code-import');

module.exports = {
  siteMetadata: {
    siteUrl: 'https://codesnip.local',
    title: 'Nmbl Code Snippets - Documentation',
  },
  plugins: [
    'gatsby-plugin-postcss',
    'gatsby-plugin-typescript',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'pages',
        path: `${__dirname}/src/pages/`,
      },
      __key: 'pages',
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'content',
        path: `${__dirname}/content`,
      },
      __key: 'content',
    },
    // @snippet:start gatsby-plugin-mdx
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [`.md`, `.mdx`],
        remarkPlugins: [
          [remarkCodeImport, { async: false, basePath: process.cwd() }],
          [CodeSnippetsRemarkPlugin, {}],
        ],
        rehypePlugins: [
          // Generate heading ids for rehype-autolink-headings
          [rehypeSlug, {}],
          [
            rehypeAutolinkHeadings,
            {
              behavior: 'wrap',
            },
          ],
          [rehypeHighlight],
        ],
      },
    },
    // @snippet:end gatsby-plugin-mdx
  ],
};
