const {
  CodeSnippetsRemarkPlugin,
} = require('@nmbl/code-snippets-remark-plugin');
const toGatsbyRemarkPlugin = require('to-gatsby-remark-plugin');

export const CodeSnippetsGatsbyRemarkPlugin = toGatsbyRemarkPlugin(
  CodeSnippetsRemarkPlugin
);

module.exports = CodeSnippetsGatsbyRemarkPlugin;
