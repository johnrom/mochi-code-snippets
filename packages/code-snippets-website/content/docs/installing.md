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
yarn add remark @nmbl/code-snippets-remark-plugin
```

#### NPM

```sh
npm install remark @nmbl/code-snippets-remark-plugin
```

### Then, add it as a plugin to remark:

```ts file=../code-snippets-remark-plugin/tests/integration.test.ts snippet=remark-plugin

```

## Gatsby Plugin: Plain Markdown

> This documentation assumes you have initialized a Gatsby project already and are sourcing markdown from somewhere to process.

`@nmbl/code-snippets` can be used as a Gatsby plugin for plain markdown, like with `gatsby-transformer-remark`.

### `gatsby-transformer-remark`

#### First, install the plugins:

##### Yarn

```sh
yarn add gatsby-transformer-remark @nmbl/code-snippets-gatsby-remark-plugin
```

##### NPM

```sh
npm install gatsby-transformer-remark @nmbl/code-snippets-gatsby-remark-plugin
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
            resolve: '@nmbl/code-snippets-gatsby-remark-plugin',
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

With `gatsby-plugin-mdx`, either the plugin `@nmbl/code-snippets-remark-plugin` can be used as a plugin via `remarkPlugins`, or `@nmbl/code-snippets-gatsby-remark-plugin` can be used as a plugin via `plugins`.

Choosing one or the other for all of your plugins is preferable, so they can be reliably called in order. I prefer using remarkPlugins + rehypePlugins for full power.

### `gatsby-plugin-mdx`: `remarkPlugins`.

With `remarkPlugins`, install just the plain remark plugin:

#### Yarn

```sh
yarn add gatsby-plugin-mdx @nmbl/code-snippets-remark-plugin
```

##### NPM

```sh
npm install gatsby-plugin-mdx @nmbl/code-snippets-remark-plugin
```

Then, add it to remarkPlugins:

```ts file=../code-snippets-website/gatsby-config.src.ts snippet=gatsby-plugin-mdx

```

### `gatsby-plugin-mdx`: `gatsbyRemarkPlugins`.

With `gatsbyRemarkPlugins`, install the Gatsby plugin:

#### Yarn

```sh
yarn add gatsby-plugin-mdx @nmbl/code-snippets-gatsby-remark-plugin
```

##### NPM

```sh
npm install gatsby-plugin-mdx @nmbl/code-snippets-gatsby-remark-plugin
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
            resolve: `@nmbl/code-snippets-gatsby-remark-plugin`,
            options: {},
          },
        ],
      },
    },
  ],
};
```
