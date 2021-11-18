import { RemarkPluginCodeSnippets } from '@nmbl/remark-code-snippets';
const toGatsbyRemarkPlugin = require('to-gatsby-remark-plugin');

export const GatsbyRemarkPluginCodeSnippets = toGatsbyRemarkPlugin(
  RemarkPluginCodeSnippets
);

module.exports = GatsbyRemarkPluginCodeSnippets;
