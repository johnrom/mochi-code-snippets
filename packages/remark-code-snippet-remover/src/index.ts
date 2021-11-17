import { Plugin } from 'unified';
import { visit } from 'unist-util-visit';
import { Root } from 'mdast';
import { EOL } from 'os';
import { removeCodeSnippets } from '@nmbl/code-snippets';

interface PluginOptions {
  eol?: string;
}

export const RemarkPluginCodeSnippetRemover: Plugin<PluginOptions[], Root> = (
  options: PluginOptions
) => {
  const { eol = EOL } = options;

  return async (tree) => {
    visit(tree, 'code', (node) => {
      node.value = removeCodeSnippets(node.lang, node.value, eol);
    });
  };
};
