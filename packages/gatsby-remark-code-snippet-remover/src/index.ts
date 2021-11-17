import { RemarkPluginCodeSnippetRemover } from '@nmbl/remark-code-snippet-remover';
const toGatsbyRemarkPlugin = require('to-gatsby-remark-plugin');

interface PluginOptions {
  eol?: string;
}

export const GatsbyRemarkPluginCodeSnippetRemover = toGatsbyRemarkPlugin;
