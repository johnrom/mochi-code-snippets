import remarkCodeImport from '@johnrom/remark-code-import';
import { RemarkPluginCodeSnippets } from '@nmbl/remark-code-snippets';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';

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
          [
            RemarkPluginCodeSnippets,
            {
              throwOnMissingSnippet: false,
            },
          ],
        ],
        rehypePlugins: [
          // Generate heading ids for rehype-autolink-headings
          [rehypeSlug, {}],
          // To pass options, use a 2-element array with the
          // configuration in an object in the second element
          [rehypeAutolinkHeadings, { behavior: 'wrap' }],
        ],
      },
    },
    // @snippet:end gatsby-plugin-mdx
  ],
};
