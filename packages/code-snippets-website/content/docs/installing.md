---
slug: '/docs/installing'
---

# Installing

The code snippets tool itself can be used by itself by manually passing in markdown, or you can use a tool built for

- [Remark](#remark-plugin), or
- [Gatsby](#gatsby-plugin)
  - [Plain Markdown](#gatsby-plugin-plain-markdown)
  - [MDX](#gatsby-plugin-mdx)

## Remark Plugin

`@nmbl/code-snippets` can be used as a remark plugin.

### First, install the Remark Plugin

#### Yarn

```sh
yarn add remark @nmbl/remark-code-snippets
```

#### NPM

```sh
npm install remark @nmbl/remark-code-snippets
```

### Then, add it as a plugin to remark:

```ts file=../remark-code-snippets/tests/integration.test.ts snippet=remark-plugin

```

## Gatsby Plugin: Plain Markdown

> This documentation assumes you have initialized a Gatsby project already and are sourcing markdown from somewhere to process.

`@nmbl/code-snippets` can be used as a Gatsby plugin for plain markdown, like with `gatsby-transformer-remark`.

### `gatsby-transformer-remark`

#### First, install the plugins:

##### Yarn

```sh
yarn add gatsby-transformer-remark @nmbl/gatsby-remark-code-snippets
```

##### NPM

```sh
npm install gatsby-transformer-remark @nmbl/gatsby-remark-code-snippets
```

#### Then, add it as a plugin

```js
module.exports = {
  plugins: [
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
        ],
      },
    },
  ],
};
```

## Gatsby Plugin: `MDX`

> This documentation assumes you have initialized a Gatsby project already and are sourcing markdown from somewhere to process.

With `gatsby-plugin-mdx`, either the plugin `@nmbl/remark-code-snippets` can be used as a plugin via `remarkPlugins`, or `@nmbl/gatsby-remark-code-snippets` can be used as a plugin via `plugins`.

Choosing one or the other for all of your plugins is preferable, so they can be reliably called in order. I prefer using remarkPlugins + rehypePlugins for full power.

### `gatsby-plugin-mdx`: `remarkPlugins`.

With `remarkPlugins`, install just the plain remark plugin:

#### Yarn

```sh
yarn add gatsby-plugin-mdx @nmbl/remark-code-snippets
```

##### NPM

```sh
npm install gatsby-plugin-mdx @nmbl/remark-code-snippets
```

Then, add it to remarkPlugins:

```js file=../code-snippets-website/gatsby-config.js snippet=gatsby-plugin-mdx--remarkPlugins

```

### `gatsby-plugin-mdx`: `gatsbyRemarkPlugins`.

With `gatsbyRemarkPlugins`, install the Gatsby plugin:

#### Yarn

```sh
yarn add gatsby-plugin-mdx @nmbl/gatsby-remark-code-snippets
```

##### NPM

```sh
npm install gatsby-plugin-mdx @nmbl/gatsby-remark-code-snippets
```

Then, add it to gatsbyRemarkPlugins:

```js
module.exports = {
  plugins: [
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        gatsbyRemarkPlugins: [
          {
            resolve: `@nmbl/gatsby-remark-code-snippets`,
            options: {},
          },
        ],
      },
    },
  ],
};
```
