module.exports = {
  siteMetadata: {
    siteUrl: 'https://codesnip.local',
    title: 'Nmbl Code Snippets - Documentation',
  },
  plugins: [
    'gatsby-plugin-postcss',
    'gatsby-plugin-tsconfig-paths',
    'gatsby-plugin-typescript',
    'gatsby-plugin-typescript-checker',
    {
      resolve: `gatsby-plugin-typegen`,
      options: {
        outputPath: 'types/gatsby-types.ts',
        emitSchema: {
          '.generated/gatsby-schema.json': true,
        },
        emitPluginDocuments: {
          '.generated/gatsby-plugin-documents.graphql': true,
        },
      },
    },
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
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: '@johnrom/remark-code-import/gatsby',
            options: {
              async: true,
              basePath: process.cwd(),
            },
          },
          {
            resolve: '@nmbl/gatsby-remark-code-snippets',
            options: {},
          },
          {
            resolve: '@nmbl/gatsby-remark-code-snippet-remover',
            options: {},
          },
        ],
      },
    },
  ],
};
