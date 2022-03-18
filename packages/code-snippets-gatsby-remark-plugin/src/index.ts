const { RemarkPluginCodeSnippets } = require('@nmbl/remark-code-snippets');
const toGatsbyRemarkPlugin = require('to-gatsby-remark-plugin');

export const CodeSnippetsGatsbyRemarkPlugin = toGatsbyRemarkPlugin(
  RemarkPluginCodeSnippets
);

module.exports = CodeSnippetsGatsbyRemarkPlugin;
