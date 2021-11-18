import { RemarkPluginCodeSnippetRemover } from '@nmbl/remark-code-snippet-remover';
const toGatsbyRemarkPlugin = require('to-gatsby-remark-plugin');

export const GatsbyRemarkPluginCodeSnippetRemover = toGatsbyRemarkPlugin(
  RemarkPluginCodeSnippetRemover
);

module.exports = GatsbyRemarkPluginCodeSnippetRemover;
