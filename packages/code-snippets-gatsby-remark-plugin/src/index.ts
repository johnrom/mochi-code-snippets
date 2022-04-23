import CodeSnippetsRemarkPlugin from '@nmbl/code-snippets-remark-plugin';
const toGatsbyRemarkPlugin = require('to-gatsby-remark-plugin');

const CodeSnippetsGatsbyRemarkPlugin = toGatsbyRemarkPlugin(
  CodeSnippetsRemarkPlugin
);

export default CodeSnippetsGatsbyRemarkPlugin;
